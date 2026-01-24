import './body.css';
import { Icons } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';
import BodyList from './BodyList/BodyList.jsx';
import BodySongs from './BodySongs/BodySongs.jsx';
import BodyCategories from './BodyCategories/bodyCategories.jsx';
import { useRadioContext } from '../../context/RadioContext.jsx';
import Equalizer from '../../components/Tools/Equalizer/Equalizer.jsx';

const Body = () => {

    const { playlist, isPlaying } = useRadioContext();
    const navigate = useNavigate();

    return (
        <div className="body">
            <BodyCategories />
            <BodyList />
            <BodySongs />

            <div
                className='bodyRadio'
                onClick={() => navigate('/player')}
                style={{ right: playlist.length > 0 ? '30px' : '-60px' }}
            >
                {isPlaying
                    ? <Equalizer />
                    : <Icons type='radio' color='#FFFFFF' size='35px' />
                }
            </div>
        </div>
    );
};

export default Body;