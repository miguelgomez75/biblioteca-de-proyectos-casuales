# timemap::hub — Líneas de tiempo por orden de sucesión

Página de una sola vista (`Timemap.html`) diseñada para construir, organizar y visualizar secuencias temporales o líneas de tiempo basadas en la sucesión de acontecimientos. Funciona de manera autónoma en el navegador, sin backend, dependencias ni bibliotecas externas.

## Qué hace

### Gestión de líneas de tiempo
- **Múltiples mapas temporales**: permite crear, renombrar, alternar y eliminar distintas líneas de tiempo desde un selector desplegable.
- **Importación y exportación JSON**: descarga el mapa activo en formato `.json` o importa archivos externos. En caso de coincidencia de nombres, genera automáticamente un sufijo numérico para evitar sobreescrituras.
- **Persistencia local**: todos los cambios se guardan automáticamente en la memoria del navegador (`localStorage`).

### Editor de eventos
- **Formulario integrado**: permite crear y editar hitos con título (obligatorio), descripción detallada en texto plano y asignación de un color distintivo (`input[type=color]`) para el nodo.
- **Control de edición**: al activar la edición de un evento, el formulario se desplaza automáticamente a la parte superior y permite guardar los cambios o cancelar el proceso sin modificar los datos.

### Visualización y reordenamiento
- **Doble modo de vista**:
  - **Vertical**: diseño de lista cronológica continua ideal para descripciones largas y lectura cómoda en pantallas estrechas.
  - **Horizontal**: esquema en eje central con tarjetas alternadas arriba/abajo (diseño en abanico) y desplazamiento horizontal.
- **Reordenamiento flexible**: los eventos se pueden mover hacia adelante o hacia atrás mediante controles directos (↑ / ↓ o ← / →) o mediante *Drag & Drop* arrastrando las tarjetas o los nodos directamente.
- **Enfoque sucesorio**: diseñado para ordenar eventos por secuencia (paso a paso, hitos históricos, procesos narrativos) sin forzar el uso de fechas ni formatos de tiempo estrictamente definidos.

## Tecnología

- HTML + CSS + JavaScript "vanilla" estructurado en un único archivo.
- Mismo lenguaje visual que el resto de herramientas del ecosistema (`DevTools Hub`): paleta en tonos oscuros, tipografías (`Inter` + `IBM Plex Mono`), componentes modulares y sistema de notaciones dinámicas (*toasts*).
- **Persistencia Local**: hace uso de la API `localStorage` (`timemaphub:maps`, `timemaphub:last` y `timemaphub:view`).

## Limitaciones a tener en cuenta

- El reordenamiento por *Drag & Drop* intercambia posiciones de forma absoluta basándose en el índice del evento de origen y de destino, sin interpolación de posiciones intermedias durante el arrastre.
- La vista horizontal requiere un ancho de contenedor mínimo por evento (220px) y está optimizada para lectura en pantallas con soporte de desplazamiento lateral.
- No incluye cálculo automático de intervalos de tiempo reales ni escalas proporcionales, ya que está concebido para orden de sucesión relacional.