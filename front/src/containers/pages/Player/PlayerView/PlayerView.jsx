import './playerView.css';
import { useEffect } from 'react';
import { Icons } from 'fara-comp-react';
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { putMusicApi } from '@/helpers/music/putMusic.api.js';

const PlayerView = ({ info, setInfo }) => {

    const { showAlert } = useAlertContext();
    const { isPlaying, playerRef } = useRadioContext();

    useEffect(() => {
        const updateInfo = () => {
            const videoId = playerRef?.current?.getVideoData()?.video_id;
            if (videoId) {
                const playlist = JSON.parse(sessionStorage.getItem('playlist')) || [];
                const found = playlist.find(doc => doc.yid === videoId);
                setInfo(found);
            };
        };
        playerRef.current?.addEventListener('onStateChange', updateInfo);
        if (isPlaying) updateInfo();
        return () => {
            playerRef?.current?.removeEventListener('onStateChange', updateInfo);
        };
    }, [playerRef, isPlaying]);

    const handleNext = () => playerRef.current?.nextVideo();
    const handlePrev = () => playerRef.current?.previousVideo();

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        if (isPlaying) playerRef.current.pauseVideo();
        else playerRef.current.playVideo();
    };

    const deleteCategory = async (cat) => {
        const data = { ...info };
        const index = data.topics.findIndex(doc => doc == cat);
        if(index !== -1) data.topics.splice(index, 1);
        const response = await putMusicApi(data);
        if (response.status === 'success') {
            setInfo(response.result);
            const playlist = JSON.parse(sessionStorage.getItem('playlist'));
            if (playlist) {
                const index = playlist.findIndex(doc => info._id === doc._id);
                playlist[index] = response.result;
                sessionStorage.setItem('playlist', JSON.stringify(playlist));
            };
            showAlert('Categoría eliminada');
        } else showAlert(response.error, 'error');
    };

    return (
        <div className="playerView">

            <section className='playerViewTitle'>

                <div className='playerViewTitPs'>
                    <h2>{info?.author ? info?.title : info?.title.split('-')[0] || 'Groove Music'}</h2>
                    <p className='playerViewAuthor'>{info?.author || info?.title.split('-')[1] || 'Música sin publicidad'}</p>
                </div>

                <div className='playerViewIcons'>
                    <div>
                        <Icons type='playback' color='white' size='20px' onClick={handlePrev} />
                    </div>

                    <div>
                        <Icons type={isPlaying ? 'pause' : 'play'} color='white' size='20px' onClick={handlePlayPause} />
                    </div>

                    <div>
                        <Icons type='playnext' color='white' size='20px' onClick={handleNext} />
                    </div>

                    <div>
                        <Icons type='dotver' color='white' size='20px' />
                    </div>
                </div>

            </section>

            <section className='playerViewSect'>
                <img src={info?.img || '/logo.png'} alt="img" />

                <div className='playerViewSectTopics'>
                    <h5>Categorías</h5>
                    {info && info.topics.map((doc, ind) => (
                        <div key={ind} className='playerViewDivTopics'>
                            <p >{categoriesDic(doc)}</p>
                            <div className='pvdtIcons'>
                                <Icons type='delete' color='gray' size='15px'
                                    onClick={() => deleteCategory(doc)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </section>

        </div>
    );
};

export default PlayerView;