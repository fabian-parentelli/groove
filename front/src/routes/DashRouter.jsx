import { Route } from 'react-router-dom';
import DashBoard from '../containers/Dashboard/DashBoard';
import DashPanle from '../containers/Dashboard/modules/DashPanel/DashPanel';
import DashAdMusic from '../containers/Dashboard/modules/DashAdMusic/DashAdMusic';
import NotFound from '../containers/layout/NotFound/NotFound';
import DashSongs from '../containers/Dashboard/modules/DashSongs/DashSongs';
import DashLists from '../containers/Dashboard/modules/DashLists/DashLists';

const DashRouter = () => {

    return (
        <Route path='dashboard' element={<DashBoard />}>
            <Route index element={<DashPanle />} />
            <Route path='admusic' element={<DashAdMusic />} />
            <Route path='songs' element={<DashSongs />} />
            <Route path='lists' element={<DashLists />} />
            <Route path='*' element={<NotFound />} />
        </Route>
    );
};

export default DashRouter;