import { Route } from 'react-router-dom';
import Body from '../containers/Body/Body.jsx';
import { useLoginContext } from '../context/LoginContext.jsx';
import BodyGeneric from '../containers/Body/modules/BodyGeneric/BodyGeneric.jsx';
import BodyExplore from '../containers/Body/modules/BodyExplore/BodyExplore.jsx';
import BodyAlbums from '../containers/Body/modules/BodyAlbums/BodyAlbums.jsx';
import ViewAlbum from '../containers/Body/views/ViewAlbum/ViewAlbum.jsx';
import BodyTopics from '../containers/Body/modules/BodyTopics/BodyTopics.jsx';
import ViewTopic from '../containers/Body/views/ViewTopic/ViewTopic.jsx';
import ViewSong from '../containers/Body/views/ViewSong/ViewSong.jsx';
import BodyPlayList from '../containers/Body/modules/BodyPlayList/BodyPlayList.jsx';
import YourSongs from '../containers/Body/profilmod/YourSongs/YourSongs.jsx';
import BodyInfo from '../containers/Body/modules/BodyInfo/BodyInfo.jsx';
import ViewAuthor from '../containers/Body/views/ViewAuthor/ViewAuthor.jsx';

const BodyRouter = () => {

    const { user } = useLoginContext();

    return (
        <Route path='/' element={<Body />}>
            <Route index element={<BodyGeneric />} />
            <Route path='explore' element={<BodyExplore />} />
            <Route path='albums' element={<BodyAlbums />} />
            <Route path='topics' element={<BodyTopics />} />
            <Route path='info' element={<BodyInfo />} />

            <Route path='album/:id' element={<ViewAlbum />} />
            <Route path='topic/:topname' element={<ViewTopic />} />
            <Route path='song/:id' element={<ViewSong />} />
            <Route path='playlist' element={<BodyPlayList />} />
            <Route path='author/:name' element={<ViewAuthor />} />

            {user.logged &&
                <>
                    <Route path='yoursongs' element={<YourSongs />} />
                </>
            }
        </Route>
    );
};

export default BodyRouter;