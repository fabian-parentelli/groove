import './listSongs.css';
import { Icons } from "fara-comp-react";
import { useRadioContext } from '@/context/RadioContext.jsx';

const ListSongs = ({ currentTrack, songs, handleNewList }) => {

    const { handlePlayPause, isPlaying, playAtIndex, params } = useRadioContext();

    return (
        <div className="listSongs">
            <h2>{songs?.listName || 'Playlist'}</h2>

            <section className='listSongsSect'>
                {songs && params && params?.lid && songs.songs.map((doc, ind) => (
                    <div
                        key={doc._id} className='listSongsOne'
                        style={{ backgroundColor: currentTrack.id == doc.yid ? '#1B263B' : '' }}
                    >

                        <section>

                            <div className='listSongCel'>
                                <Icons
                                    type={currentTrack.id !== doc.yid ? 'play'
                                        : isPlaying ? 'pause' : 'play'
                                    }
                                    color='white'
                                    onClick={
                                        currentTrack.lid === params?.lid
                                            ? currentTrack.id === doc.yid ? handlePlayPause : () => playAtIndex(ind)
                                            : () => handleNewList(doc.yid)
                                    }
                                />
                            </div>

                            <div className='listSongsOneIcon'>
                                <Icons
                                    type={currentTrack.id !== doc.yid ? 'play'
                                        : isPlaying ? 'pause' : 'play'
                                    }
                                    color='white'
                                    onClick={
                                        currentTrack.lid === params?.lid
                                            ? currentTrack.id === doc.yid ? handlePlayPause : () => playAtIndex(ind)
                                            : () => handleNewList(doc.yid)
                                    }
                                />
                            </div>

                            <img src={doc.img || '/list.jpg'} width='40px' alt="img" />

                            <div className='listSongsOneText'>
                                <h5>{doc.title.split('-')[0]}</h5>
                                <p className='pgray'>{doc.title.split('-')[1]}</p>
                            </div>
                        </section>

                        <section>
                            <p>{seconds(doc.duration)}</p>
                            <div className='listSongsOneIconTwo'>
                                <Icons type='dotver' color='white' onClick={() => console.log('camina')} size='20px' />
                            </div>
                        </section>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ListSongs;

function seconds(second) {
    const min = Math.floor(second / 60);
    const sec = second % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
};