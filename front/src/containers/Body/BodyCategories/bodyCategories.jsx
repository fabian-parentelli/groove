import './bodyCategories.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from '@/context/RadioContext.jsx';
import { getCategoriesApi } from '@/helpers/categories/getCategories.api.js';


const BodyCategories = () => {

    const navigate = useNavigate();
    const { showAlert } = useAlertContext();
    const { setParams } = useRadioContext();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoriesApi();
            if (response.status === 'success') setCategories(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    const handleNav = (name) => {
        navigate(`/category`);
        setParams({ lid: name, page: 1 });
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