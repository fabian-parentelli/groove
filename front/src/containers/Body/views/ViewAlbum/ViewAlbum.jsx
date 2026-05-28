import './viewAlbum.css';
import { useEffect, useState } from 'react';
import { saveMusic } from "@/utils/db.utils.js";
import { Spinner, Icons } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import ListSongs from '@/components/utils/ListSongs/ListSongs.jsx';
import { getAlbumByIdApi } from '@/helpers/albums/getAlbumById.api.js';

const ViewAlbum = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { setPlayList } = useRadioContext();
    const { showAlert, setChangeList } = useAlertContext();

    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAlbumByIdApi(id);
            if (response.status === 'success') setAlbum(response.result);
            else showAlert(response.error, 'error');
        }; if (id) fetchData();
    }, [id]);

    const handlePlay = async (index = -1) => {
        if (index >= 0) {
            const yid = album.list[index];
            const newList = album.list.filter((_, ind) => ind !== index);
            setPlayList([yid, ...newList]);
            const song = album.songs[index];
            const newSongs = album.songs.filter((_, ind) => ind !== index);
            await saveMusic({ is: 'album', name: album.name, _id: album._id, list: [song, ...newSongs], author: album.author });
        } else {
            setPlayList(album.list);
            await saveMusic({ is: 'album', name: album.name, _id: album._id, list: album.songs, author: album.author });
        };
        setChangeList(p => p + 1);
    };

    if (!album) return <div className='flex-center h-100per'><Spinner color='#4f46e5' /></div>
    return (
        <div className="flex-col viewAlbumCont">

            <h2 className='cold'>Álbum</h2>

            <section className='viewAlbum'>

                <div className='viewAlbumImg'>
                    <img src={album?.img || '/list.jpg'} alt="img" />
                </div>

                <div className='viewAlbumDiv'>
                    <h1>{album.name}</h1>

                    <div className='flex-line gap-05'>
                        <div className='viewAlbumImgSmall'>
                            <img src={album?.img || '/list.jpg'} alt="img" />
                        </div>
                        <h3 className='viewAlbumAuthor' onClick={() => navigate(`/author/${album?.author}`)}>
                            {album?.author}
                        </h3>
                    </div>

                    <p>{album?.list?.length} canciones</p>

                    <p>Tiempo: {formatTime(album?.songs.reduce((total, song) => total + song.duration, 0))}</p>

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

            <ListSongs songs={album?.songs} handlePlay={handlePlay} />
        </div>
    );
};

export default ViewAlbum;