import './navBarMenuLinks.css';
import { Link } from 'react-router-dom';
import { Icons } from 'fara-comp-react';

const NavBarMenuLinks = () => {

    return (
        <div className='navBarMenuLinks'>

            <Link to={'/dashboard'}>
                <Icons type='dashboard' color='gray' size='25px' />
                <p>Panel</p>
            </Link>

            <Link to={'/favorites'}>
                <Icons type='star' color='gray' size='25px' />
                <p>Favoritos</p>
            </Link>

            <Link to={'/messages'}>
                <Icons type='message' color='gray' size='25px' />
                <p>Mensajes</p>
            </Link>

            <Link to={'/dashboard/activity?type=alerts'}>
                <Icons type='bell' color='gray' size='25px' />
                <p>Alertas</p>
            </Link>

            <Link to={'/dashboard/activity?type=activity'}>
                <Icons type='activity' color='gray' size='25px' />
                <p>Actividad</p>
            </Link>

        </div>
    );
};

export default NavBarMenuLinks;