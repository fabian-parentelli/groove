import './radio.css';
import { Icons } from "fara-comp-react";
import { useRadioContext } from '../../../context/RadioContext.jsx';

const Radio = () => {

    const { isPlaying, handlePlayPause, handleNext, handlePrev, currentTrack } = useRadioContext();

    return (
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
                <p className='pgray'>1:36 / 4:35</p>
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