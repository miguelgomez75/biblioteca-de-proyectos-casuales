# rename::hub — Renombrador masivo con reordenación

**rename::hub** es una herramienta web cliente diseñada para renombrar múltiples archivos de forma masiva y estructurada. Permite definir patrones personalizados con prefijos, secuencias numéricas y relleno de ceros (*padding*), reordenar la lista manualmente mediante *drag and drop* o controles dedicados, y empaquetar el resultado final en un archivo `.zip`.

---

## Características principales

* **Carga masiva de archivos**: Soporta la selección simultánea de múltiples archivos de cualquier tipo a través del explorador del sistema.
* **Patrón de renombrado configurable**:
  * **Prefijo personalizado**: Texto estático que precede a la numeración (ej. `foto_`, `doc_`).
  * **Número inicial**: Permite establecer el número entero de inicio de la secuencia (por defecto `1`).
  * **Relleno de ceros (*Padding*)**: Configuración del número total de dígitos para la numeración (ej. con padding `3`: `1` -> `001`, `12` -> `012`).
  * **Respeto de extensiones**: Mantiene intacta la extensión original de cada archivo cargado.
* **Reordenación flexible de la lista**:
  * **Drag & Drop**: Arrastra y suelta elementos para ajustar la secuencia numérica deseada.
  * **Controles por botón**: Botones de subida (▲) y bajada (▼) en cada fila para ajustes rápidos.
* **Vista previa en tiempo real**: Muestra dinámicamente una tabla comparativa con el nombre original y el nombre renombrado estimado antes de procesar la descarga.
* **Generación y empaquetado ZIP**: Utiliza la librería **JSZip** para procesar, comprimir y descargar directamente en el navegador un archivo `.zip` con todos los elementos renombrados.

---

## Estructura de archivos y tecnologías

* **Tecnologías**: HTML5, CSS3 (variables CSS, Flexbox, UI responsive) y JavaScript ES6 vanilla.
* **Tipografías**: *Inter* y *IBM Plex Mono* (Google Fonts).
* **Dependencias externas**:
  * **JSZip v3.10.1** (vía CDN cdnjs) para la compresión y exportación ZIP client-side.
  * Script local `../theme.js` para la gestión de temas claro/oscuro.

---

## Flujo de trabajo y funcionamiento interno

1. **Entrada de datos**: El usuario selecciona un conjunto de archivos mediante `<input type="file" multiple>`.
2. **Generación del estado**: Cada archivo se almacena internamente en un array de objetos preservando su instancia `File` original y asignándole un identificador único.
3. **Cálculo del nuevo nombre**: A cada elemento se le asigna su nombre final según su posición actual en el array:
   $$\text{Nombre Final} = \text{Prefijo} + \text{Pad}(\text{Inicio} + \text{Índice}, \text{Dígitos}) + \text{Extensión}$$
4. **Empaquetado y Exportación**: Al iniciar la descarga, se leen los datos binarios de cada archivo (`file.arrayBuffer()`), se añaden al contenedor ZIP con sus nuevos nombres y se genera el archivo ejecutable de descarga.