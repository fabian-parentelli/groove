import './playerList.css';
import { Icons } from 'fara-comp-react';

const PlayerList = ({ songs, info }) => {

    return (
        <div className="playerList">
            <h3>Canciones Random</h3>

            <section className='playerListSongs'>
                {songs && songs.docs.map(doc => (
                    
                    <div 
                        key={doc._id} className='playerListSongsDiv'
                        style={{backgroundColor: info?._id == doc?._id ? '#1B263B' : ''}}
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
                                <Icons type='play' color={'white'} size='20px' />
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