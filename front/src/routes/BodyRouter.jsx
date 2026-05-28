import { Route } from 'react-router-dom';
import Body from '../containers/Body/Body.jsx';
import BodyGeneric from '../containers/Body/modules/BodyGeneric/BodyGeneric.jsx';
import BodyExplore from '../containers/Body/modules/BodyExplore/BodyExplore.jsx';
import BodyAlbums from '../containers/Body/modules/BodyAlbums/BodyAlbums.jsx';
import ViewAlbum from '../containers/Body/views/ViewAlbum/ViewAlbum.jsx';
import BodyTopics from '../containers/Body/modules/BodyTopics/BodyTopics.jsx';
import ViewTopic from '../containers/Body/views/ViewTopic/ViewTopic.jsx';
import ViewSong from '../containers/Body/views/ViewSong/ViewSong.jsx';

const BodyRouter = () => {

    return (
        <Route path='/' element={<Body />}>
            <Route index element={<BodyGeneric />} />
            <Route path='explore' element={<BodyExplore />} />
            <Route path='albums' element={<BodyAlbums />} />
            <Route path='topics' element={<BodyTopics />} />

            <Route path='album/:id' element={<ViewAlbum />} />
            <Route path='topic/:topname' element={<ViewTopic />} />
            <Route path='song/:id' element={<ViewSong />} />
        </Route>
    );
};

export default BodyRouter;