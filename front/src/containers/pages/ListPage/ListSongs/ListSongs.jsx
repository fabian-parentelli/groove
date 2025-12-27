import './listSongs.css';
import { useState } from 'react';
import { formatTime } from '@/utils/time.utils.js';
import { Icons, Pager, Modal } from "fara-comp-react";
import { useRadioContext } from '@/context/RadioContext.jsx';
import ModalOptions from '../../../../components/modals/ModalOptions/ModalOptions';

const ListSongs = ({ currentTrack, songs, handleNewList, setQuery }) => {

    const { handlePlayPause, isPlaying, playAtIndex, params } = useRadioContext();

    const [modal, setModal] = useState({ open: false, data: null });

    return (
        <div className="listSongs">
            <h2>{songs?.listName || 'Playlist'}</h2>

            <section className='listSongsSect'>
                {songs && songs.songs.map((doc, ind) => (
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
                                            ? currentTrack.id === doc.yid ? handlePlayPause : !setQuery ? () => playAtIndex(ind) : () => handleNewList(doc.yid)
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
                                            ? currentTrack.id === doc.yid ? handlePlayPause : !setQuery ? () => playAtIndex(ind) : () => handleNewList(doc.yid)
                                            : () => handleNewList(doc.yid)
                                    }
                                />
                            </div>

                            <img src={doc.img || '/list.jpg'} width='40px' alt="img" />

                            <div className='listSongsOneText'>
                                <h5>{doc.title.split('-')[0]}</h5>
                                <p className='pgray'>{doc?.author}</p>
                            </div>
                        </section>

                        <section>
                            <p>{formatTime(doc.duration)}</p>
                            <div className='listSongsOneIconTwo'>
                                <Icons type='dotver' color='white' size='20px'
                                    onClick={() => setModal({ open: true, data: { _id: doc._id, yid: doc.yid } })}
                                />
                            </div>
                        </section>
                    </div>
                ))}
            </section>

            {setQuery && <Pager docs={songs} setQuery={setQuery} backgroundColor='#1B263B' />}

            <Modal open={modal.open} onClose={() => setModal({ open: false, data: null })}>
                <ModalOptions data={modal.data} setModal={setModal} />
            </Modal>
        </div>
    );
};

export default ListSongs;