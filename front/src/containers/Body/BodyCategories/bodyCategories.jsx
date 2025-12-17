import './bodyCategories.css';
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
                <div key={doc._id}>
                    <p>{categoriesDic(doc.name)}</p>
                </div>
            ))}
        </div>
    );
};

export default BodyCategories;