import './bodySongs.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons, Tooltip } from 'fara-comp-react';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';

const BodySongs = () => {

    const navigate = useNavigate();

    const { setLoading } = useAlertContext();
    const { setPlayList } = useRadioContext();

    const [songs, setSongs] = useState(null);
    const [change, setChange] = useState(0);

    useEffect(() => {
        if (change > 0) setLoading(true);
        const fetchData = async () => {
            const response = await getMusicApi({ active: true, random: true, limit: 24 });
            if (response.status === 'success') setSongs(response.result);
            setLoading(false);
        }; setTimeout(() => { fetchData() }, 500);
    }, [change]);

    const handlePlayList = () => {
        const yids = songs.map(doc => doc.yid);
        setPlayList(yids);
        navigate('/player');
    };

    return (
        <div className="bodySongs">

            <section className='bodySongsTit'>
                <h2>Canciones</h2>

                <div>
                    <Tooltip text='Escuchar' cursor='pointer' backgroundColor='#1B263B'>
                        <Icons type='playlist' color='white' size='25px'
                            onClick={() => handlePlayList()}
                        />
                    </Tooltip>

                    <Tooltip text='Nueva Lista' cursor='pointer' backgroundColor='#1B263B'>
                        <Icons type='replace' color='white' size='25px'
                            onClick={() => setChange(change + 1)}
                        />
                    </Tooltip>
                </div>
            </section>

            <section className='bodySongsTab'>
                {songs && songs.map(doc => (
                    <div key={doc._id} className='bodySongsTabCard'>
                        <img src={doc.img} alt="img" />

                        <div className='bodySongsTabCardText'>
                            {doc?.author ?
                                <>
                                    <p className='p-elipsis'>{doc.title}</p>
                                    <p className='pgray p-elipsis'>{doc.author}</p>
                                </>
                                : <>
                                    <p className='p-elipsis'>{doc.title.split('-')[0]}</p>
                                    <p className='pgray p-elipsis'>{doc.title.split('-')[1] || 'Artist need edit'}</p>
                                </>
                            }
                        </div>

                        <div className='bodySongsTabCardPlay'>
                            <Icons type='play' color='white' size='25px' />
                        </div>
                    </div>
                ))}
            </section>

        </div>
    );
};

export default BodySongs;