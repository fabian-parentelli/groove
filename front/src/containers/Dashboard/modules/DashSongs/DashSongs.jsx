import { useEffect, useState } from "react";
import DashSongsTable from "./DashSongsTable.jsx";
import { useOutletContext } from 'react-router-dom';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { getMusicApi } from "@/helpers/music/getMusic.api.js";

const DashSongs = () => {

    const { user } = useOutletContext();
    const { showAlert, setLoading } = useAlertContext();

    const [query, setQuery] = useState({ limit: 12 });
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getMusicApi(query);
            if (response.status === 'success') setSongs(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchData();
    }, [query]);

    return (
        <div className="flex-col" style={{paddingBottom: '4rem'}}>
            {songs && <DashSongsTable songs={songs.docs} user={user} />}
        
        </div>
    );
};

export default DashSongs;