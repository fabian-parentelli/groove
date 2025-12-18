import { useQueryParams } from "../hooks/useQueryParams.jsx";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const RadioContext = createContext();
export const useRadioContext = () => useContext(RadioContext);

const RadioProvider = ({ children }) => {

    const playerRef = useRef(null);
    const [params, setParams] = useQueryParams();

    const [playlist, setPlayList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({ title: '', image: '', author: '', id: '' });

    useEffect(() => {
        if (playlist.length > 0) {

            if (!playerRef.current) {

                if (window.YT && window.YT.Player) createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist);
                else {
                    const tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    document.body.appendChild(tag);
                    window.onYouTubeIframeAPIReady = () => createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist);
                };

            } else {
                playerRef.current.stopVideo();
                playerRef.current.loadPlaylist(playlist, 0, 0, 'default');
                setTimeout(() => {
                    playerRef.current.playVideo();
                    setIsPlaying(true);
                }, 200);
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

    return (
        <RadioContext.Provider value={{
            isPlaying, handlePlayPause, handleNext, handlePrev, currentTrack, setParams, 
            setPlayList, params
        }}>
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

function createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist) {

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
                if (playlist.length > 0) event.target.setShuffle(true);
                event.target.setShuffle(true);

            },
            onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                    setIsPlaying(true);
                    const data = event.target.getVideoData();
                    setCurrentTrack({
                        id: data.video_id,
                        title: data.title,
                        author: data.author,
                        image: `https://img.youtube.com/vi/${data.video_id}/maxresdefault.jpg`
                    });
                } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                    setIsPlaying(false);
                };
            },
        }
    });
};