import './radio.css';
import { useState, useEffect } from 'react';
import { Icons } from "fara-comp-react";
import { useRadioContext } from '@/context/RadioContext.jsx';

const Radio = () => {

    const [info, setInfo] = useState(null);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);

    const { isPlaying, playerRef } = useRadioContext();

    const handleNext = () => playerRef.current?.nextVideo();
    const handlePrev = () => playerRef.current?.previousVideo();

    useEffect(() => {
        if(isPlaying) {
            const videoId = playerRef.current?.getVideoData()?.video_id;
            const playlist = JSON.parse(sessionStorage.getItem('playlist'));
            setInfo(playlist.find(doc => doc.yid === videoId));
        };
    }, [isPlaying, playerRef.current?.getVideoData()?.video_id]);

    useEffect(() => {
        let interval;
        if (isPlaying && playerRef?.current?.getDuration) {
            interval = setInterval(() => {
                const elapsed = playerRef.current.getCurrentTime();
                setCurrentTime(elapsed);
                const total = playerRef.current.getDuration();
                if (total > 0) setDuration(total);
            }, 1000);
        };
        return () => clearInterval(interval);
    }, [isPlaying, playerRef]);

    const handleSeek = (e) => {
        if (!playerRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        const seconds = percent * duration;
        playerRef.current.seekTo(seconds, true);
        setCurrentTime(seconds);
    };

    const changeVolume = (newVolume) => {
        const vol = Number(newVolume);
        setVolumeState(vol);
        if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
            playerRef.current.setVolume(vol);
        };
    };

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
    };

    const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : '0%';

    return (
        <>
            <div className="radioProgress" onClick={handleSeek}>
                <div className="radioProgressFill" style={{ width: progress }} />
            </div>
            <div className="radio">

                <div id='radioTv'></div>

                <section className='radioBtns'>
                    <div className='radioIcon' onClick={handlePrev}>
                        <Icons color='white' type='playback' />
                    </div>

                    <div className='radioIcon' onClick={handlePlayPause}>
                        <Icons color='white' type={isPlaying ? 'pause' : 'play'} />
                    </div>

                    <div className='radioIcon' onClick={handleNext}>
                        <Icons color='white' type='playnext' />
                    </div>
                    <p className='pgray'>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</p>
                </section>

                <section className='radioData'>
                    <img src={info?.img || "/logo.png"} alt="img" />
                    <div>
                        <h4>{info?.author ? info?.title : info?.title.split('-')[1] || 'title'}</h4>
                        <p className='pgray'>{info?.author || info?.title.split('-')[0]}</p>
                    </div>
                    <div className='radioIcon'>
                        <Icons type='dotver' color='white' size='20px' />
                    </div>
                </section>

                <section className='radioInputs'>

                    <div className='flex-center radioInputsVol'>

                        <input
                            type="range" id="volume" name="volume" min="0" max="100" value={volume} onChange={(e) => changeVolume(e.target.value)}
                            style={{
                                background: `linear-gradient(to right,#00ffcc ${volume}%,gray ${volume}%)`
                            }}
                        />

                        <div className='radioIcon'>
                            <Icons
                                type={volume === 100 ? 'volume' : volume === 0 ? 'volumenot' : 'volumen2'}
                                color='white' size='25px'
                                onClick={() => changeVolume(volume > 1 ? 0 : 100)}
                            />
                        </div>
                    </div>

                    <div className='radioIcon'>
                        <Icons color='white' type='replace' size='25px' />
                    </div>
                    <div className='radioIcon'>
                        <Icons color='white' type='exchange' size='25px' />
                    </div>
                </section>
            </div>
        </>
    );
};

export default Radio;

const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes().toString().padStart(2, '0');
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
};