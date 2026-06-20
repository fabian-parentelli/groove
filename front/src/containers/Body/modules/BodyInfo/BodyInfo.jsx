import './bodyInfo.css';

const BodyInfo = () => {

    return (
        <div className="bodyInfo">

            <div className="bodyInfoHeader">
                <h2>Novedades & Evolucion</h2>
                <p>Mantente al dia con los avances de Groove</p>
            </div>

            <span className="bodyInfoDate">19 de junio de 2026</span>

            <div className="bodyInfoSection">
                <h3>Evolucion</h3>
                <ul className="bodyInfoList">
                    <li>Se puede crear una playlist propia para guardar musica.</li>
                    <li>Ecualizador grafico visible durante la reproduccion.</li>
                    <li>Click en la playlist para verla en pantalla completa con todas sus canciones.</li>
                    <li>Reproductor corregido: ya no muestra "title" cuando esta vacio.</li>
                    <li>Seccion de playlists con navegacion entre ellas.</li>
                    <li>Seccion de Info creada para mantener actualizados a nuestros usuarios.</li>
                </ul>
            </div>

            <div className="bodyInfoFuture">
                <h3>A futuro</h3>
                <ul className="bodyInfoFutureList">
                    <li>Eliminar canciones de tu playlist.</li>
                    <li>Reproduccion aleatoria de canciones.</li>
                    <li>Formulario de contacto. Por ahora escribinos a{' '}
                        <a href="mailto:fabianparentelli007code@gmail.com" className='cold'>
                            fabianparentelli007code@gmail.com
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default BodyInfo;