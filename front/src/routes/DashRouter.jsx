import { Route } from 'react-router-dom';
import DashBoard from '../containers/Dashboard/DashBoard';
import DashPanle from '../containers/Dashboard/modules/DashPanel/DashPanel';
import DashAdMusic from '../containers/Dashboard/modules/DashAdMusic/DashAdMusic';

const DashRouter = () => {

    return (
        <Route path='dashboard' element={<DashBoard />}>
            <Route index element={<DashPanle />} />
            <Route path='admusic' element={<DashAdMusic />} />
        </Route>
    );
};

export default DashRouter;