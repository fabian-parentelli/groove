import './bodyCategories.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getMusicApi } from '@/helpers/music/getMusic.api.js';
import { getCategoriesApi } from '@/helpers/categories/getCategories.api.js';


const BodyCategories = () => {

    const navigate = useNavigate();

    const { setPlayList, isPlaying } = useRadioContext();
    const { showAlert } = useAlertContext();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoriesApi();
            if (response.status === 'success') setCategories(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handleNav = async (name) => {
        if(isPlaying) return navigate(`/preview?type=category&cat=${name}`);
        const response = await getMusicApi({ category: name, limit: 50 });
        if (response.status === 'success') {
            const yids = response.result.docs.map(doc => doc.yid);
            setPlayList(yids);
            navigate(`/player?type=category&name=${categoriesDic(name)}`);
        };
    };

    return (
        <div className="bodyCategories">
            {categories && categories.length > 0 && categories.map(doc => (
                <div onClick={() => handleNav(doc.name)} key={doc._id}>
                    <p>{categoriesDic(doc.name)}</p>
                </div>
            ))}
        </div>
    );
};

export default BodyCategories;