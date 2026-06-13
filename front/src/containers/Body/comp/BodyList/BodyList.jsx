import './bodyList.css';
import { useEffect, useState } from 'react';
import { getMusic } from '@/utils/db.utils.js';
import { Icons, Popup } from 'fara-comp-react';
import { formatTime } from '@/utils/time.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import PopUpConf from '@/components/modals/PopUpConf/PopUpConf.jsx';

const BodyList = () => {

    const { viewPlayList, changeList } = useAlertContext();
    const { videoId, playAtIndex, playlist, setPlayList } = useRadioContext();

    const [music, setMusic] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusic();
            if (response) setMusic(response);
        }; fetchData();
    }, [changeList]);

    const handlePlay = async (index) => {
        if (playlist.length === 0) {
            const response = await getMusic();
            if (response) {
                const ids = response.list.map(doc => doc.yid);
                const reordered = [ids[index], ...ids.filter((_, i) => i !== index)];
                setPlayList(reordered);
            };
        } else playAtIndex(index);
    };

    return (
        <div className={`bodyList ${viewPlayList ? 'bodyList--visible' : ''}`}>

            <div className='bodyListHeader'>
                <h3>{music?.is === 'album' ? music?.name : music?.is === 'topics' ? 'Género' : 'Playlist Groove'}</h3>
                <button className='bodyListClose' onClick={() => setViewPlayList(false)}>✕</button>
            </div>

            {music?.is === 'album'
                ? <p className='bodyListAuthor'>{music?.author}</p>
                : <p className='bodyListAuthor'>{music?.name}</p>
            }

            <section className='bodyListSect'>
                {music && music?.list?.length > 0 && music?.list?.map((doc, ind) => (
                    <div key={ind} className='bodyListDiv'
                        style={{ backgroundColor: videoId === doc?.yid ? '#171919' : '' }}
                    >

                        <section className='flex ai-center'>
                            <div className='bodyListImg'>
                                <img src={doc?.img} alt="img" />
                                <div className='bodyListImgOverlay'>
                                    <Icons type='play' color='white' size='20px'
                                        onClick={() => handlePlay(ind)}
                                    />
                                </div>
                            </div>

                            <div className='w-150'>
                                <h6 className='p-elipsis'>{doc?.title}</h6>
                                <p className='bodyListAuthor p-elipsis'>{doc?.author}</p>
                            </div>
                        </section>

                        <div className='bodyListTime'>
                            <span className='bodyListTimeText'>{formatTime(doc?.duration)}</span>
                            <span className='bodyListTimeIcon'>
                                <Popup icon='dotver'
                                    styles={{ position: music.list.length - ind <= 3 ? 'lt' : 'l', width: '230px' }}
                                >
                                    <PopUpConf song={doc} />
                                </Popup>
                            </span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BodyList;