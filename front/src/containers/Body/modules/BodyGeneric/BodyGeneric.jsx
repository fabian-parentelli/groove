import BgSongs from "./comps/BgSongs/BgSongs.jsx";
import BodyAlbums from "../BodyAlbums/BodyAlbums.jsx";
import BodyTopics from "../BodyTopics/BodyTopics.jsx";

const BodyGeneric = () => {

    return (
        <div className="flex-col">
            <BgSongs />
            <BodyAlbums limit={9} />
            <BodyTopics query={{ limit: 8 }} />
            <br />
        </div>
    );
};

export default BodyGeneric;