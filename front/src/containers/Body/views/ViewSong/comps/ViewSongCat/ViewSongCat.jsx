import './viewSongCat.css';
import { Spinner } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getCategoriesApi } from '@/helpers/categories/getCategories.api.js';

const ViewSongCat = ({ song, view }) => {

    const navigate = useNavigate();
    const { showAlert } = useAlertContext();

    const [topics, setTopics] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoriesApi({ names: song.topics.join(',') });
            if (response.status === 'success') setTopics(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    if (!topics) return <Spinner color='#4f46e5' />
    return (
        <div className="viewSongCat" style={{ flexDirection: view }}>
            {topics.map(topic => (
                <div key={topic._id} className="viewSongCatItem">
                    <div className="viewSongCatImg" onClick={() => navigate(`/topic/${topic.name}`)}>
                        <img src={topic.img} alt={topic.topic} />
                    </div>
                    <p className="viewSongCatTopic">{topic.topic}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewSongCat;