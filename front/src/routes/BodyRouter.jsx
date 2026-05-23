import { Route } from 'react-router-dom';
import Body from '../containers/Body/Body.jsx';
import BodyGeneric from '../containers/Body/modules/BodyGeneric/BodyGeneric.jsx';
import BodyExplore from '../containers/Body/modules/BodyExplore/BodyExplore.jsx';
import BodyAlbums from '../containers/Body/modules/BodyAlbums/BodyAlbums.jsx';

const BodyRouter = () => {

    return (
        <Route path='/' element={<Body />}>
            <Route index element={<BodyGeneric />} />
            <Route path='explore' element={<BodyExplore />} />
            <Route path='albums' element={<BodyAlbums />} />

        </Route>
    );
};

export default BodyRouter;