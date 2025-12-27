import './footer.css';
import { Link } from 'react-router-dom';
import FooterColumn from './FooterColumn/FooterColumn';
import FooterSocial from './FooterSocial/FooterSocial';

const Footer = () => {

    return (
        <div className='footer'>

            <Link to={'/'} className='footerA'>
                <img src="/logo.png" width={'30px'} alt="carrot" />
                <p>Groove Music</p>
            </Link>

            <section className='footerTop'>
                <FooterColumn data={columnA} />
                <FooterColumn data={columnB} />
                <FooterColumn data={columnC} />
                <FooterColumn data={columnD} />
            </section>

            <section className='footerBottom'>

                <div className='footerBottomL'>
                    <Link to={'/'}>
                        <img src='/logo.png' width={'30px'} alt="logo" />
                    </Link>
                    <p className='footerBottomCata'>Groove Music</p>
                    <FooterSocial />
                </div>

                <div className='footerBottomL'>
                    <p className='pgray'>© 2025 Faraday's House </p>

                    <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                        <img className='footerBottomImg' src='/faraday.png' width='30px' alt="img" />
                    </a>
                    <p className='pgray'>Todos los derechos reservados.</p>

                    <Link to={'/condition'} style={{ textDecoration: 'none' }}>
                        <p className='pgray'>Términos y condicones</p>
                    </Link>
                    <p className='pgray'>|</p>

                    <Link to={'/securitypolicies'} style={{ textDecoration: 'none' }}>
                        <p className='pgray'>Política de Privacidad</p>
                    </Link>
                </div>

            </section>
        </div>
    );
};

export default Footer;

const columnA = {
    title: 'Groove',
    content: [
        { text: 'Ayuda', link: '/helps' },
        { text: 'Qiénes somos', link: '/us' },
        { text: 'Videos tutoriales ', link: '/videotut' },
        { text: 'Noticias y Avances', link: '/ournews' },
        { text: 'Próximamente en UnderPass', link: '/future' },
        { text: 'Preguntas frecuentes', link: '/asked' },
        { text: 'Galería', link: '/gallery' },
    ]
};

const columnB = {
    title: 'Plataforma',
    content: [
        { text: '', link: '/newevent' },
    ]
};

const columnC = {
    title: 'Usuario',
    content: [
        { text: 'Iniciar sesión', link: '/user?path=login' },
        { text: 'Registrate', link: '/user?path=register' },
        { text: 'Panel', link: '/dashboard' },
        { text: 'Alertas', link: '/alerts' },
        { text: 'Mensajes', link: '/contact' },
        { text: 'Actividad', link: '/activities' },
    ]
};

const columnD = {
    title: 'Secciónes',
    content: [
        { text: '', link: '/events' },
    ]
};