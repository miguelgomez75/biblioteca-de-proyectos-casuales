# Reproductor de OSTs

Página de una sola vista (`index.html`) que recrea, en versión web, un reproductor de bandas sonoras (OSTs) de videojuegos: navega por OST y por canción, abre cada tema en su enlace (normalmente YouTube), y guarda el estado actual en la URL para poder compartir o recargar sin perder el sitio. Sin backend: los datos se cargan desde dos archivos JSON situados junto al `index.html`.

## Qué hace

- **Carga los datos** desde `canciones.json` y `osts.json` (mismo directorio) al iniciar. Si algún fetch falla, usa un array vacío como respaldo y avisa en pantalla ("No se han podido cargar los datos…", con la pista habitual de servir por http en vez de abrir el archivo directamente con `file://`).
- **Agrupa las canciones por OST** (`groupByOst`): a partir de la lista plana de `canciones.json`, reconstruye por cada OST dos listas separadas — canciones normales y remixes (según el campo `remix`) — respetando el orden de aparición en el archivo.
- **Navegación por canción**: botones para avanzar/retroceder 1, 5 o 15 canciones (con versiones "lejanas" que se ocultan en pantallas estrechas), botón central que muestra el título de la canción actual y la abre en una pestaña nueva al pulsarlo, y contador "x / y".
- **Navegación por OST**: botones ← →  (1 OST) y ⟪ ⟫ (5 OSTs), más un desplegable (`jump-select`) para saltar directamente a cualquier OST por nombre.
- **Tarjeta de portada con efecto flip 3D**: muestra la imagen del OST (`image`) en la cara frontal; si el OST tiene una imagen alternativa (`image_alt`) y `hasRemix` es `true`, aparece un botón "↺ alternativo" que gira la tarjeta 180° para mostrar la otra cara y cambia a la vista de remix. Si falta alguna imagen, se muestra un placeholder de texto ("sin portada" / "sin imagen alternativa"), y si la imagen no carga (`onerror`), también cae al placeholder.
- **Animación tipo "flashcard"** al cambiar de OST: la portada anterior sale deslizándose hacia arriba o abajo mientras la nueva entra desde el lado opuesto, según la dirección de navegación.
- **Vista de remix ("OST Alternativo")**: al activarla (botón dedicado o el propio flip de la portada), la navegación de canciones pasa a operar sobre la lista de remixes de ese mismo OST; aparece un botón "← volver al OST original" para salir de esa vista. Si el remix no tiene canciones todavía, se muestra un aviso (toast) en vez de fallar.
- **Estado sincronizado con la URL** (`#view=main|remix&ost=N&song=N`): cada cambio de vista/OST/canción actualiza el hash (`history.replaceState`, sin generar entradas nuevas en el historial), y el hash se relee al cargar la página o al navegar con los botones atrás/adelante del navegador (`hashchange`), permitiendo compartir un enlace directo a una canción concreta.
- **Panel lateral de navegación** (☰): lista todos los OSTs (con buscador), cada uno desplegable para ver sus canciones directamente por nombre; las canciones sin URL se marcan con una etiqueta "sin enlace". Al elegir una canción del panel, se salta directamente a ella y se cierra el panel.
- **Notificaciones tipo toast** para avisos puntuales (remix sin canciones, canción sin URL, OST sin canciones, etc.), que desaparecen solas tras unos segundos.
- **Atajos de teclado**: `←`/`→` cambian de canción, `↑`/`↓` cambian de OST (solo en la vista principal), `Enter` abre la canción actual. Se ignoran mientras el foco está en un campo de texto o un desplegable.
- Incluye además una funcionalidad adicional activable mediante una combinación específica, pensada como sorpresa dentro del propio reproductor — se deja intencionadamente sin documentar aquí para no quitarle la gracia.

## Formato de los archivos de datos

### `canciones.json`

Lista plana de canciones (no van pre-agrupadas por OST; el propio `index.html` las agrupa al cargar):

```json
[
  {
    "OST": "OST de A Dance of Fire and Ice",
    "Title": "A Dance of Fire and Ice",
    "URL": "https://www.youtube.com/watch?v=roKDAZ82i_0",
    "Color": "#FF0000",
    "remix": false
  }
]
```

| Campo | Tipo | Obligatorio | Uso |
|---|---|---|---|
| `OST` | string | sí | Nombre del OST al que pertenece la canción; agrupa filas con el mismo valor. El orden de aparición de OSTs nuevos en el archivo define su orden en el reproductor. |
| `Title` | string | no | Título mostrado en el botón de canción actual y en el panel lateral. Si falta, se muestra "Sin título". |
| `URL` | string | no | Enlace que se abre al pulsar la canción. Si falta, el botón se marca como "sin enlace" / "⦸ sin enlace" y no abre nada (solo avisa con un toast). |
| `Color` | string (hex) | no | Color del borde/texto del botón de la canción actual cuando tiene URL. Si falta, usa el color de acento por defecto (`#e8a030`). |
| `remix` | boolean | no | Si es `true`, la canción se clasifica como remix de ese OST (lista aparte, accesible desde la vista "OST Alternativo"). Por defecto `false`. |

### `osts.json`

Metadatos por OST, indexados internamente por el campo `OST` (debe coincidir exactamente con el `OST` usado en `canciones.json`):

```json
[
  {
    "OST": "OST de A Dance of Fire and Ice",
    "image": "https://play-lh.googleusercontent.com/APLUmc9O3Wt5OSRlQWjDYjOmYljJiD0WkOVjh8Jev0HghyFxRmw545-jxSTP8QYUVx3bubNlCF-YCXObJWLz4Q",
    "image_alt": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPYOA8l-ZuApH6k-LEZgcGH3beW8hErYT89rGB-qT-w&s=10",
    "hasRemix": true
  }
]
```

| Campo | Tipo | Obligatorio | Uso |
|---|---|---|---|
| `OST` | string | sí | Debe coincidir con el `OST` de `canciones.json` para enlazar los metadatos con las canciones. |
| `image` | string (URL) | no | Imagen de portada (cara frontal de la tarjeta). Sin ella, se muestra el placeholder "sin portada". |
| `image_alt` | string (URL) | no | Imagen de la cara trasera de la tarjeta (vista de remix). Sin ella, se muestra "sin imagen alternativa". |
| `hasRemix` | boolean | no | Controla si aparecen los botones para entrar en la vista de remix ("↺ alternativo" y "OST Alternativo"), independientemente de si ya hay canciones cargadas en esa lista. |

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Tarjeta de portada con flip 3D real (`transform-style: preserve-3d`, `rotateY`) y animaciones de entrada/salida tipo carrusel para el cambio de OST.
- Estado de navegación reflejado en el hash de la URL (`location.hash` + `history.replaceState`), sin necesidad de router ni recarga de página.
- Tipografías Inter (UI) e IBM Plex Mono (etiquetas, botones de navegación, nombre del OST).

## Cómo añadir OSTs o canciones nuevas

Basta con añadir filas a `canciones.json` (con el mismo texto exacto en `OST` para agrupar bajo el mismo álbum) y, opcionalmente, una entrada en `osts.json` con ese mismo `OST` para darle portada e imagen alternativa. No hace falta tocar el `index.html`.
