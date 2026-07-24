# Biblioteca de proyectos casuales

Página estática de una sola vista (`index.html`) que actúa como **índice automático** de los proyectos alojados en un repositorio de GitHub. No hay backend: todo el trabajo lo hace JavaScript en el navegador, usando la API de GitHub y `raw.githubusercontent.com` para descubrir y leer los proyectos en cada carga.

## Qué hace

- **Descubre proyectos automáticamente**: al cargar, consulta la API de contenidos de GitHub (`GET /repos/{owner}/{repo}/contents/?ref={branch}`) del repositorio configurado, se queda con las carpetas de primer nivel y, para cada una, intenta leer `<carpeta>/index.html` desde `raw.githubusercontent.com`.
- **Extrae metadatos de cada proyecto**: de cada `index.html` encontrado, parsea el `<title>` (usando la parte antes de `·` o `:`) y el `<meta name="description">` (o, si no existe, el texto de un elemento con clase `.tagline`, `.subtitle` o `.tag-line`). Si no hay título, genera uno a partir del nombre de la carpeta.
- **Ordena y numera los proyectos**: lee un `order.json` en la raíz del repo con la lista de carpetas en el orden deseado; esos proyectos aparecen primero y numerados, y el resto se añade después ordenado alfabéticamente por título.
- **Pinta una rejilla de tarjetas** con título, descripción (o "sin descripción"), nombre de carpeta y número, cada una enlazando a `./<carpeta>/index.html`.
- **Buscador de proyectos**: un campo de texto filtra la rejilla en tiempo real por título, descripción o carpeta.
- **Caché en `sessionStorage`**: guarda el resultado del escaneo (clave `biblioteca_projects_cache_v2`) durante 5 minutos para no repetir peticiones a la API en cada recarga; un botón "actualizar" fuerza una nueva comprobación.
- **Manejo de errores**: si la API de GitHub falla (por ejemplo, por el límite de peticiones anónimas), muestra un aviso con botón de reintento.
- **Panel lateral de "Páginas frecuentes"**: un menú deslizante (hamburguesa ☰) que carga `URLS.json` del repo y muestra enlaces agrupados por categoría.
- **Paleta de comandos (Ctrl/Cmd + K)**: buscador global tipo "command palette" que combina:
  - búsqueda difusa (fuzzy) entre proyectos y páginas frecuentes,
  - atajos con prefijo (`#gh`, `#yt`, `#rd`, `#x`, `#mdn`) para buscar directamente en GitHub, YouTube, Reddit, Twitter/X o MDN,
  - acceso directo a un proyecto por su número con la sintaxis `(n)`,
  - una opción de respaldo para buscar el texto escrito en Google,
  - navegación con flechas/Enter y resaltado de coincidencias.

## Cómo funciona el flujo de carga (`load()`)

1. Descarga `order.json` para conocer el orden deseado de las carpetas.
2. Si no se fuerza refresco y hay caché válida (<5 min), pinta la rejilla directamente desde la caché.
3. Si no hay caché o se fuerza refresco, llama a `discoverProjects()`:
   - obtiene la lista de directorios vía la API de GitHub,
   - para cada uno intenta descargar su `index.html` y extraer metadatos,
   - descarta los que fallan (por ejemplo, carpetas sin `index.html`).
4. Guarda el resultado en caché y renderiza la rejilla de tarjetas.

## Configuración

Todo el comportamiento se ajusta al principio del `<script>` principal:

```js
var OWNER      = 'miguelgomez75';
var REPO       = 'biblioteca-de-proyectos-casuales';
var BRANCH     = 'main';
var CACHE_KEY  = 'biblioteca_projects_cache_v2';
var CACHE_TTL  = 5 * 60 * 1000; // 5 minutos
```

## Archivos externos que espera encontrar en el repo

- `order.json` — array con los nombres de carpeta en el orden en que deben numerarse los proyectos.
- `URLS.json` — array de objetos `{ nombre, url, categoria }` para el panel de páginas frecuentes.
- `<carpeta>/index.html` — un `index.html` por cada proyecto/carpeta, con `<title>` y `<meta name="description">` opcionales para el listado.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step).
- Tema oscuro con variables CSS, tipografías Inter e IBM Plex Mono (Google Fonts).
- Uso directo de `fetch`, `DOMParser`, `sessionStorage` y la API pública de GitHub (sin autenticación, por lo que está sujeta al límite de peticiones anónimas de GitHub).

## Cómo añadir un proyecto nuevo

Basta con crear una carpeta nueva en el repositorio con su propio `index.html` (idealmente con `<title>` y `<meta name="description">`). La próxima vez que se cargue la página (o se pulse "actualizar"), aparecerá automáticamente en la rejilla, sin tocar este archivo.
