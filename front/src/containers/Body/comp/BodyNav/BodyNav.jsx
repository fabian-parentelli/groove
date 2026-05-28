import './bodyNav.css';
import { useState } from 'react';
import { Icons, Modal } from 'fara-comp-react';
import { useNavigate } from 'react-router-dom';
import Navbarinput from './comp/NavbarInput/Navbarinput.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';

const BodyNav = ({ onMenuToggle }) => {

    const navigate = useNavigate();
    const { user } = useLoginContext();

    const [modal, setModal] = useState({ open: false });

    return (
        <div className="bodyNav">

            <button className='bodyNavHamburger' onClick={onMenuToggle}>
                <Icons type='menu' color='white' size='20px' />
            </button>

            <button className='bodyNavHamburger' onClick={() => setModal({ open: true })}>
                <Icons type='zoom' color='white' size='20px' />
            </button>

            <div className='bodyNavSearch'>
                <Navbarinput />
            </div>

            <button className='btn btnF w-150'
                onClick={() => navigate(user.logged ? '/newplaylist' : '/user?path=login')}
            >
                {user.logged
                    ? 'Importar playlist'
                    : 'Iniciar sesión'
                }
            </button>

            <Modal open={modal.open} onClose={() => setModal({ oepn: false })} backgroundColor='#0c0d0d'>
                <div style={{ maxWidth: '300px', width: '100%' }}>
                    <Navbarinput setModal={setModal} />
                </div>
            </Modal>
        </div>
    );
};

export default BodyNav;