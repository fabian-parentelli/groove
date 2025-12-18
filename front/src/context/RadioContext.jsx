import { useQueryParams } from "../hooks/useQueryParams.jsx";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const RadioContext = createContext();
export const useRadioContext = () => useContext(RadioContext);

const RadioProvider = ({ children }) => {

    const playerRef = useRef(null);
    const [params, setParams] = useQueryParams();
    const currentLidRef = useRef(params.lid);

    const [index, setIndex] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playlist, setPlayList] = useState([]);
    const [volume, setVolumeState] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentTrack, setCurrentTrack] = useState({ title: '', image: '', author: '', id: '', lid: '' });

    useEffect(() => {
        if (playlist.length > 0) {
            currentLidRef.current = params.lid;
            if (!playerRef.current) {
                if (window.YT && window.YT.Player) createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist, currentLidRef);
                else {
                    const tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    document.body.appendChild(tag);
                    window.onYouTubeIframeAPIReady = () => createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist, currentLidRef);
                };
            } else {
                playerRef.current.stopVideo();
                playerRef.current.loadPlaylist({
                    playlist: playlist, index, startSeconds: 0, suggestedQuality: 'default'
                });
                setTimeout(() => {
                    playerRef.current.playVideo();
                    setIsPlaying(true);
                }, 500);
            };
        };
    }, [playlist]);

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
    };

    const handleNext = () => playerRef.current?.nextVideo();
    const handlePrev = () => playerRef.current?.previousVideo();

    const playAtIndex = (index) => {
        if (playerRef.current && typeof playerRef.current.playVideoAt === 'function') {
            playerRef.current.playVideoAt(index);
            setIsPlaying(true);
        };
    };

    useEffect(() => {
        let interval;
        if (isPlaying && playerRef.current) {
            interval = setInterval(() => {
                const elapsed = playerRef.current.getCurrentTime();
                setCurrentTime(elapsed);
                const total = playerRef.current.getDuration();
                setDuration(total);
            }, 1000);
        } else clearInterval(interval);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const seekTime = (seconds) => {
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(seconds, true);
            setCurrentTime(seconds);
        };
    };

    const changeVolume = (newVolume) => {
        const vol = Number(newVolume);
        setVolumeState(vol);
        if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
            playerRef.current.setVolume(vol);
        }
    };

    return (
        <RadioContext.Provider value={{
            isPlaying, handlePlayPause, handleNext, handlePrev, currentTrack, setParams,
            setPlayList, params, playlist, playAtIndex, setCurrentTrack, setIndex, duration, currentTime,
            seekTime, changeVolume, volume
        }}>
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

function createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist, currentLidRef) {

    if (playerRef.current) return;

    playerRef.current = new window.YT.Player('radioTv', {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: playlist.length > 0 ? playlist.join(',') : undefined
        },
        events: {
            onReady: (event) => {
                event.target.setLoop(true);
            },
            onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                    setIsPlaying(true);
                    const data = event.target.getVideoData();
                    setCurrentTrack({
                        id: data.video_id,
                        title: data.title,
                        author: data.author,
                        image: `https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`,
                        lid: currentLidRef.current
                    });
                } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                    setIsPlaying(false);
                };
            },
        }
    });
};