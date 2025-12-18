import './listPage.css';
import { useEffect, useState } from "react";
import ListSongs from './ListSongs/ListSongs.jsx';
import FeatureImg from './FeatureImg/FeatureImg.jsx';
import { useAlertContext } from "@/context/AlertContext.jsx";
import { useRadioContext } from "@/context/RadioContext.jsx";
import { getMusicApi } from "@/helpers/music/getMusic.api.js";

const ListPage = () => {

    const { showAlert } = useAlertContext();
    const { params, currentTrack, playlist, setPlayList, setIndex } = useRadioContext();

    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getMusicApi({ active: true, lid: params.lid });
            if (response.status === 'success') {
                if (response.result.lid === params.lid) {
                    const music = response.result.songs;
                    const sortMusic = music.sort((a, b) => {
                        return playlist.indexOf(a.yid) - playlist.indexOf(b.yid);
                    });
                    response.result.list = sortMusic;
                };
                setSongs(response.result);
            } else showAlert(response.error, 'error');
        }; if (params?.lid) fetchData();
    }, [params?.lid]);

    const handleNewList = (yid) => {
        const list = songs.list.map(doc => doc.yid);
        const index = list.findIndex(doc => doc === yid);
        setIndex(index);
        setPlayList(list);
    };

    return (
        <div className="listPage">
            <section>
                <FeatureImg currentTrack={currentTrack} songs={songs} />
                <ListSongs currentTrack={currentTrack} songs={songs} handleNewList={handleNewList} />
            </section>
        </div>
    );
};

export default ListPage;