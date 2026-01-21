import './body.css';
import BodyList from './BodyList/BodyList.jsx';
import BodyCategories from './BodyCategories/bodyCategories.jsx';
import BodySongs from './BodySongs/BodySongs.jsx';

const Body = () => {

    return (
        <div className="body">
            <BodyCategories />
            <BodyList />
            <BodySongs />
        </div>
    );
};

export default Body;