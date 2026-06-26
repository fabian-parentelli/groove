import './body.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BodyNav from './comp/BodyNav/BodyNav.jsx';
import BodyList from './comp/BodyList/BodyList.jsx';
import BodyPanel from './comp/BodyPanel/BodyPanel.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';

const Body = () => {

    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
    const { viewPlayList, setViewPlayList } = useAlertContext();

    const handleOverlayClick = () => {
        setMobilePanelOpen(false);
        if (viewPlayList) setViewPlayList(false);
    };

    return (
        <div className="body flex">
            {(mobilePanelOpen || viewPlayList) && <div className="bodyOverlay" onClick={handleOverlayClick} />}
            <BodyPanel mobileOpen={mobilePanelOpen} onClose={() => setMobilePanelOpen(false)} />
            <section className='flex w-100per flex-col-base bodySect'>
                <BodyNav onMenuToggle={() => setMobilePanelOpen(!mobilePanelOpen)} />

                <div className='flex h-100per' >

                    <div className='bodyModules'>
                        <Outlet />
                    </div>

                    <BodyList />
                </div>
            </section>
        </div>
    );

};

export default Body;