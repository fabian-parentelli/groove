import './data2412.css';

const Data2412 = () => {
    return (
        <div className="data2412">
            <p className="date"><code>24/12/25</code></p>

            <h2>Campo único de identificación por email (eliminación de phone)</h2>
            <p>En el modelo se definió <strong>email</strong> como identificador único y obligatorio:</p>
            <pre>{`email: { type: String, unique: true, required: true }`}</pre>

            <h3>Decisión de diseño</h3>
            <ul>
                <li>No se está utilizando en el flujo actual.</li>
                <li>No se solicita en ninguna operación (registro, login, validaciones).</li>
                <li>Mantenerlo no aporta valor funcional y agrega complejidad innecesaria.</li>
            </ul>

            <h3>Justificación</h3>
            <ul>
                <li><strong>Fuente única de identidad:</strong> el email es suficiente para identificar de forma unívoca al usuario.</li>
                <li><strong>Integridad de datos:</strong> <code>unique: true</code> garantiza que no existan duplicados.</li>
                <li><strong>Consistencia del modelo:</strong> solo se definen campos que realmente participan del negocio.</li>
                <li><strong>Simplicidad:</strong> menos validaciones, menos índices y menos mantenimiento.</li>
            </ul>

            <h3>Comportamiento esperado</h3>
            <ul>
                <li>No se permiten registros sin email.</li>
                <li>No se permiten emails duplicados.</li>
                <li>No existe dependencia ni validación relacionada a teléfono.</li>
            </ul>
            <p className="note">
                Esta simplificación mantiene el modelo alineado con los requerimientos actuales y evita almacenar datos innecesarios.
            </p>

            <hr />

            <h2>Inserción masiva con control de duplicados (bulkWrite + upsert)</h2>
            <p>Para evitar errores por claves duplicadas (<code>E11000</code>) al insertar múltiples registros, se utiliza <strong>bulkWrite</strong> con <strong>updateOne</strong> y <strong>upsert</strong>.</p>

            <h3>Concepto</h3>
            <ul>
                <li><strong>bulkWrite:</strong> permite ejecutar múltiples operaciones en una sola llamada a la base de datos.</li>
                <li><strong>updateOne:</strong> busca un documento según un filtro.</li>
                <li><strong>upsert: true:</strong> si existe, no se crea; si no existe, se inserta.</li>
                <li><strong>$setOnInsert:</strong> asegura que los datos solo se escriban al crear el documento.</li>
            </ul>

            <h3>Ventajas</h3>
            <ul>
                <li>Evita errores de duplicidad en campos únicos.</li>
                <li>Operación atómica y segura ante concurrencia.</li>
                <li>No genera excepciones por registros ya existentes.</li>
                <li>Más eficiente que validar uno por uno.</li>
            </ul>

            <h3>Comportamiento esperado</h3>
            <ul>
                <li>Registros con <code>yid</code> ya existente → se ignoran.</li>
                <li>Registros con <code>yid</code> nuevo → se insertan.</li>
                <li>La operación continúa sin interrumpirse ni lanzar errores.</li>
            </ul>

            <h3>Uso recomendado</h3>
            <ul>
                <li>Importaciones masivas</li>
                <li>Sincronización de datos externos</li>
                <li>APIs que reciben lotes de información con posibles duplicados</li>
            </ul>
            <p className="note">Este método mantiene la integridad de índices únicos sin manejar errores manualmente.</p>

            <hr />

            <h2>Comportamiento responsive de íconos en cards de listas</h2>
            <p>En la vista de listas de reproducción, los íconos (play / menú) se muestran solo en hover en desktop y siempre visibles en móviles:</p>
            <pre>{`@media (max-width: 800px) {
  .bodyList .bodyListSect .bodyListSectCard .bodyListImg .bodyListImgIcons {
    display: flex;
  }
}`}</pre>
            <ul>
                <li>Mejora la usabilidad en tablets y móviles.</li>
                <li>Controles siempre accesibles.</li>
            </ul>

            <hr />

            <h2>Ajuste responsive en lista de canciones (play / pausa visible en móviles)</h2>
            <pre>{`@media (max-width: 800px) {
  .listSongs .listSongsSect .listSongsOne section .listSongCel {
    display: flex !important;
  }

  .listSongs .listSongsSect .listSongsOne:hover .listSongsOneIcon {
    display: none;
  }
}`}</pre>
            <ul>
                <li>Botón play/pausa siempre visible.</li>
                <li>Interfaz clara y consistente en dispositivos táctiles.</li>
            </ul>

            <hr />

            <h2>Implementación de Playlist por Categorías</h2>
            <p>Se implementó un sistema de playlist dinámica por categorías, conectando la API con el reproductor global.</p>
            <ul>
                <li>Obtención de categoría vía <code>useParams</code>.</li>
                <li>Consumo de API filtrando por categoría (máx 50 canciones).</li>
                <li>Construcción de playlist con <code>yid</code> y sincronización con reproductor global.</li>
                <li>Renderizado dinámico del listado y controles de reproducción individuales.</li>
                <li>Control de reproducción según playlist activa y categoría seleccionada.</li>
            </ul>

            <p className="note">
                Playlist por categorías funcional, sincronización correcta, reproducción estable y cambio de categoría sin errores.
            </p>
        </div>
    );
};

export default Data2412;
