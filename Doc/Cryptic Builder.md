# cryptic::builder — Constructor y Editor de Cryptic Clues

Página de una sola vista (`index.html`) para la creación, edición, etiquetado sintáctico y reordenación de acertijos crípticos (*cryptic clues*). Genera y gestiona un archivo de datos estructurado en formato JSON listo para ser consumido por visores o reproductores de crucigramas. Todo el procesamiento se realiza localmente en el navegador mediante JavaScript nativo sin dependencias ni servidor backend.

## Qué hace

### Gestión de datos y archivos

* **Importación JSON**: Permite cargar un archivo `puzzles.json` existente para editar sus entradas o añadir nuevas pistas.
* **Exportación y copia**: Descarga directa del conjunto de pistas generado como archivo `.json` o copia instantánea del esquema estructurado al portapapeles.
* **Mantenimiento de metadatos**: Opción para conservar automáticamente la categoría y el grupo entre inserciones de pistas consecutivas.

### Editor interactivo de pistas (*clues*)

* **Asignación sintáctica rápida**: Permite seleccionar cualquier fragmento de texto dentro del área de edición del *clue* y asignarlo con un clic a uno de los componentes estructurales:
  * **Definición** (`definition`)
  * **Fodder / Materia prima** (`fodder`)
  * **Indicador** (`indicator`)
* **Generador de enumeración automática (`+ (enum)`)**: Calcula y añade automáticamente al final de la pista la longitud de la respuesta esperada analizando el campo *Answer* (soportando palabras compuestas con guiones y frases con espacios).
* **Vista previa visual en tiempo real**: Subraya y codifica por color las secciones asignadas dentro del texto completo de la pista.
* **Gestión por etiquetas (*chips*)**: Permite añadir, revisar y eliminar de forma independiente las etiquetas asociadas a cada componente sintáctico.

### Sistema de validación y advertencias

Detecta e informa dinámicamente de posibles errores o inconsistencias antes de guardar:

* Ausencia de enumeración o discrepancia entre la longitud calculada de la respuesta y el número al final de la pista.
* Faltante de marca de definición en la pista.
* Fragmentos etiquetados que no coinciden literalmente con el texto de la pista (*missing fragments*).

### Lista de pistas y reordenación en bloque

* **Búsqueda y filtrado**: Filtro en tiempo real por texto dentro del cuerpo del *clue*, la respuesta, el nombre o la categoría.
* **Reordenación individual y por índice**: Botones para subir/bajar una pista o moverla a una posición específica mediante número de índice.
* **Reordenación en bloque (*bulk move*)**: Selección múltiple mediante casillas de verificación para desplazar un conjunto de pistas seleccionadas hacia una posición determinada del listado, manteniendo su orden relativo.
* **Duplicación y eliminación rápida**: Clonado instantáneo de pistas para crear variantes o borrado con confirmación visual.

## Tecnología

* HTML5 + CSS3 + JavaScript "vanilla" (ES6/ES5 seguro), empaquetado en un archivo único sin build tools ni librerías externas.
* **Datalists dinámicos**: Autocompletado de categorías y grupos existentes generado a partir de las pistas cargadas en memoria.
* Interfaz con tema oscuro coherente con el lenguaje de diseño de la suite (`--bg: #0c0c10`, `--accent: #e8a030`), fuentes monoespaciadas (`IBM Plex Mono`) e indicadores de color sintácticos (Azul para definición, Rosa para fodder, Verde para indicador).

## Limitaciones a tener en cuenta

* Sin persistencia automática por almacenamiento local (*localStorage*): la actualización de la página restablece el estado actual a menos que se exporte el JSON o se mantenga en la sesión activa.
* El reordenado de elementos cuando hay un filtro de búsqueda activo se aplica sobre el índice real de la lista completa de pistas, no sobre los resultados filtrados en pantalla.