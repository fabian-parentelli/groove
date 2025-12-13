

const WhatEmail = ({ values, setValues, setParams }) => {

    return (
        <div className="flex-col-center">
            <input
                type="email" placeholder="Email" value={values?.email || ''}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
            />

            <p className="pgray">Vamos a enviarte un enlace a tu email</p>
            <button className="btn btnA">Enviar</button>

            <p className="userFirst" onClick={() => setParams({ path: 'login' })} >Iniciar sesión</p>
            <p className="userSecond" onClick={() => setParams({ path: 'register' })} >Registrarte</p>
        </div>
    );
};

export default WhatEmail;