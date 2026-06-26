import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from "react";
import { saveMusic } from "@/utils/db.utils.js";
import YourSongsHtml from "./YourSongsHtml.jsx";
import { useQueryParams } from '@/hooks/useQueryParams.jsx';
import { useLoginContext } from "@/context/LoginContext.jsx";
import { useAlertContext } from "@/context/AlertContext.jsx";
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import { getListsAllApi } from "@/helpers/list/getListAll.api.js";
import ListSongs from '@/components/utils/ListSongs/ListSongs.jsx';

const YourSongs = () => {

    const { user } = useLoginContext();
    const { setPlayList } = useRadioContext();
    const [params, setParams] = useQueryParams();
    const { showAlert, setChangeList } = useAlertContext();

    const [songs, setSongs] = useState(null);
    const [lists, setLists] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListsAllApi();
            if (response.status === 'success') setLists(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handlePlay = async (list, random = false) => {
        if (list.list.length == 0) return;
        const response = await getMusicApi({ yids: list.list, limit: list.list.length });
        if (response.status === 'success') {
            const music = response.result.docs;
            if (random) {
                for (let i = music.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [music[i], music[j]] = [music[j], music[i]];
                }
            }
            await saveMusic({ name: list.name, is: 'list', list: music });
            setChangeList(pre => (pre + 1));
            setPlayList(music.map(doc => doc.yid));
        } else showAlert(response.error, 'error');
    };

    const handleView = async (list) => {
        if (list.list.length == 0) return;
        const response = await getMusicApi({ yids: list.list, limit: list.list.length });
        if (response.status === 'success') {
            setParams({ list: list._id });
            setSongs(response.result.docs);
        } else showAlert(response.error, 'error');
    };

    const handleSongPlay = async (index) => {
        if (!songs) return;
        const name = lists.find(doc => doc._id === params.list).name;
        const yids = songs.map(doc => doc.yid);
        const yid = yids[index];
        const newYids = yids.filter((_, ind) => ind !== index);
        const newSongs = songs.filter((_, ind) => ind !== index);
        setPlayList([yid, ...newYids]);
        await saveMusic({ is: 'list', name, list: [songs[index], ...newSongs] });
        setChangeList(p => p + 1);
    };

    return (
        <div className="flex-col">
            <h2 className='txt-center mb-1'>Mis playlists</h2>

            {!lists
                ? <Spinner />
                : <YourSongsHtml lists={lists} handlePlay={handlePlay} handleView={handleView} />
            }

            {songs &&
                <>
                    <h3 className='cold'>Listado de canciones</h3>
                    <ListSongs songs={songs} handlePlay={handleSongPlay} />
                </>
            }

            <br />
        </div>
    );
};

export default YourSongs;