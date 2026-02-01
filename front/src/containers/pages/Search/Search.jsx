import './search.css';
import { Icons } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getMusicSearchApi } from '@/helpers/music/getSearch.api.js';

const Search = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { setPlayList } = useRadioContext();
    const { showAlert, setLoading } = useAlertContext();

    const [list, setList] = useState(null);
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getMusicSearchApi(id);
            if (response.status === 'success') {
                setSong(response.result.shift());
                setList(response.result);
            } else showAlert(response.error, 'error');
            setLoading(false);
        }; if (id) fetchData();
    }, [id]);

    const handlePlay = () => {
        const yids = list.map(doc => doc.yid);
        yids.unshift(song.yid);
        setPlayList(yids);
        navigate('/player?type=random');
    };

    const handlePlayOne = (yid) => {
        const yids = list.map(doc => doc.yid);
        yids.unshift(song.yid);
        const index = yids.findIndex(doc => doc === yid);
        yids.splice(index, 1);
        yids.unshift(yid);
        setPlayList(yids);
        navigate('/player?type=random');
    };

    if (song && list) return (
        <div className="search">

            <section className='searchSong'>
                <img src={song.img} alt="img" />
                <div className='searchSongTitle'>
                    <h4>{song.author ? song.title : song.title.split('-')[0]}</h4>
                    <h5>{song.author ? song.author : song.title.split('-')[1]}</h5>

                    <div className='searchSongIcon' onClick={handlePlay}>
                        <Icons type='play' color='#FFFFFF' />
                    </div>
                </div>
            </section>

            <section className='searchSongs'>

                <div className='searchSongsTop'>
                    <h2>Canciones sugeridas</h2>
                    <div></div>
                </div>

                <div className='searchSongsSect'>
                    {list.map(doc => (
                        <div key={doc._id} className='searchSongsCard'>

                            <div className='searchSongsCardSub'>
                                <img src={doc.img} alt="img" />

                                <div className='searchSongsCardText'>
                                    <h5>{doc.author ? doc.title : doc.title.split('-')[0]}</h5>
                                    <p>{doc.author ? doc.author : doc.title.split('-')[1]}</p>
                                </div>
                            </div>

                            <div className='searchSongsCardIcon' onClick={() => handlePlayOne(doc.yid)}>
                                <Icons type='play' color='#FFFFFF' size='25px' />
                            </div>
                        </div>
                    ))}
                </div>

            </section>

        </div>
    );
};

export default Search;