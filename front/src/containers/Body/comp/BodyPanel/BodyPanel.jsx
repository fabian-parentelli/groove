import './bodyPanel.css';
import { Icons } from 'fara-comp-react';
import { Link, useLocation } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext.jsx';

const BodyPanel = ({ mobileOpen, onClose }) => {

    const { user } = useLoginContext();
    const { pathname } = useLocation();

    return (
        <div className={`bodyPanel ${mobileOpen ? 'bodyPanel--open' : ''}`}>

            <section className='bodyPanelTitle'>
                <button className='bodyPanelClose' onClick={onClose}>✕</button>
                <img src="/logo.png" width='50px' alt="logo" />
                <div>
                    <h1>Groove</h1>
                    <p>Música sin publicidad</p>
                </div>
            </section>

            <section className='bodyPanelSect'>
                {items.map(doc => (
                    <Link key={doc.icon} to={`/${doc.to}`}
                        style={{ color: pathname.slice(1) == doc.to ? '#4f46e5' : 'white' }}
                    >
                        <Icons type={doc.icon} size='22px'
                            color={pathname.slice(1) == doc.to ? '#4f46e5' : 'white'}
                        />
                        <p>{doc.name}</p>
                    </Link>
                ))}
            </section>

            <h3>Mi música</h3>

            <section className='bodyPanelSect'>
                {yourMusic.map(doc => (
                    <Link key={doc.icon} to={`/${doc.to}`}
                        style={{ color: pathname.slice(1) == doc.to ? '#4f46e5' : 'gray' }}
                    >
                        <Icons type={doc.icon} size='19px'
                            color={pathname.slice(1) == doc.to ? '#4f46e5' : 'gray'}
                        />
                        <p style={{ fontSize: '14px' }}>{doc.name}</p>
                    </Link>
                ))}

                {user?.logged && user?.data?.role === 'admin' &&
                    <Link to={`/dashboard`} style={{ color: 'gray' }}>
                        <Icons size='20px' color='gray' />
                        <p style={{ fontSize: '14px' }}>Panel</p>
                    </Link>
                }
            </section>

        </div>
    );
};

export default BodyPanel;

const items = [
    { icon: 'house', name: 'Inicio', to: '' },
    { icon: 'direction', name: 'Explorar', to: 'explore' },
    { icon: 'album', name: 'Álbumes', to: 'albums' },
    { icon: 'filemusic', name: 'Géneros', to: 'topics' },
    { icon: 'warning', name: 'Información', to: 'help' },
    { icon: 'youtube', name: 'Importar playlist', to: 'newplaylist' },
    { icon: 'email', name: 'Contacto', to: 'contact' },
];

const yourMusic = [
    { icon: 'playlist', name: 'Canciones', to: 'yoursongs' },
    { icon: 'square', name: 'Álbumes', to: 'youralbums' },
    { icon: 'user', name: 'Artistas', to: 'yourartist' },
    { icon: 'book', name: 'Historial', to: 'yourhistory' },
];