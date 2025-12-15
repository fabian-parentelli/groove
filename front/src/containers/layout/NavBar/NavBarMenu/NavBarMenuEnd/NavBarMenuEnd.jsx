import './navBarMenuEnd.css';
import { Icons } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext';

const NavBarMenuEnd = () => {

    const { logout } = useLoginContext();
    const navigate = useNavigate();

    const handleEnd = () => {
        logout();
        navigate('/');
    };

    return (
        <div className='navBarMenuEnd' onClick={handleEnd}>
            <Icons type='door' color='gray' size='25px' />
            <p>Cerrar sesión</p>
        </div>
    );
};

export default NavBarMenuEnd;