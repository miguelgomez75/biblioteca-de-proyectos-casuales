# Global Recipe Discovery Platform (recipes::hub)

`recipes::hub` es una aplicación web interactiva diseñada para la exploración, búsqueda y consulta de recetas culinarias globales integrando la API pública de **TheMealDB**. Ofrece filtros por categorías y cocinas del mundo, vista detallada con lista de ingredientes, instrucciones de preparación, enlaces multimedia, soporte para traducción automática al español mediante la API gratuita de Google Translate y persistencia de recetas favoritas.

## 🚀 Características Principales

* **Búsqueda y Filtrado Dinámico**:
  * Búsqueda por texto (*debounce* de $400 \text{ ms}$) para consultar recetas por nombre.
  * Selección de filtros combinados por **Categoría** (ej. *Beef*, *Seafood*, *Vegetarian*) y **Cocina Regional** (ej. *Italian*, *Mexican*, *Japanese*).
  * Selector aleatorio de recetas ("🎲 Receta al azar").

* **Vista Detallada de Receta (Modal)**:
  * Visualización de la imagen, etiquetas (*Category*, *Area*, *Tags*), lista estructurada de ingredientes con sus respectivas cantidades y pasos detallados para la preparación.
  * Botones de acceso directo a tutoriales en vídeo (*YouTube*) y fuentes originales de las recetas cuando están disponibles.

* **Traducción en Tiempo Real Integrada**:
  * Traducción dinámica del nombre de la receta, instrucciones de preparación e ingredientes del inglés al español mediante un servicio de traducción automatizado en cliente.

* **Gestión de Favoritos y Almacenamiento Local**:
  * Guardado rápido de hasta 16 recetas preferidas en almacenamiento persistente (`localStorage`).
  * Barra de accesos directos interactivas (*chips*) para consultar de forma inmediata las recetas guardadas.

## 🛠️ Especificaciones Técnicas

* **Modelado de Datos de Ingredientes**:
  * La API de TheMealDB entrega los ingredientes e instrucciones en pares disociados (`strIngredient1..20` y `strMeasure1..20`). El cliente reconstruye programáticamente la lista mediante la unión indexada de claves no vacías:

    $$
    I = \{ (S_{\text{ing}, i}, S_{\text{meas}, i}) \mid 1 \le i \le 20 \land S_{\text{ing}, i} \neq \emptyset \}
    $$

* **Módulo de Traducción Automática (Google Translate GTX API)**:
  * El motor de traducción consulta de forma asíncrona mediante peticiones HTTP `GET` paralelas para la preparación e ingredientes:

    $$
    \text{Endpoint: } \texttt{https://translate.googleapis.com/translate\_a/single?client=gtx\&sl=en\&tl=es\&dt=t\&q=...}
    $$

  * El payload en formato JSON procesa y une los segmentos traducidos ($T_{\text{seg}}$) ordenados secuencialmente:

    $$
    T_{\text{final}} = \sum_{k=1}^{n} T_{\text{seg}, k}[0]
    $$

* **Endpoints de TheMealDB Utilizados**:
  * **Categorías y Cocinas**: `list.php?c=list` / `list.php?a=list`
  * **Destacadas / Azar**: `random.php` (ejecutado en paralelo $8$ veces en el arranque)
  * **Búsqueda por Nombre**: `search.php?s={query}`
  * **Filtros**: `filter.php?c={cat}` o `filter.php?a={area}`
  * **Detalle por ID**: `lookup.php?i={id}`

* **Estructura del Almacenamiento de Favoritos (`localStorage`)**:
  Almacenado en JSON bajo la clave `recipeshub_favs`:

  ```json
  [
    {
      "id": "52772",
      "name": "Teriyaki Chicken Casserole",
      "thumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg"
    }
  ]
  ```

* **Tecnologías**: HTML5, CSS Custom Properties / Grid Layout, JavaScript Vanilla (ES6+ async/await), Promise.all, Fetch API, Web Storage API.

## 📂 Instrucciones de Uso

1. **Exploración**: Utiliza la barra de búsqueda superior o selecciona una **Categoría** / **Cocina** para filtrar las recetas en la cuadrícula principal.
2. **Consultar Receta**: Haz clic en cualquier tarjeta de la cuadrícula o presiona **🎲** para abrir los detalles completos en una ventana modal.
3. **Traducir**: Presiona el botón **🌐 Traducir al español** dentro de la ventana modal para convertir automáticamente los ingredientes y las instrucciones.
4. **Guardar en Favoritos**: Presiona **☆ Guardar en favoritos** para vincular la receta a tus accesos directos en la barra superior.