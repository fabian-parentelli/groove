import './radio.css';
import { Icons } from "fara-comp-react";
import { useRadioContext } from '../../../context/RadioContext.jsx';

const Radio = () => {

    const {
        isPlaying, handlePlayPause, handleNext, handlePrev, currentTrack, duration, currentTime
    } = useRadioContext();

    const progress = duration > 0 ? `${(currentTime / duration) * 100}%` : '0%';

    return (
        <div className="radio" style={{ '--progress': progress }}>

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
                <img src={currentTrack.image || "/logo.png"} alt="img" />
                <div>
                    <h4>{currentTrack.title || 'title'}</h4>
                    <p className='pgray'>{currentTrack.author || ''}</p>
                </div>
                <div className='radioIcon'>
                    <Icons type='dotver' color='white' size='20px' />
                </div>
            </section>

            <section className='radioInputs'>

                <input type="range" id="volume" name="volume" min="0" max="100" value="50" onChange={() => null} />

                <div className='radioIcon'>
                    <Icons color='white' type='volume' size='25px' />
                </div>
                <div className='radioIcon'>
                    <Icons color='white' type='replace' size='25px' />
                </div>
                <div className='radioIcon'>
                    <Icons color='white' type='exchange' size='25px' />
                </div>
            </section>
        </div>
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