import './body.css';
import { Outlet } from 'react-router-dom';
import BodyNav from './comp/BodyNav/BodyNav.jsx';
import BodyList from './comp/BodyList/BodyList.jsx';
import BodyPanel from './comp/BodyPanel/BodyPanel.jsx';

const Body = () => {

    return (
        <div className="body flex">
            <BodyPanel />
            <section className='flex w-100per flex-col-base bodySect'>
                <BodyNav />

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