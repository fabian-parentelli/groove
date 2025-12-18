import './listPage.css';
import { useEffect, useState } from "react";
import FeatureImg from './FeatureImg/FeatureImg.jsx';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { useRadioContext } from "@/context/RadioContext.jsx";
import { getMusicApi } from "@/helpers/music/getMusic.api.js";
import ListSongs from './ListSongs/ListSongs.jsx';

const ListPage = () => {

    const { params, currentTrack } = useRadioContext();
    const { showAlert, setLoading } = useAlertContext();
    
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getMusicApi({ active: true, lid: params.lid });
            if (response.status === 'success') setSongs(response.result);
            else showAlert(response.error, 'error');
            setLoading(false);
        }; if (params?.lid) fetchData();
    }, [params?.lid]);

    return (
        <div className="listPage">
            <section>
                <FeatureImg currentTrack={currentTrack} songs={songs} />
                <ListSongs currentTrack={currentTrack} songs={songs} />
            </section>
        </div>
    );
};

export default ListPage;