import './categoryPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoriesDic } from "@/utils/dictionary.utils.js";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from "@/context/RadioContext.jsx";
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import ListSongs from '../ListPage/ListSongs/ListSongs';
import FeatureImg from '../ListPage/FeatureImg/FeatureImg';

const CategoryPage = () => {

    const { cat } = useParams();
    const { showAlert } = useAlertContext();
    const { currentTrack, setPlayList } = useRadioContext();

    const [songs, setSongs] = useState(null);
    const [query, setQuery] = useState({ category: cat, limit: 50 });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusicApi(query);
            if (response.status === 'success') {
                response.result.songs = response.result.docs;
                response.result.listName = categoriesDic(cat);
                setSongs(response.result);
                const list = response.result.docs.map(doc => doc.yid);
                setPlayList(list);
            } else showAlert(response.error, 'error');
        }; fetchData();
    }, [query]);

    if (currentTrack) return (
        <div className="categoryPage">
            <section>
                <FeatureImg currentTrack={currentTrack} songs={songs} />
                <ListSongs currentTrack={currentTrack} songs={songs} setQuery={setQuery} />
            </section>
        </div>
    );
};

export default CategoryPage;