import { Icons } from 'fara-comp-react';

const PcSong = ({ song, user, setModal }) => {

    return (
        <div className="popUpConf">

            <section className='popUpConfSect'>
                <div className='popUpConfImg'>
                    <img src={song.img} alt="" />
                </div>
                <div className='popUpConfText'>
                    <h3>{song.title}</h3>
                    <p className='pgray'><span>{song.album}</span> - <span>{song.author}</span></p>
                </div>
            </section>

            {!user.logged
                ? <p>Usuario no logeado</p>
                : <section className='popUpConfList'>
                    {list.map((doc, ind) => (
                        <div key={ind} onClick={() => setModal({ open: true, data: song, type: doc.type })}>
                            <Icons type={doc.icon} size='20px' color='white' />
                            <p>{doc.name}</p>
                        </div>
                    ))}
                </section>
            }

        </div>
    );
};

export default PcSong;

const list = [
    { icon: 'setting', name: 'Editar', type: 'settingSongs' },
    { icon: 'playlistad', name: 'Guardar en una playlist', type: 'addplist' }
];