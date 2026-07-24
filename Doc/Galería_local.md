# galería::local

Visor de galerías de imágenes de una sola página (`index.html`), pensado para hojear cómics/carpetas de imágenes locales **sin subir nada a ningún servidor**: todo el procesamiento ocurre en el propio navegador, leyendo carpetas directamente del disco del usuario.

## Qué hace

- **Carga carpetas locales como galerías**: al pulsar "＋", abre el selector nativo de carpetas del sistema operativo (`showDirectoryPicker`, la File System Access API) y lee todos los archivos de esa carpeta.
- **Filtra solo imágenes**: se queda con archivos `.jpg`, `.jpeg`, `.png` y `.gif`; si la carpeta no contiene ninguna imagen compatible, avisa con un `alert()` y no crea la pestaña.
- **Ordenación natural por nombre**: ordena las páginas por el número al principio del nombre de archivo (por ejemplo `2.jpg` antes que `10.jpg`, en vez del orden alfabético estricto que pondría `10` antes que `2`); si dos archivos empiezan por el mismo número, desempata alfabéticamente.
- **Varias galerías abiertas a la vez**, cada una en su propia pestaña (con nombre de la carpeta y contador de páginas), pudiendo cerrarlas individualmente con la "✕" de cada pestaña.
- **Visor de página**: muestra la imagen a pantalla completa dentro del área central, con una pequeña transición de opacidad al cambiar de página, y zonas invisibles a los lados (25% del ancho) que muestran una flecha `‹`/`›` al pasar el ratón y permiten pasar de página con un clic.
- **Barra inferior de navegación**: primera página, anterior, siguiente, última página, un desplegable para saltar directamente a "Página N", y el contador "Página X de Y".
- **Atajos de teclado**: flechas (← ↑ retrocede, → ↓ avanza), `Home` va a la primera página, `End` a la última (se ignoran si el foco está en un campo de texto o un desplegable).
- **Gestos táctiles**: deslizar hacia la izquierda/derecha sobre el visor (más de 50px) avanza o retrocede de página, para uso en móvil/tablet.
- **Alternativa para navegadores sin selector de carpetas nativo**: si `showDirectoryPicker` no está disponible, recurre a un `<input type="file" webkitdirectory>` oculto que también permite seleccionar una carpeta completa.
- **Gestión de memoria**: cada imagen se referencia mediante un Object URL (`URL.createObjectURL`) generado a partir del archivo local; al cerrar una galería o sustituir una con el mismo nombre, esos Object URLs se liberan explícitamente (`URL.revokeObjectURL`) para no acumular memoria.

## Cómo funciona la carga de una carpeta

1. El usuario pulsa "＋" → `pickFolder()`.
2. Si el navegador soporta la File System Access API, se recorre el directorio elegido (`dir.values()`) leyendo cada archivo (`entry.getFile()`) y quedándose solo con los de extensión permitida.
3. Si no hay soporte, se dispara el `<input>` oculto con `webkitdirectory`, que deja elegir una carpeta y expone sus archivos con la ruta relativa (`webkitRelativePath`), de la que se extrae el nombre de la carpeta.
4. `addGallery(nombre, archivos)` ordena las imágenes de forma natural, genera sus Object URLs, añade una nueva pestaña y la muestra automáticamente en la página 1. Si ya existía una galería con ese mismo nombre, la sustituye (liberando antes sus URLs).

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step, sin backend ni subida de archivos).
- **File System Access API** (`window.showDirectoryPicker`) como método principal de selección de carpeta, con fallback a `<input webkitdirectory>` para navegadores que no la soportan (por ejemplo Firefox o Safari en ciertas versiones).
- `URL.createObjectURL` / `URL.revokeObjectURL` para mostrar imágenes locales sin necesidad de subirlas ni de leerlas como base64.
- Tipografías Inter (UI) e IBM Plex Mono (pestañas, contador de página, atajos de teclado).

## Limitaciones a tener en cuenta

- Al ser lectura 100% local, **no persiste** las galerías entre recargas de la página: hay que volver a seleccionar la carpeta cada vez que se abre.
- El soporte de `showDirectoryPicker` depende del navegador (funciona en Chrome/Edge y derivados de Chromium; en otros navegadores se usa el input de respaldo, que en algunos casos puede comportarse de forma ligeramente distinta al elegir carpetas).
- El orden "natural" solo tiene en cuenta un número al **principio** del nombre de archivo; nombres sin número inicial se ordenan alfabéticamente después de los que sí lo tienen.
