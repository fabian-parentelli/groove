import './categoryPage.css';
import { useEffect, useState } from 'react';
import ListSongs from '../ListPage/ListSongs/ListSongs.jsx';
import { categoriesDic } from "@/utils/dictionary.utils.js";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from "@/context/RadioContext.jsx";
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import FeatureImg from '../ListPage/FeatureImg/FeatureImg.jsx';

const CategoryPage = () => {

    const { showAlert } = useAlertContext();
    const { currentTrack, setPlayList, isPlaying, params, setIndex, setParams } = useRadioContext();

    const [songs, setSongs] = useState(null);
    const [query, setQuery] = useState({ category: params?.lid, limit: 50 });

    useEffect(() => {
        if (query.page) setParams({ page: query.page });
        const fetchData = async () => {
            const response = await getMusicApi(query);
            if (response.status === 'success') {
                response.result.songs = response.result.docs;
                response.result.listName = categoriesDic(params?.lid);
                setSongs(response.result);
            } else showAlert(response.error, 'error');
        }; fetchData();
    }, [query, params?.lid]);

    const handleNewList = (yid) => {
        const list = songs.docs.map(doc => doc.yid);
        const index = list.findIndex(doc => doc === yid);
        setIndex(index);
        setPlayList(list);
    };

    if (currentTrack) return (
        <div className="categoryPage">
            <section>
                <FeatureImg currentTrack={currentTrack} songs={songs} />
                <ListSongs currentTrack={currentTrack} songs={songs} handleNewList={handleNewList} setQuery={setQuery} />
            </section>
        </div>
    );
};

export default CategoryPage;