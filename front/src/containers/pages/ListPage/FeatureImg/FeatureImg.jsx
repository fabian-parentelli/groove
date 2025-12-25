import './featureImg.css';
import { useEffect } from 'react';
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useRadioContext } from '@/context/RadioContext.jsx';

const FeatureImg = ({ currentTrack, songs }) => {

    const { setCurrentTrack } = useRadioContext();

    useEffect(() => {
        if (!songs) return;
        const song = songs.songs.find(doc => doc.yid === currentTrack.id);
        if (song) setCurrentTrack(prev => ({ 
            ...prev, image: song.img, topics: song.topics,
            title: song.title.split('-')[0],
            author: song.author || currentTrack.author
        }));
    }, [currentTrack.id]);

    return (
        <div className="featureImg">
            <h2>{currentTrack.title}</h2>
            <img src={currentTrack?.image || '/list.png'} alt="img" />
            <p>{currentTrack?.author?.split('-')[0] || currentTrack?.author}</p>

            <section>
                {currentTrack && currentTrack?.topics && currentTrack?.topics.map(doc => (
                    <div key={doc}>
                        <p>{categoriesDic(doc)}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default FeatureImg;