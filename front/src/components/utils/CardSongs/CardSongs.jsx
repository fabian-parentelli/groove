import './cardSongs.css';
import { Icons } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/time.utils.js';

const CardSongs = ({ songs, handlePlay }) => {

    const navigate = useNavigate();

    return (
        <div className="cardSongs">
            {songs?.map((song, ind) => (
                <div className="cardSong" key={song._id}>
                    <div className="cardSongImg" onClick={() => navigate(`/song/${song._id}`)}>
                        <img src={song.img} alt={song.title} />
                    </div>
                    
                    <div className="cardSongInfo">
                        <div className="cardSongText">
                            <p className="cardSongTitle">{song.title}</p>
                            <p className="cardSongAuthor">{song.author}</p>
                            <p className="cardSongDuration">{formatTime(song.duration)}</p>
                        </div>

                        <div className="cardSongPlay" onClick={() => handlePlay(ind)}>
                            <Icons type='play' color='white' size='20px' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardSongs;