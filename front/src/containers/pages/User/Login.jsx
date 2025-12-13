import Password from "@/components/Tools/Password/Password.jsx";

const Login = ({ values, setValues, setParams }) => {

    return (
        <div className="flex-col" style={{ alignItems: 'center' }}>

            <input
                type="email" placeholder="Email" value={values?.email || ''}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
            />

            <Password values={values} setValues={setValues} />

            <button className="btn btnA">Iniciar sesión</button>
            <br />

            <p className="userFirst"  onClick={()=> setParams({path: 'register'})} >Regístrate</p>
            <p className="userSecond" onClick={()=> setParams({path: 'password'})} >Recuperar password</p>
        </div>
    );
};

export default Login;