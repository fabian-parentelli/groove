import './player.css';
import { useEffect, useState } from 'react';
import PlayerView from './PlayerView/PlayerView.jsx';
import PlayerList from './PlayerList/PlayerList.jsx';
import { useQueryParams } from '@/hooks/useQueryParams.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import SiderLeft from '@/components/utils/SiderLeft/SiderLeft.jsx';

const Player = () => {

    const [params] = useQueryParams();
    const { playlist } = useRadioContext();
    const { showAlert, setLoading } = useAlertContext();

    const [info, setInfo] = useState(null);
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getMusicApi({ yids: playlist, limit: 50 });
            if (response.status === 'success') {
                setSongs(response.result);
                sessionStorage.setItem('playlist', JSON.stringify(response.result.docs));
                if (params.type === 'random') sessionStorage.setItem('type', params.type);
                else sessionStorage.setItem('type', params.name);
            } else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchData();
    }, []);

    return (
        <div className="player">
            <SiderLeft />
            <PlayerView info={info} setInfo={setInfo} />
            <PlayerList songs={songs} info={info} />
        </div>
    );
};

export default Player;