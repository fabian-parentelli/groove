import './dashBoard.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.jsx';
import DashTitle from './DashTitle/DashTitle.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';

const DashBoard = () => {

    const { user } = useLoginContext();

    return (
        <div className="dashBoard">
            <Sidebar user={user.data} />

            <section className='dashBoardSect'>
                <DashTitle />
                <Outlet context={{ user: user.data }} />
            </section>
        </div>
    );
};

export default DashBoard;