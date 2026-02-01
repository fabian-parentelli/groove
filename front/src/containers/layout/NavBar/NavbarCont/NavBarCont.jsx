import './navBarCont.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icons, Tooltip } from 'fara-comp-react';
import NavBarMenu from '../NavBarMenu/NavBarMenu.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';
import Navbarinput from '../NavbarInput/Navbarinput.jsx';

const NavBarCont = () => {

    const { user, current } = useLoginContext();

    useEffect(() => { current() }, []);

    return (
        <div className="navBarCont">

            <section className='navBarContNav'>
                <br />
                <Link to={'/'} className='navBarContTit'>
                    <img src="/logo.png" width='30px' alt="img" />
                    <h1>Groove</h1>
                </Link>
            </section>

            <Navbarinput />

            <section className='navBarContR'>

                {user.logged
                    ? <NavBarMenu user={user.data} />
                    : <Tooltip text='Iniciar sesión' position='left' backgroundColor='#1B263B'>
                        <Link to={'/user?path=login'} className='navBarContNavMenu'>
                            <Icons type='user' color='white' />
                        </Link>
                    </Tooltip>
                }

            </section>
        </div>
    );
};

export default NavBarCont;