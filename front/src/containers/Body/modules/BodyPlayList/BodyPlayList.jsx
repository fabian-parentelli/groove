import './bodyPlayList.css';
import { useEffect, useState } from "react";
import { Spinner, Icons } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';
import { getMusic, saveMusic } from "@/utils/db.utils.js";
import { useRadioContext } from "@/context/RadioContext.jsx";
import { useAlertContext } from '@/context/AlertContext.jsx';
import ListSongs from '@/components/utils/ListSongs/ListSongs.jsx';
import ViewSongCat from '@/containers/Body/views/ViewSong/comps/ViewSongCat/ViewSongCat.jsx';

const BodyPlayList = () => {

    const { videoId, setPlayList } = useRadioContext();
    const { setChangeList, viewPlayList } = useAlertContext();

    const [song, setSong] = useState(null);
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusic();
            if (response) {
                setSongs(response.list);
                if (videoId) setSong(response.list.find(doc => doc.yid == videoId));
            };
        }; fetchData();
    }, []);

    useEffect(() => {
        if (!songs || !videoId) return;
        setSong(songs.find(doc => doc.yid == videoId));
    }, [videoId, songs]);

    const handlePlay = async (index = -1) => {
        if (!songs) return;
        const yids = songs.map(doc => doc.yid);
        if (index >= 0) {
            const yid = yids[index];
            const newList = yids.filter((_, ind) => ind !== index);
            setPlayList([yid, ...newList]);
            const newSongs = songs.filter((_, ind) => ind !== index);
            saveMusic({ is: 'list', name: 'playlist', list: [songs[index], ...newSongs] });
        } else if (song) {
            setPlayList([song.yid, ...yids]);
            saveMusic({ is: 'list', name: 'playlist', list: [song, ...songs] });
        };
        setChangeList(p => p + 1);
    };

    if (!song && songs) return (
        <div className='bodyPlayList'>
            <div className='flex-col viewAlbum'>
                <div className='viewAlbumImg'>
                    <img src='/list.jpg' alt="img" />
                </div>
                <div className='viewAlbumDiv'>
                    <h2>Lista de reproducción</h2>
                    <p>{songs.length} canciones</p>
                </div>
            </div>
            <div>
                <h3 className='cold viewSongh3'>Canciones</h3>
                <ListSongs songs={songs} handlePlay={handlePlay} />
            </div>
        </div>
    );

    if (!song) return <div className='h-100per flex-center'><Spinner color='#4f46e5' size='50px' /></div>

    return (
        <div className="flex-col bodyPlayList">

            <section className='viewAlbum'>
                <div className='viewAlbumImg'>
                    <img src={song?.img || '/list.jpg'} alt="img" />
                </div>
                <div className='viewAlbumDiv'>
                    <h2 className='p-elipsis mw-400'>{song.title}</h2>
                    <div className='flex-line gap-05'>
                        <div className='viewAlbumImgSmall'>
                            <img src={song?.img || '/list.jpg'} alt="img" />
                        </div>
                        <h3 className='viewAlbumAuthor'>
                            {song?.author}
                        </h3>
                    </div>
                    <p className='cold'>Álbum:
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
                    </div>
                </div>
                {!viewPlayList &&
                    <>
                        <br />
                        <ViewSongCat song={song} view='column' />
                    </>
                }
            </section>

            {viewPlayList &&
                <>
                    <h3 className='cold'>Topics</h3>
                    <ViewSongCat song={song} view='row' />
                </>
            }

            <div>
                <h3 className='cold viewSongh3'>Lista de reproducción</h3>
                <ListSongs songs={songs} handlePlay={handlePlay} />
            </div>

        </div>
    );
};

export default BodyPlayList;