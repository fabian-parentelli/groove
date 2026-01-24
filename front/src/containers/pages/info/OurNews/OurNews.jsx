import './ourNews.css';

const OurNews = () => {

    return (
        <div className="ourNews">
            <h2>Avances de Groove</h2>
            
            <section class="news-section">

                <div class="news-card">
                    <span class="news-date">Enero 2026</span>

                    <ul class="news-list">
                        <li>
                            <strong>Mejora visual en playlists</strong>
                            <p>Optimizamos la estética del body en las listas de reproducción para una experiencia más limpia y moderna.</p>
                        </li>

                        <li>
                            <strong>Nueva barra de categorías</strong>
                            <p>Rediseñamos la barra de categorías mejorando la navegación y la legibilidad.</p>
                        </li>

                        <li>
                            <strong>Canciones random en el body</strong>
                            <p>Agregamos una sección de reproducción aleatoria para descubrir música de forma dinámica.</p>
                        </li>

                        <li>
                            <strong>Player global independiente</strong>
                            <p>
                                Implementamos un reproductor unificado que mantiene la reproducción activa sin importar si la música proviene de categorías, playlists o canciones random.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>

        </div>
    );
};

export default OurNews;