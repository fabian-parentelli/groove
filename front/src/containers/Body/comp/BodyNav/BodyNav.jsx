import './bodyNav.css';
import { useNavigate } from 'react-router-dom';
import Navbarinput from './comp/NavbarInput/Navbarinput.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';

const BodyNav = () => {

    const { user } = useLoginContext();

    const navigate = useNavigate();

    return (
        <div className="bodyNav">
            <Navbarinput />

            <button className='btn btnF w-150'
                onClick={() => navigate(user.logged ? '/newplaylist' : '/user?path=login')}
            >
                {user.logged
                    ? 'Importar playlist'
                    : 'Iniciar sesión'
                }
            </button>

        </div>
    );
};

export default BodyNav;