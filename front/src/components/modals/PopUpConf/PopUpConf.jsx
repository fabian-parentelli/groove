import './popUpConf.css';
import PcSong from './PcSong.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import PcPlayList from './PcPlayList.jsx';

const PopUpConf = ({ type = 'song', song, handlePlay }) => {

    const { user } = useLoginContext();
    const { setModal } = useAlertContext();

    return (
        <>
            {(type === 'song' && song) && <PcSong song={song} user={user} setModal={setModal} />}
            {(type === 'playlist' && song) && <PcPlayList song={song} user={user} setModal={setModal} handlePlay={handlePlay} />}
        </>
    );

};

export default PopUpConf;