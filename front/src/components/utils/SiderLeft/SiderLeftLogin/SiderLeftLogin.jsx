import { useState } from "react";
import { Link } from 'react-router-dom';
import { SpinnerH } from "fara-comp-react";
import { useAlertContext } from '@/context/AlertContext.jsx';
import { useLoginContext } from '@/context/LoginContext.jsx';
import Password from "@/components/Tools/Password/Password.jsx";

const SiderLeftLogin = () => {

    const { showAlert } = useAlertContext();
    const { postUserContext } = useLoginContext();

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({ password: '', email: '', type: 'login' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await postUserContext(values);
        if(response) showAlert('Inicio de sesión exitoso');
        setLoading(false);
    };

    return (
        <form className="flex-col" onSubmit={handleSubmit}>

            <h3>Iniciar sessión</h3>
            <p className="pgray">Al iniciar sesión podras actulaizar canciones y playlist.</p>

            <label className="pwhite">
                Email
                <input type="email" placeholder="emanil@email.com" required
                    value={values?.email || ''} onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
            </label>

            <label className="pwhite">
                Contraseña
                <Password values={values} setValues={setValues} />
            </label>

            <button className="btn btnA" disabled={loading}>
                {loading ? <SpinnerH /> : 'Iniciar sesión'}
            </button>

            <Link className="pwhite decoration-none" to={'/user?path=register'}>Regístrate</Link>
        </form>
    );
};

export default SiderLeftLogin;