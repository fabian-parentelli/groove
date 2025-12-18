import './featureImg.css';
import { useEffect, useState } from 'react';
import { categoriesDic } from '@/utils/dictionary.utils.js';

const FeatureImg = ({ currentTrack, songs }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        if(!songs) return;
        const song = songs.songs.find(doc => doc.yid === currentTrack.id);
        if(song) setData(song);
    },[currentTrack]);

    return (
        <div className="featureImg">
            <h2>{currentTrack.title}</h2>
            <img src={data?.img || '/list.jpg'} alt="img" style={{maxWidth: currentTrack?.image ? '500px' : '300px'}} />
            <p>{currentTrack?.author}</p>
            
            <section>
                {data && data.topics.map(doc=> (
                    <div key={doc}>
                        <p>{categoriesDic(doc)}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default FeatureImg;