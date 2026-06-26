import { Icons } from 'fara-comp-react';

const PcPlayList = ({ song, user, setModal, handlePlay }) => {

    return (
        <div className="popUpConf">

            <section className='popUpConfSect'>
                <div className='popUpConfImg'>
                    <img src={song.img} alt="img" />
                </div>
                <div className='popUpConfText'>
                    <h3>{song.name}</h3>
                    <p className='pgray'>Tu playlist</p>
                </div>
            </section>

            {!user.logged
                ? <p>Usuario no logeado</p>
                : <section className='popUpConfList'>
                    {list.map((doc, ind) => (
                        <div key={ind}
                            onClick={doc.type === 'play'
                                ? () => handlePlay(song)
                                : doc.type === 'random' 
                                ? () => handlePlay(song, true)
                                :() => setModal({ open: true, data: song, type: doc.type })
                            }
                        >
                            <Icons type={doc.icon} size='20px' color='white' />
                            <p>{doc.name}</p>
                        </div>
                    ))}
                </section>
            }
        </div>
    );
};

export default PcPlayList;

const list = [
    { icon: 'play', name: 'Escuchar', type: 'play' },
    { icon: 'exchange', name: 'Reproducir aleatorio', type: 'random' },
    { icon: 'setting', name: 'Editar', type: 'setting-pl' },
    { icon: 'delete', name: 'Eliminar', type: 'delete-pl' }
];