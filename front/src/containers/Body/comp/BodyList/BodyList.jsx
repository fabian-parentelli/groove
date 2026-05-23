import './bodyList.css';
import { Icons } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { getMusic } from '@/utils/db.utils.js';
import { formatTime } from '@/utils/time.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';

const BodyList = () => {

    const { videoId, playAtIndex } = useRadioContext();
    const { viewPlayList, changeList } = useAlertContext();

    const [music, setMusic] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusic();
            if (response) setMusic(response);
        }; fetchData();
    }, [changeList]);

    return (
        <div className={`bodyList ${viewPlayList ? 'bodyList--visible' : ''}`}>
            <h3>{music?.name || 'Titulo de la playlist'}</h3>
            {music?.is === 'album' && <p className='bodyListAuthor'>{music?.author}</p>}

            <section className='bodyListSect'>
                {music?.list?.map((doc, ind) => (
                    <div key={doc._id} className='bodyListDiv'
                        style={{ backgroundColor: videoId === doc.yid ? '#171919' : '' }}
                    >

                        <section className='flex ai-center'>
                            <div className='bodyListImg'>
                                <img src={doc.img} alt="img" />
                                <div className='bodyListImgOverlay'>
                                    <Icons type='play' color='white' size='20px'
                                        onClick={() => playAtIndex(ind)}
                                    />
                                </div>
                            </div>

                            <div className='w-150'>
                                <h6 className='p-elipsis'>{doc.title}</h6>
                                <p className='bodyListAuthor p-elipsis'>{doc.author}</p>
                            </div>
                        </section>

                        <div className='bodyListTime'>
                            <span className='bodyListTimeText'>{formatTime(doc.duration)}</span>
                            <span className='bodyListTimeIcon'>
                                <Icons type='dotver' color='white' size='25px' onClick={() => console.log('dotver clicked')} />
                            </span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BodyList;