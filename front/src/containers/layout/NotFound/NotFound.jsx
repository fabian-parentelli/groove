import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="flex-col-center" style={{ height: '100vh', textAlign: 'center' }}>
            <h2>No Disponible</h2>
            <p>Paciencia que estoy trabajando en este proyecto</p>

            <button className="btn btnF" onClick={() => navigate(-1)}>
                Volver
            </button>
        </div>
    );
};

export default NotFound;