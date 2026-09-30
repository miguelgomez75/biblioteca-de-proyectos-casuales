# Tierlist::hub — Creador de clasificaciones personalizadas

Página de una sola vista (`Tierlist.html`) que permite crear, organizar y personalizar *tier lists* con categorías a medida y reordenación precisa de elementos dentro de cada fila. Sin backend ni dependencias externas: la persistencia y la lógica se ejecutan localmente en el navegador.

## Qué hace

### Gestión de listas
- **Múltiples listas**: permite crear, renombrar, cambiar entre listas existentes y eliminar la lista activa mediante un selector desplegable.
- **Copia de seguridad local**: botones para descargar la lista actual en formato `.json` o importar archivos previa extracción de datos. Se gestiona la colisión de nombres duplicando con sufijo numérico al importar.
- **Vaciado de clasificación**: permite mover todos los elementos de vuelta a la sección "Sin clasificar" manteniendo las categorías configuradas.

### Categorías personalizables
- **Creación y edición**: permite añadir categorías con nombres personalizados y asignar un color de fondo mediante un selector dinámico (`input[type=color]`).
- **Reordenación vertical**: botones (↑ / ↓) para cambiar la posición jerárquica de cada categoría dentro de la lista.
- **Control de eliminación**: al borrar una categoría con elementos dentro, estos se reubican automáticamente en la piscina de "Sin clasificar".

### Elementos y clasificación (Drag & Drop / Táctil)
- **Añadir elementos**: campos para ingresar un nombre y una URL de imagen opcional (con soporte para miniatura integrada).
- **Drag & Drop preciso**: permite arrastrar fichas entre categorías o reordenarlas de izquierda a derecha dentro de una misma fila indicando visualmente el punto de inserción (antes/después).
- **Soporte táctil (Móvil)**: sistema alternativo mediante selección por toques (un toque selecciona el elemento y un segundo toque en una categoría o ficha lo posiciona).
- **Edición en caliente**: doble clic sobre cualquier tarjeta para renombrar el elemento o clic en su icono `×` para eliminarlo.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), integrado en una sola estructura cliente.
- Mismo lenguaje visual que el resto de la suite de herramientas (`DevTools Hub`): paleta en tonos oscuros, tipografías (`Inter` + `IBM Plex Mono`), tarjetas visuales y avisos contextuales mediante *toasts*.
- **Persistencia Local**: almacenamiento mediante la API `localStorage` (`tierlisthub:boards` y `tierlisthub:last`). No envía datos a ningún servidor externo.

## Limitaciones a tener en cuenta

- La imagen de cada elemento requiere una URL externa accesible; si la imagen falla al cargar, la miniatura se oculta automáticamente para mantener la estética de la ficha.
- El reordenamiento en pantallas táctiles coloca el elemento seleccionado antes del objetivo pulsado al no disponer de coordenadas precisas de arrastre.
- La información no se sincroniza en la nube; el progreso es exclusivo del navegador local a menos que se exporte e importe manualmente mediante el archivo `.json`.