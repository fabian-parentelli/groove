// import './categoryPage.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoriesDic } from "@/utils/dictionary.utils.js";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useRadioContext } from "@/context/RadioContext.jsx";
import { getMusicApi } from '@/helpers/music/getMusic.api.js';

const CategoryPage = () => {

    const { cat } = useParams();
    const { showAlert } = useAlertContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMusicApi({ category: cat, limit: 50 });
            if(response.status === 'success') {

                console.log(response);

                // Bueno estoy acá tengo que hacer andar esto ....
                // Bueno estoy acá tengo que hacer andar esto ....
                // Bueno estoy acá tengo que hacer andar esto ....
                // Bueno estoy acá tengo que hacer andar esto ....
                // Bueno estoy acá tengo que hacer andar esto ....
                
            } else showAlert(response.error, 'error');
        }; fetchData();
    }, []);


    return (
        <div className="categoryPage">

        </div>
    );
};

export default CategoryPage;