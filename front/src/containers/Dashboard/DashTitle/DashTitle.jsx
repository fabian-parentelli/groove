import './dashTitle.css';
import { useEffect, useState } from 'react';
import { Icons } from 'fara-comp-react';
import { useLocation } from 'react-router-dom';
import { dashModules } from '@/utils/dashModules.utils.js';

const DashTitle = () => {

    const location = useLocation();

    const [data, setData] = useState({});

    useEffect(() => {
        const parts = location.pathname.split('/');
        const url = parts.length === 2 ? 'panel' : parts[2];
        const moduleData = dashModules.find(doc => doc.link === url);
        setData(moduleData);
    }, [location.pathname]);

    return (
        <div className="dashTitle">

            <section className='dashTitleLeft'>
                <Icons type={data?.icon} color='#1B263B' />
                <h4>{data?.name}</h4>
            </section>

        </div>
    );
};

export default DashTitle;