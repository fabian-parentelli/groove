import './viewAuthor.css';
import '../ViewSong/comps/VewSongAlbum/vewSongAlbum.css';
import { useEffect, useState } from 'react';
import { Spinner, Icons } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';
import { saveMusic } from '@/utils/db.utils.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getAuthorApi } from '@/helpers/author/getAuthor.api.js';
import { images } from '@/utils/images.utils.js';
import ListSongs from '@/components/utils/ListSongs/ListSongs.jsx';

const ViewAuthor = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const { showAlert, setChangeList } = useAlertContext();
    const { setPlayList } = useRadioContext();

    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAuthorApi(name);
            if (response.status === 'success') setAuthor(response.result);
            else showAlert(response.error, 'error');
        }; if (name) fetchData();
    }, [name]);

    const totalTime = author?.songs?.reduce((sum, s) => sum + (s.duration || 0), 0) || 0;

    const handlePlay = async (index = -1) => {
        if (!author?.songs?.length) return;
        const songs = author.songs;
        if (index >= 0) {
            const yid = songs[index].yid;
            const rest = songs.filter((_, i) => i !== index).map(doc => doc.yid);
            setPlayList([yid, ...rest]);
            const son = songs[index];
            const newSongs = songs.filter((_, i) => i !== index);
            await saveMusic({ is: 'artist', name: author.name, list: [son, ...newSongs] });
        } else {
            setPlayList(songs.map(doc => doc.yid));
            await saveMusic({ is: 'artist', name: author.name, list: songs });
        };
        setChangeList(p => p + 1);
    };

    if (!author) return <div className='flex-center h-100per'><Spinner color='#4f46e5' size='50px' /></div>
    return (
        <div className="flex-col viewAuthorCont">

            <h2 className='cold'>Artista</h2>

            <section className='viewAlbum'>
                <div className='viewAlbumImg'>
                    <img src={author.songs?.[0]?.img || '/list.jpg'} alt="img" />
                </div>

                <div className='viewAlbumDiv'>
                    <h1>{author.name}</h1>

                    <p>{author.songs?.length || 0} canciones</p>

                    <p>Tiempo: {formatTime(totalTime)}</p>

                    <div className='flex-line viewAlbumBtns'>
                        <button className='btn btnF flex-center gap-05 w-150'
                            onClick={() => handlePlay()}
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

            {author.albums?.length > 0 && (
                <>
                    <br />
                    <h2 className='cold'>Álbumes</h2>
                    <div className="vewSongAlbum">
                        {author.albums.map(doc => (
                            <div key={doc._id} className='vewSongAlbumCard' onClick={() => navigate(`/album/${doc._id}`)}>
                                <div className='vewSongAlbumImg'>
                                    <img src={doc?.img || images.topic} alt="img" />
                                </div>
                                <h6>{doc.name}</h6>
                                <p>{doc.author}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <br />
            <h2 className='cold'>Lista de canciones</h2>

            <ListSongs songs={author?.songs} handlePlay={handlePlay} />
        </div>
    );
};

export default ViewAuthor;