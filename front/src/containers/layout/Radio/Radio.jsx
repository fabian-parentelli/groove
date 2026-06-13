import './radio.css';
import { useState, useEffect } from 'react';
import { getMusic } from '@/utils/db.utils.js';
import { useNavigate } from 'react-router-dom';
import { Icons, Popup } from "fara-comp-react";
import { useRadioContext } from '@/context/RadioContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import Equalizer from '../../../components/Tools/Equalizer/Equalizer';
import PopUpConf from '../../../components/modals/PopUpConf/PopUpConf';

const Radio = () => {

    const navigate = useNavigate();

    const [info, setInfo] = useState(null);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);

    const { viewPlayList, setViewPlayList } = useAlertContext();
    const { isPlaying, playerRef, videoId, playlist, setPlayList } = useRadioContext();

    const handleNext = () => playerRef.current?.nextVideo();
    const handlePrev = () => playerRef.current?.previousVideo();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusic()
            setInfo(response.list?.find(doc => doc?.yid === videoId));
        }; if (videoId) fetchData();
    }, [isPlaying, videoId]);

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

    const handlePlayPause = async () => {
        if (playlist.length === 0) {
            const response = await getMusic();
            if (response) setPlayList(response.list.map(doc => doc.yid));
        };
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

                <div className='radioPlayIcon' onClick={() => navigate('/playlist')}>
                    <Icons type='playlist' hover={true} color='#4f46e5' />
                </div>

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

                <div className='flex-line'>
                    <section className='radioData' onClick={info?._id ? () => navigate(`/song/${info._id}`) : () => null}>
                        <img src={info?.img || "/logo.png"} alt="img" />
                        <div>
                            <h4 className='colf'>{info?.author ? info?.title : info?.title.split('-')[1] || 'Groove'}</h4>
                            <p className='pgray cold'>{info?.author || info?.title.split('-')[0] || 'Música sin publicidad'}</p>
                        </div>
                    </section>

                    {info &&
                        <div className='radioIcon'>
                            <Popup icon='dotver' styles={{ position: 't', width: '230px' }}>
                                <PopUpConf song={info} />
                            </Popup>
                        </div>
                    }

                    {isPlaying &&
                        <div className='radioEqualizer cur-pointer' onClick={() => navigate('/playlist')}>
                            <Equalizer />
                        </div>
                    }
                </div>

                <section className='radioInputs'>

                    <div className='flex radioInputsVol'>

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

                    <div className='radioIcon'>
                        <Icons type='ejection' size='25px' color={viewPlayList ? 'white' : '#4f46e5'}
                            onClick={() => setViewPlayList(!viewPlayList)}
                        />
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