import './bodyCategories.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoriesDic } from '@/utils/dictionary.utils.js';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getCategoriesApi } from '@/helpers/categories/getCategories.api.js';

const BodyCategories = () => {

    const { showAlert } = useAlertContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCategoriesApi();
            if (response.status === 'success') setCategories(response.result);
            else showAlert(response.error, 'error');
        }; fetchData();
    }, []);

    return (
        <div className="bodyCategories">
            {categories && categories.length > 0 && categories.map(doc => (
                <Link to={`/category/${doc.name}`} key={doc._id}>
                    <p>{categoriesDic(doc.name)}</p>
                </Link>
            ))}
        </div>
    );
};

export default BodyCategories;