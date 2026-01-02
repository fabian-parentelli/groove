import { Pager } from 'fara-comp-react';
import { useEffect, useState } from "react";
import DashSongsTable from "./DashSongsTable.jsx";
import { useOutletContext } from 'react-router-dom';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { getMusicApi } from "@/helpers/music/getMusic.api.js";
import { putMusicApi } from '@/helpers/music/putMusic.api.js';

const DashSongs = () => {

    const { user } = useOutletContext();
    const { showAlert, setLoading } = useAlertContext();

    const [songs, setSongs] = useState(null);
    const [query, setQuery] = useState({ limit: 12 });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getMusicApi(query);
            if (response.status === 'success') setSongs(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchData();
    }, [query]);

    const handleChange = (id, val, type) => {
        setSongs(s => ({ ...s, docs: s.docs.map(d => d._id === id ? { ...d, [type]: val } : d) }));
    };

    const handleUpdate = async (song) => {
        const response = await putMusicApi(song);
        if(response.status === 'success') showAlert('Canción actualizada');
        else showAlert(response.error, 'error');
    };

    return (
        <div className="flex-col" style={{ paddingBottom: '4rem' }}>

            {songs &&
                <DashSongsTable
                    songs={songs.docs} user={user} handleChange={handleChange}
                    handleUpdate={handleUpdate}
                />
            }

            <Pager docs={songs} setQuery={setQuery} backgroundColor='#1B263B' />
        </div>
    );
};

export default DashSongs;