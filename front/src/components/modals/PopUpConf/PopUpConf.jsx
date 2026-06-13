import './popUpConf.css';
import { useState } from 'react';
import { Icons } from 'fara-comp-react';
import { useLoginContext } from '@/context/LoginContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';

const PopUpConf = ({ song }) => {

    const { user } = useLoginContext();
    const { setModal } = useAlertContext();

    if (song) return (
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
                    {list.map(doc => (
                        <div onClick={() => setModal({ open: true, data: song, type: doc.type })}>
                            <Icons type={doc.icon} size='20px' color='white' />
                            <p>{doc.name}</p>
                        </div>
                    ))}
                </section>
            }

        </div>
    );
};

export default PopUpConf;

const list = [
    { icon: 'setting', name: 'Editar', type: 'settingSongs' },
    { icon: 'playlistad', name: 'Guardar en una playlist', type: 'addplist' }
];