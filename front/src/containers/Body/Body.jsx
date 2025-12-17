import './body.css';
import { useEffect, useState } from 'react';
import BodyList from './BodyList/BodyList.jsx';
import BodyCategories from './BodyCategories/bodyCategories.jsx';

const Body = () => {

    const [list, setList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            
        }; fetchData();
    }, []);

    return (
        <div className="body">
            <BodyCategories />
            <BodyList />
        </div>
    );
};

export default Body;