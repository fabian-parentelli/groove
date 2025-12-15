import './user.css';
import Login from './login.jsx';
import { useState } from 'react';
import Register from './Register.jsx';
import WhatEmail from './WhatEmail.jsx';
import { useNavigate } from 'react-router-dom';
import { images } from '@/utils/images.utils.js';
import { useQueryParams } from '@/hooks/useQueryParams.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';
import { useAlertContext } from '@/context/AlertContext.jsx';
import { getGeoData } from '@/helpers/session/getGeoData.api.js';

const User = () => {

    const navigate = useNavigate();
    const [params, setParams] = useQueryParams();
    const { postUserContext } = useLoginContext();
    const { setLoading, showAlert } = useAlertContext();

    const [values, setValues] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { ...values };
        if (params.path === 'register') {
            const location = await getGeoData();
            if (location.status == 'success') data.location = location.result;
        };
        data.type = params.path;
        const response = await postUserContext(data);
        if (response) {
            showAlert(message(params.path));
            navigate('/');
        };
        setLoading(false);
    };

    return (
        <div className="user">

            <form className='userSect' onSubmit={handleSubmit}>
                <h2>{params.path == 'login' ? 'Iniciar sesión' : params.path == 'register' ? 'Registro' : 'Recuperar contraseña'}</h2>
                {params.path === 'login' && <Login values={values} setValues={setValues} setParams={setParams} />}
                {params.path === 'register' && <Register values={values} setValues={setValues} setParams={setParams} />}
                {params.path === 'password' && <WhatEmail values={values} setValues={setValues} setParams={setParams} />}
            </form>

            <section className='userImg'>
                <img src={images.aborigenes} alt="img" />
                <p>Aborígenes Cachafaz</p>
                <p className='pgray'>Banda del under de Buenos Aires, Argentina. Es un power trio de la vieja escuela con más de 30 años de Rock</p>
            </section>
        </div>
    );
};

export default User;

function message(status) {
    const type = {
        'login': () => { return 'Inicio de sesión exitoso' },
        'register': () => { return 'Registro e inicio de sesión exitoso' },
        'password': () => { return 'Te hemos enviado un email, revisa tu correo' }
    };
    return (type[status])();
};