import './viewTopic.css';
import { useEffect, useState } from 'react';
import { saveMusic } from "@/utils/db.utils.js";
import { images } from '@/utils/images.utils.js';
import { Spinner, Icons } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js'
import ListSongs from '@/components/utils/ListSongs/ListSongs.jsx';
import { getCategoryByNameApi } from '@/helpers/categories/getCategoryByName.api.js';

const ViewTopic = () => {

    const navigate = useNavigate();
    const { topname } = useParams();
    const { setPlayList } = useRadioContext();
    const { showAlert, setChangeList } = useAlertContext();

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoryByNameApi(topname);
            if (response.status === 'success') setTopic(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handlePlay = async (index = -1) => {
        if (index >= 0) {
            const yid = topic.yids[index];
            const newList = topic.yids.filter((_, ind) => ind !== index);
            setPlayList([yid, ...newList]);
            const song = topic.list[index];
            const newSongs = topic.list.filter((_, ind) => ind !== index);
            await saveMusic({ is: 'topics', name: topic.topic, _id: topic._id, list: [song, ...newSongs] });
        } else {
            setPlayList(topic.yids);
            await saveMusic({ is: 'topics', name: topic.topic, _id: topic._id, list: topic.list });
        };
        setChangeList(p => p + 1);
    };

    if (!topic) return <div className='h-100per flex-center'><Spinner color='#4f46e5' size='50px' /> </div>
    return (
        <div className="viewTopic flex-col">
            <h2 className='cold'>Categoría</h2>

            <section className='viewTopicSect'>
                <img className='mw-400 w-100per' src={topic?.img || images.topic} alt="img" />

                <div className='viewTopicSectDiv'>
                    <h1>{topic.topic}</h1>

                    <div className='flex-line gap-05'>
                        <img src={'/logo.png'} width='30px' alt="img" />
                        <h3 className='viewAlbumAuthor' onClick={() => navigate(`/topics`)}>
                            Categorías Groove
                        </h3>
                    </div>

                    <p>{topic.yids.length} canciones</p>

                    <p>Tiempo: {formatTime(topic?.list.reduce((total, song) => total + song.duration, 0))}</p>

                    <div className='flex-line viewAlbumBtns'>
                        <button className='btn btnF flex-center gap-05 w-150'
                            onClick={handlePlay}
                        >
                            <Icons type='play' color='white' size='15px' backCol='white' />
                            Reproducir
                        </button>

                        <button className='btn btnA flex-center gap-05 w-100'>
                            <Icons type='heart' color='white' size='15px' />
                            Me gusta
                        </button>

                        <button className='btn btnA flex-center gap-05 w-100'>
                            <Icons type='dothor' color='white' size='15px' />
                            Más
                        </button>
                    </div>
                </div>
            </section>

            <br />
            <h2 className='cold'>Lista de canciones</h2>
            <ListSongs songs={topic?.list} handlePlay={handlePlay} />
        </div>
    );
};

export default ViewTopic;