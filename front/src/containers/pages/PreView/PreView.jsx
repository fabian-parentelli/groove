import './preView.css';
import { Icons } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTimeWithHours } from '@/utils/time.utils.js';
import { useQueryParams } from '@/hooks/useQueryParams.jsx';
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import { useRadioContext } from '@/context/RadioContext.jsx';

const PreView = () => {

    const navigate = useNavigate();
    const [params] = useQueryParams();
    const { setPlayList, videoId } = useRadioContext();
    const { showAlert, setLoading } = useAlertContext();

    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let response;
            if (params.type === 'list') response = await getMusicApi({ lid: params.id });
            if (params.type === 'category') response = await getMusicApi({ category: params.cat, limit: 50 });
            if (response.status === 'success') {
                if (params.type === 'list') {
                    let data = { ...response.result };
                    data.docs = response.result.songs
                    setSongs(data);
                } else setSongs(response.result);
            } else showAlert(response.error, 'error');
            setLoading(false);
        }; fetchData();
    }, []);

    const handlePlay = () => {
        const yids = songs.docs.map(doc => doc.yid);
        setPlayList(yids);
        if (params.type === 'list') navigate(`/player?type=list&name=${songs.listName}`);
        else navigate(`/player?type=category&name=${categoriesDic(params?.cat)}`)
    };

    const handleOnePlay = (yid) => {
        const yids = songs.docs.map(doc => doc.yid);
        const rest = yids.filter(doc => doc !== yid);
        rest.unshift(yid);        
        setPlayList(rest);
        if (params.type === 'list') navigate(`/player?type=list&name=${songs.listName}`);
        else navigate(`/player?type=category&name=${categoriesDic(params?.cat)}`)
    };

    return (
        <div className="preView">

            <div className='preViewTitle'>
                <h2>{songs?.listName || categoriesDic(params?.cat) || 'Groove Music'}</h2>

                <div className='preViewTitleIcons'>
                    <div className='preViewListPlay'>
                        <Icons type='playlist' color='white' size='20px'
                            onClick={handlePlay}
                        />
                    </div>

                    <div className='preViewListPlay'>
                        <Icons type='dotver' color='white' size='20px' />
                    </div>

                    <p className='pwhite'>Tiempo {songs && formatTimeWithHours(songs?.docs.reduce((acc, item) => acc + item.duration, 0))}</p>
                </div>
            </div>

            <section className='preViewList'>
                {songs && songs?.docs.map(doc => (
                    <div key={doc._id} className='preViewListCard'>
                        <img src={doc.img || '/logo.png'} alt="img" />

                        <div className='preViewListCardText'>
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

                        <div className='preViewListPlay'>
                            <Icons type='play' color='#FFFFFF' size='20px'
                                onClick={() => handleOnePlay(doc.yid)}
                            />
                        </div>
                    </div>
                ))}
            </section>

            <section className='preViewBottom'>
                <div>
                    <Icons type='play' color='white' size='80px' onClick={handlePlay} />
                </div>
                Escuchar Playlist
            </section>

        </div>
    );
};

export default PreView;