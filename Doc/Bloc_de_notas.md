# Scratchpad

Bloc de notas de una sola página (`index.html`), sin backend ni dependencias externas de JS. Todo el estado vive en el navegador (`localStorage`) y el contenido se edita con un editor de texto enriquecido basado en `contenteditable` + `document.execCommand`.

## Qué hace

- **Múltiples notas** organizadas en una barra lateral, cada una con `{ id, title, content, updated }`.
- **Editor con formato enriquecido** (`contenteditable`): negrita, cursiva, subrayado, encabezados H1/H2/H3, listas con viñetas y numeradas, cita en bloque y línea divisoria. La barra de herramientas resalta el botón activo según el formato bajo el cursor (`document.queryCommandState` / `queryCommandValue`).
- **Guardado automático**: cualquier cambio en el título o el contenido programa un guardado con `debounce` de 600 ms (`scheduleSave`) que persiste todas las notas en `localStorage` bajo la clave `scratchpad_notes_v1` y actualiza el indicador "Guardado hh:mm".
- **Buscador de notas**: filtra la lista en tiempo real por título o por el texto plano del contenido (con el HTML de formato eliminado).
- **Crear / eliminar notas**: botón "+" para crear una nota nueva (que pasa a ser la activa), y un botón de eliminar por nota con confirmación (`confirm()`).
- **Estadísticas en vivo** en la barra inferior: número total de notas, palabras y caracteres de la nota activa.
- **Importar** archivos `.txt`, `.html` o `.md`: si es HTML, extrae el `<h1>` como título y el resto del `<body>` como contenido; si es texto plano, separa por párrafos (dobles saltos de línea) y los envuelve en `<p>`.
- **Exportar** la nota activa como `.html` (con el formato intacto, envuelto en un documento completo) o como `.txt` (texto plano), a elección del usuario mediante un `confirm()` ("Aceptar" = HTML, "Cancelar" = texto plano).
- **Atajos de teclado**: `Ctrl/Cmd+S` fuerza guardado inmediato, `Ctrl/Cmd+N` crea una nota nueva.

## Modelo de datos

Cada nota se guarda como:

```js
{
  id:      "kx8f2a...",   // generado con Date.now().toString(36) + random
  title:   "Título de la nota",
  content: "<p>HTML con el formato del editor</p>",
  updated: 1737890000000  // timestamp
}
```

Todas las notas se guardan juntas como un array JSON en:

```
localStorage['scratchpad_notes_v1']
```

## Flujo general

1. Al cargar (`load()`), lee `scratchpad_notes_v1` de `localStorage` y reconstruye el array `notes`; si hay notas, la primera se marca como activa.
2. `render()` dibuja la lista lateral (`renderList`), el editor con la nota activa (`renderEditor`) y las estadísticas (`renderStats`).
3. Escribir en el título o en el editor dispara `scheduleSave()`, que tras 600 ms sin nueva actividad vuelca los cambios a la nota activa (`flushActive()`) y los persiste (`save()`).
4. Cambiar de nota (`switchNote`) primero hace `flushActive()` para no perder cambios pendientes de la nota anterior.
5. Los botones de formato llaman a `document.execCommand` (negrita, cursiva, listas, etc.) y luego reprograman el guardado.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Editor basado en `contenteditable` y la API `document.execCommand` (deprecada pero ampliamente soportada, habitual en editores ligeros sin dependencias).
- Persistencia 100% local vía `localStorage`; no hay sincronización con ningún servidor, por lo que las notas solo existen en el navegador/dispositivo donde se crean.
- Tipografías Inter, IBM Plex Mono y Lora (Google Fonts) — Lora se usa específicamente para el cuerpo del editor, dando un aire de "papel" a la escritura.

## Limitaciones a tener en cuenta

- Al no sincronizar con ningún backend, borrar los datos del sitio (o usar otro navegador/dispositivo) hace perder las notas.
- `document.execCommand` está deprecado en los estándares web; funciona en todos los navegadores actuales pero podría dejar de mantenerse a largo plazo.
