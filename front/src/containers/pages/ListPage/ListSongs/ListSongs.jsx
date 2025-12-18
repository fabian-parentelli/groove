import './listSongs.css';

const ListSongs = ({ currentTrack, songs }) => {

    return (
        <div className="listSongs">
            <h2>{songs?.listName || 'Playlist'}</h2>
    
        </div>
    );
};

export default ListSongs;