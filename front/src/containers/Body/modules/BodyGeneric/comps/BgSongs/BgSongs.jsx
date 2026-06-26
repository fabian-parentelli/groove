import { useEffect, useState } from 'react';
import { Spinner, Icons } from 'fara-comp-react';
import { saveMusic, getMusic } from "@/utils/db.utils.js";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import CardSongs from '@/components/utils/CardSongs/CardSongs.jsx';

const BgSongs = () => {

    const { setPlayList } = useRadioContext();
    const { showAlert, setChangeList } = useAlertContext();

    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusicApi({ limit: 24, random: true });
            if (response.status === 'success') {
                setSongs(response.result);
                const music = await getMusic();
                if(!music) {
                    await saveMusic({ is: 'list', name: 'Lista de canciones', list: response.result });
                    setChangeList(p => p + 1);
                };
            } else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handlePlay = async (index = -1) => {
        const yids = songs.map(doc => doc.yid);
        if (index >= 0) {
            const yid = yids[index];
            const newList = yids.filter((_, ind) => ind !== index);
            setPlayList([yid, ...newList]);
            const song = songs[index];
            const newSongs = songs.filter((_, ind) => ind !== index);
            await saveMusic({ is: 'list', name: 'Lista de canciones', list: [song, ...newSongs] });
        } else {
            setPlayList(yids);
            await saveMusic({ is: 'list', name: 'Lista de canciones', list: songs });
        };
        setChangeList(p => p + 1);
    };

    return (
        <div className="flex-col">

            <section className='flex-line ml-1'>
                <h1 className='cold ml-1'>Canciones</h1>
                <div className='cardSongPlay' onClick={handlePlay}>
                    <Icons type='play' color='white' backCol='white' hover={true} />
                </div>
            </section>

            {!songs
                ? <Spinner color='#4f46e5' />
                : <CardSongs songs={songs} handlePlay={handlePlay} />
            }
        </div>
    );
};

export default BgSongs;