import './playerList.css';
import { Icons } from 'fara-comp-react';
import { useEffect, useState } from 'react';
import { useRadioContext } from '@/context/RadioContext.jsx';

const PlayerList = ({ songs, info }) => {

    const { playAtIndex } = useRadioContext();
    const [title, setTitle] = useState('Canciones Groove');

    useEffect(() => {
        const type = sessionStorage.getItem('type');
        if (type === 'random') setTitle('Canciones random');
        if (type !== 'random') setTitle(type);
    }, [songs]);

    return (
        <div className="playerList">
            <h3>{title || 'Canciones Groove'}</h3>

            <section className='playerListSongs'>
                {songs && songs.docs.map((doc, ind) => (

                    <div
                        key={doc._id} className='playerListSongsDiv'
                        style={{ backgroundColor: info?._id == doc?._id ? '#1B263B' : '' }}
                    >

                        <div>
                            <img src={doc?.img} alt="img" />
                            <div className='playerListSongsDivPP'>
                                <p>{doc?.author ? doc?.title : doc?.title.split('-')[0]}</p>
                                <p>{doc?.author || doc?.title.split('-')[1]}</p>
                            </div>
                        </div>

                        <div>
                            <div className='playerListSongsIcon'>
                                <Icons type='play' color={'white'} size='20px'
                                    onClick={() => playAtIndex(ind)}
                                />
                            </div>

                            <div className='playerListSongsIcon'>
                                <Icons type='dotver' color={'white'} size='20px' />
                            </div>
                        </div>

                    </div>
                ))}
            </section>

        </div>
    );
};

export default PlayerList;