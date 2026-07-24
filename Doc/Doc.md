# doc::lector — Lector de documentación

Página de una sola vista (`index.html`) que renderiza como una pequeña "wiki" los archivos `.md` que viven en su misma carpeta (`Doc/`). Es, a su vez, un proyecto más dentro de la biblioteca: se descubre a sí mismo qué documentos hay usando la API de GitHub, igual que la biblioteca descubre carpetas de proyectos.

## Qué hace

- **Descubre los `.md` de su propia carpeta**: al cargar, llama a la API de contenidos de GitHub (`GET /repos/{owner}/{repo}/contents/Doc?ref={branch}`) y se queda con los archivos cuyo nombre termina en `.md` (sin distinguir mayúsculas/minúsculas), ignorando el propio `index.html` y cualquier otro tipo de archivo.
- **Descarga cada documento** desde `raw.githubusercontent.com` y extrae:
  - el **título**: el primer `# Encabezado` del documento; si no hay ninguno, humaniza el nombre del archivo (quita `.md`, el prefijo `README-`, cambia guiones/guiones bajos por espacios y capitaliza).
  - un **resumen**: el primer párrafo de texto real (saltando encabezados y limpiando la sintaxis Markdown), truncado a ~140 caracteres.
- **Parser de Markdown propio**, escrito a mano sin dependencias externas, que soporta: encabezados (`#` a `######`), negrita, cursiva, código en línea, bloques de código con ```` ``` ````, listas con viñetas y numeradas, citas en bloque, enlaces y líneas horizontales.
- **Barra lateral** con la lista de documentos (ordenados alfabéticamente por título), cada uno con su resumen y nombre de archivo, y un buscador que filtra por título, resumen o nombre de archivo.
- **Panel de lectura**: muestra el documento seleccionado ya renderizado, con tipografía pensada para lectura (`Lora`), un enlace directo "ver en GitHub" al archivo fuente, y una **barra de progreso de lectura** (línea fina bajo la cabecera) que se rellena según el scroll dentro del documento.
- **Caché en `sessionStorage`** (5 minutos) para no repetir peticiones a la API en cada recarga, con botón "actualizar" para forzar una nueva comprobación.
- **Manejo de estados**: carga, error (si falla la API de GitHub, por ejemplo por el límite de peticiones anónimas, con botón de reintento) y vacío (si la carpeta `Doc` todavía no tiene ningún `.md`).
- Al abrir la página, selecciona automáticamente el primer documento de la lista (o mantiene el seleccionado si sigue existiendo tras una búsqueda o actualización).

## Configuración

Igual que en la biblioteca, todo se ajusta al principio del `<script>`:

```js
var OWNER    = 'miguelgomez75';
var REPO     = 'biblioteca-de-proyectos-casuales';
var BRANCH   = 'main';
var DOC_PATH = 'Doc';   // carpeta donde vive este index.html y los .md
```

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step ni librerías de Markdown externas).
- Parser de Markdown a HTML propio (funciones `parseMarkdown`/`parseInline`), pensado para cubrir lo habitual en un README (encabezados, listas, código, enlaces, negrita/cursiva) sin pretender ser un CommonMark completo.
- Tipografías Inter (UI), IBM Plex Mono (etiquetas, nombres de archivo) y Lora (cuerpo de los documentos), coherente con el resto de la familia de proyectos.
- Peticiones directas a la API de GitHub y a `raw.githubusercontent.com`, sin autenticación (sujeto al límite de peticiones anónimas de GitHub).

## Cómo añadir un documento nuevo

Basta con subir un `.md` nuevo a la carpeta `Doc/` del repositorio. En la próxima carga (o al pulsar "actualizar") aparecerá automáticamente en la barra lateral, usando su primer `# Encabezado` como título.

<p style="text-align: center;"><image src="https://images7.memedroid.com/images/UPLOADED686/5afd6c7cdefec.jpeg" </p>
