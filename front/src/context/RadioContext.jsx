import { useQueryParams } from "../hooks/useQueryParams.jsx";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const RadioContext = createContext();
export const useRadioContext = () => useContext(RadioContext);

const RadioProvider = ({ children }) => {

    const [params, setParams] = useQueryParams();

    useEffect(() => {
        console.log(params);
        // Estoy acá no importa que cambie la url, se supone que la muscia sigue corriendo
        // Estoy acá no importa que cambie la url, se supone que la muscia sigue corriendo
        // Estoy acá no importa que cambie la url, se supone que la muscia sigue corriendo
        // Estoy acá no importa que cambie la url, se supone que la muscia sigue corriendo
        // Estoy acá no importa que cambie la url, se supone que la muscia sigue corriendo
        // Estoy acá no importa que cambie la url, se supone que la muscia sigue corriendo
        
    },[params]);

    const playerRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({ title: '', image: '', author: '' });
    const [playlist, setPlayList] = useState(['kPa7bsKwL-c', 'CFPLIaMpGrY', 'kTJczUoc26U']);

    useEffect(() => {
        if (window.YT && window.YT.Player) createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist);
        else {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = () => createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist);
        };
    }, []);

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
    };

    const handleNext = () => playerRef.current?.nextVideo();
    const handlePrev = () => playerRef.current?.previousVideo();

    return (
        <RadioContext.Provider value={{ isPlaying, handlePlayPause, handleNext, handlePrev, currentTrack, setParams }}>
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

function createPlayer(playerRef, setIsPlaying, setCurrentTrack, playlist) {

    if (playerRef.current) return;

    const playlistString = playlist.join(',');

    playerRef.current = new window.YT.Player('radioTv', {
        height: "0",
        width: "0",
        playerVars: {
            listType: playlist[0],
            playlist: playlistString,
            autoplay: 0,
            controls: 0,
            loop: 1
        },
        events: {
            onReady: (event) => {
                event.target.setLoop(true);
                event.target.setShuffle(true);
                setTimeout(() => { event.target.nextVideo() }, 100);
            },
            onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                    setIsPlaying(true);
                    const data = event.target.getVideoData();
                    setCurrentTrack({
                        title: data.title,
                        author: data.author,
                        image: `https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg`
                    });
                } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                    setIsPlaying(false);
                };
            },
        }
    });
};