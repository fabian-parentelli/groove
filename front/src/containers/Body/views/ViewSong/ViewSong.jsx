import './viewSong.css';
import { useEffect, useState } from 'react';
import { getMusic } from '@/utils/db.utils.js';
import { Spinner, Icons } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useAlertContext } from '@/context/AlertContext.jsx';
import ViewSongCat from './comps/ViewSongCat/ViewSongCat.jsx';
import { getAlbumsApi } from '@/helpers/albums/getAlbums.api.js';
import VewSongAlbum from './comps/VewSongAlbum/VewSongAlbum.jsx';
import { getMusicApi } from '../../../../helpers/music/getMusic.api.js';

const ViewSong = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlertContext();

    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusic();
            const isSong = response.list.some(doc => doc._id === id)
            if (isSong) setSong(response.list.find(doc => doc._id === id));
            else {
                const res = await getMusicApi({ id });
                if (res) setSong(res.result.docs[0]);
            };
        }; fetchData();
    }, [id]);

    const handlePlay = async (index = -1) => {

    };

    const handleAlbum = async (yid) => {
        const response = await getAlbumsApi({ yid });
        if (response.status === 'success') navigate(`/album/${response.result.docs[0]._id}`);
        else showAlert(response.error, 'error');
    };

    if (!song) return <div className='h-100per flex-center'><Spinner color='#4f46e5' size='50px' /></div>
    else return (
        <div className="flex-col viewSong">

            <section className='viewAlbum'>
                <div className='viewAlbumImg'>
                    <img src={song?.img || '/list.jpg'} alt="img" />
                </div>
                <div className='viewAlbumDiv'>
                    <h1>{song.title}</h1>
                    <div className='flex-line gap-05'>
                        <div className='viewAlbumImgSmall'>
                            <img src={song?.img || '/list.jpg'} alt="img" />
                        </div>
                        <h3 className='viewAlbumAuthor' onClick={() => navigate(`/author/${song?.author}`)}>
                            {song?.author}
                        </h3>
                    </div>
                    <p className='cold' onClick={() => handleAlbum(song.yid)}>Álbum:
                        <strong className='viewAlbumAuthor'>{song?.album}</strong>
                    </p>
                    <p>Tiempo: {formatTime(song.duration)}</p>
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

            <div>
                <h3 className='cold'>Categorías</h3>
                <ViewSongCat song={song} />
            </div>

            <div>
                <h3 className='cold'>Álbumes</h3>
                <VewSongAlbum song={song} />
            </div>

        </div>
    );
};

export default ViewSong;