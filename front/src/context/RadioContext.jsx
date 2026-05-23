import { useQueryParams } from "../hooks/useQueryParams.jsx";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const RadioContext = createContext();
export const useRadioContext = () => useContext(RadioContext);

const RadioProvider = ({ children }) => {

    const playerRef = useRef(null);
    const [params, setParams] = useQueryParams();
    const currentLidRef = useRef(params.lid);

    const [index, setIndex] = useState(0);
    const [playlist, setPlayList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        if (playlist.length > 0) {
            currentLidRef.current = params.lid;
            if (!playerRef.current) {
                if (window.YT && window.YT.Player) createPlayer(playerRef, setIsPlaying, playlist, currentLidRef, setVideoId);
                else {
                    const tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    document.body.appendChild(tag);
                    window.onYouTubeIframeAPIReady = () => createPlayer(playerRef, setIsPlaying, playlist, currentLidRef, setVideoId);
                };
            } else {
                playerRef.current.stopVideo();
                playerRef.current.clearVideo();

                setTimeout(() => {
                    playerRef.current.loadPlaylist({
                        playlist: playlist,
                        index: 0,
                        startSeconds: 0,
                    });
                    playerRef.current.playVideo();
                    setIsPlaying(true);
                }, 300);
            };
        };
    }, [playlist]);

    const playAtIndex = (index) => {
        if (playerRef.current && typeof playerRef.current.playVideoAt === 'function') {
            playerRef.current.playVideoAt(index);
            setIsPlaying(true);
        };
    };

    return (
        <RadioContext.Provider value={{
            isPlaying, setParams, setPlayList, params, playlist, playAtIndex, setIndex, playerRef,
            videoId
        }}>
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

function createPlayer(playerRef, setIsPlaying, playlist, currentLidRef, setVideoId) {

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
                const player = event?.target;
                if (!player || typeof player.getVideoData !== "function") return;
                if (event.data === window.YT.PlayerState.PLAYING) {
                    setIsPlaying(true);
                    if (typeof player.getVideoData === "function") {
                        const data = player.getVideoData();
                        setVideoId(data.video_id);
                    }
                } else if (
                    event.data === window.YT.PlayerState.PAUSED ||
                    event.data === window.YT.PlayerState.ENDED
                ) {
                    setIsPlaying(false);
                }
            }
        }
    });
};