import './bodyTopics.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveMusic } from "@/utils/db.utils.js";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import { getCategoriesApi } from '@/helpers/categories/getCategories.api.js';

const BodyTopics = () => {

    const navigate = useNavigate();
    const { showAlert, setChangeList } = useAlertContext();
    const { setPlayList } = useRadioContext();

    const [topcis, setTopics] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoriesApi();
            if (response.status === 'success') setTopics(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handleClick = async (topic) => {
        const response = await getMusicApi({ category: topic, limit: 50, random: true });
        if (response.status === 'success') {
            await saveMusic({ name: topic, is: 'Topics', list: response.result });
            setChangeList(pre => (pre + 1));
            setPlayList(response.result.map(doc => doc.yid));
        } else showAlert(response.error, 'error');
    };

    if (!topcis) return <div className='flex-center h-100per'><Spinner color='#4f46e5' size='50px' /></div>
    return (
        <div className="bodyTopics flex-col">
            <h1>Géneros</h1>

            <section>
                {topcis && topcis.map(doc => (
                    <div key={doc._id} className="topic-card">
                        <img src={doc.img} alt={doc?.topic || doc?.name}
                            onClick={() => navigate(`/topic/${doc._id}`)}
                        />
                        <button className="play-btn" onClick={() => handleClick(doc.name)}>▶</button>
                        <span className="topic-label">{doc.topic}</span>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BodyTopics;