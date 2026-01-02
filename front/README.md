# Actualizaciones

`24/12/25`

## Campo único de identificación por email (eliminación de `phone`)

En el modelo se definió **`email`** como identificador único y obligatorio:

```js
email: { type: String, unique: true, required: true }
```

#### Decisión de diseño

Inicialmente el esquema contemplaba un campo **`phone`** con una lógica similar. Ese campo fue **eliminado** porque:

* No se está utilizando en el flujo actual.
* No se solicita en ninguna operación (registro, login, validaciones).
* Mantenerlo no aporta valor funcional y agrega complejidad innecesaria.

#### Justificación

* **Fuente única de identidad:** el email es suficiente para identificar de forma unívoca al usuario.
* **Integridad de datos:** `unique: true` garantiza que no existan duplicados.
* **Consistencia del modelo:** solo se definen campos que realmente participan del negocio.
* **Simplicidad:** menos validaciones, menos índices y menos mantenimiento.

#### Comportamiento esperado

* No se permiten registros sin email.
* No se permiten emails duplicados.
* No existe dependencia ni validación relacionada a teléfono.

> Esta simplificación mantiene el modelo alineado con los requerimientos actuales y evita almacenar datos innecesarios.


<br/>


## Inserción masiva con control de duplicados (bulkWrite + upsert)

Para evitar errores por claves duplicadas (`E11000`) al insertar múltiples registros, se utiliza el método **`bulkWrite`** junto con operaciones **`updateOne`** y la opción **`upsert`**.

#### Concepto

* **`bulkWrite`** permite ejecutar múltiples operaciones en una sola llamada a la base de datos.
* **`updateOne`** busca un documento según un filtro.
* **`upsert: true`** indica que:

  * Si el documento **existe**, no se crea uno nuevo.
  * Si el documento **no existe**, se inserta automáticamente.
* **`$setOnInsert`** asegura que los datos solo se escriban cuando el documento es nuevo.

#### Ventajas

* Evita errores de duplicidad en campos únicos (ej. `yid`).
* Operación atómica y segura ante concurrencia.
* No genera excepciones por registros ya existentes.
* Más eficiente que validar uno por uno.

#### Comportamiento esperado

* Registros con `yid` ya existente → **se ignoran**.
* Registros con `yid` nuevo → **se insertan**.
* La operación continúa sin interrumpirse ni lanzar errores.

#### Uso recomendado

Este enfoque es ideal para:

* Importaciones masivas.
* Sincronización de datos externos.
* APIs que reciben lotes de información donde pueden existir duplicados.

> **Nota:** Este método mantiene la integridad de índices únicos sin necesidad de manejar errores manualmente ni realizar consultas previas.

<br/>

## Comportamiento responsive de íconos en cards de listas

En la vista de **listas de reproducción**, las cards incluyen íconos de acción (play y menú/dots) superpuestos sobre la imagen.

#### Comportamiento en pantallas grandes

* Los íconos **se ocultan por defecto**.
* Solo se muestran cuando el usuario **hace hover** sobre la card.
* Esto mantiene una interfaz más limpia en desktop, donde el hover es una interacción natural.

#### Cambio aplicado para pantallas pequeñas

A partir de un ancho de pantalla reducido (tablets y celulares):

```css
@media (max-width: 800px) {
  .bodyList .bodyListSect .bodyListSectCard .bodyListImg .bodyListImgIcons {
    display: flex;
  }
}
```

* Los íconos **ya no se esconden**.
* Permanecen **visibles de forma constante**.
* Se evita depender del `hover`, que no es una interacción fiable en dispositivos táctiles.

#### Justificación

* Mejora la **usabilidad** en tablets y móviles.
* Los controles principales quedan siempre accesibles.
* La interfaz resulta más clara y consistente en pantallas táctiles.

> Este ajuste es exclusivamente visual y responsive; no modifica la lógica ni el comportamiento funcional de las acciones.

<br/>

## Ajuste responsive en lista de canciones (play / pausa visible en móviles)

En la vista de **lista de canciones**, cada ítem incluye acciones principales como **play / pausa** y un menú secundario.

#### Comportamiento en pantallas grandes

* El botón **play / pausa** se muestra mediante un ícono superpuesto.
* Los controles aparecen principalmente al **hacer hover** sobre la fila.
* Este enfoque prioriza una interfaz más limpia en desktop.

#### Cambio aplicado para tablets y celulares

A partir de un ancho de pantalla reducido:

```css
@media (max-width: 800px) {
  .listSongs .listSongsSect .listSongsOne section .listSongCel {
    display: flex !important;
  }

  .listSongs .listSongsSect .listSongsOne:hover .listSongsOneIcon {
    display: none;
  }
}
```

* El botón **play / pausa queda visible de forma fija**.
* Se elimina la dependencia del `hover`, poco fiable en dispositivos táctiles.
* El control principal pasa a estar siempre accesible para el usuario.

#### Justificación

* Mejora la **usabilidad** en dispositivos móviles.
* Facilita la interacción rápida sin gestos adicionales.
* Aporta una visual más clara y consistente en tablets y celulares.

> Este cambio es exclusivamente visual y responsive; no altera la lógica de reproducción ni el comportamiento del reproductor.

<br/>

---

## Implementación de Playlist por Categorías

### Descripción general

Se implementó correctamente un sistema de **playlist dinámica por categorías**, donde el listado de canciones y la reproducción se ajustan automáticamente según la categoría seleccionada en la ruta. La integración conecta la API de música con el reproductor global, permitiendo navegar entre categorías sin romper el flujo de reproducción.

---

### Flujo de funcionamiento

1. **Obtención de categoría**

   * La categoría se obtiene desde la URL mediante `useParams`.
   * Cada cambio de categoría dispara una nueva carga de datos.

2. **Consumo de API**

   * Se realiza una llamada a la API de música filtrando por categoría.
   * Se limita la respuesta a un máximo de 50 canciones.
   * La respuesta se normaliza para mantener una estructura consistente.

3. **Construcción de playlist**

   * Se genera una lista de identificadores (`yid`) a partir de las canciones recibidas.
   * Esta lista se inyecta en el reproductor global mediante el contexto de radio.
   * La playlist activa queda sincronizada con la categoría seleccionada.

4. **Renderizado del listado**

   * Se muestra el nombre de la playlist correspondiente a la categoría.
   * Cada canción incluye controles de reproducción individuales.
   * El ítem activo se resalta visualmente según la canción en reproducción.

5. **Control de reproducción**

   * Si la playlist activa coincide con la categoría actual:

     * Se permite pausar/reanudar la canción actual.
     * Se permite reproducir cualquier canción por índice.
   * Si no coincide:

     * Se reemplaza la playlist activa por la de la categoría seleccionada.
     * Se inicia la reproducción desde la canción elegida.

---

### Integración con el reproductor

* El sistema utiliza un **contexto global de radio** para manejar:

  * Estado de reproducción
  * Canción actual
  * Índice activo
  * Identificador de playlist (`lid`)
* Esto permite mantener la reproducción activa al navegar entre páginas, sin reinicios innecesarios.

---

### Estado actual

* ✅ Playlist por categorías funcional
* ✅ Sincronización correcta entre UI y reproductor
* ✅ Cambio de categoría sin errores
* ✅ Reproducción estable y continua
* ✅ Renderizado dinámico del listado

---

### Conclusión

La funcionalidad de **playlist por categorías** quedó correctamente implementada, integrando navegación, consumo de API y control de reproducción en un flujo coherente y estable. El sistema permite escalar fácilmente a nuevas categorías sin cambios estructurales en el reproductor.

---