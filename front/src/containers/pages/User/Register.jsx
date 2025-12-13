import Password from "@/components/Tools/Password/Password";

const Register = ({ values, setValues, setParams }) => {

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    return (
        <div className="flex-col-center">

            <input
                type="name" name="name" placeholder="Nombre" value={values?.name || ''}
                onChange={handleChange}
            />

            <input
                type="email" name="email" placeholder="Email" value={values?.email || ''}
                onChange={handleChange}
            />
            
            <Password values={values} setValues={setValues} />

            <button className="btn btnA">Registrarte</button>

            <p className="userFirst" onClick={() => setParams({ path: 'login' })} >Iniciar sesión</p>
            <p className="userSecond" onClick={() => setParams({ path: 'password' })} >Recuperar password</p>
        </div>
    );
};

export default Register;