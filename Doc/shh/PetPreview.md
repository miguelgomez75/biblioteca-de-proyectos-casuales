# Pet Preview (pet::preview)

`pet::preview` es una herramienta web interactiva diseñada para emular, probar y validar visualmente el comportamiento de los sprites animados de la mascota virtual para perfiles de GitHub (**GitHub Activity Pet**) a lo largo de las distintas épocas del año sin necesidad de realizar *commits* ni desplegar cambios en la plataforma.

---

## 🚀 Características Principales

* **Simulación por Fecha y Calendario Anual**:
  * Control deslizante (*slider*) para simular cualquier día del año (0 a 364 días).
  * Soporte para asignación dinámica de **Skins/Sazones** basados en rangos de fechas definidos (`skins.json`), como *Pokémon Day*, *Halloween*, *Navidad*, entre otros [cite: 9].
* **Control de Estados por Commits**:
  * Simulación de actividad mediante un *slider* de *commits* diarios [cite: 9].
  * Actualización en tiempo real de los **6 estados dinámicos del sprite**: `sleeping`, `waking_up`, `awake`, `curious`, `happy` y `hyper` [cite: 9].
* **Visualización de Sprites y Tarjetas**:
  * Matriz visual de sprites para el skin activo con validación de carga y detección de imágenes faltantes [cite: 9].
  * Vista previa estilizada que imita el diseño final del archivo `README.md` en GitHub [cite: 9].
* **Checklist Global e Historial de Progreso**:
  * Listado completo organizado por Skins y estados para realizar el seguimiento del desarrollo de sprites [cite: 9].
  * Indicadores visuales de porcentaje de completado por categoría [cite: 9].
* **Persistencia Local**:
  * Almacenamiento automático en `localStorage` del estado de revisión (*checklist*) y de la URL base del repositorio configurada [cite: 9].

---

## 🛠️ Especificaciones Técnicas

* **Estados Soportados**: `sleeping` ($0$), `waking_up` ($1$), `awake` ($2$), `curious` ($5$), `happy` ($10$), `hyper` ($20+$ commits) [cite: 9].
* **Estructura de Directorios Esperada**:
  * Sprites: `{base}/assets/sprites/{Skin}/{estado}.gif` [cite: 9].
  * Badges SVG: `/dist/pet-status-dark.svg`, `/dist/pet-stats-dark.svg`, `/dist/pet-season-dark.svg` [cite: 9].
* **Tecnologías**: HTML5, CSS3, JavaScript Vánila, `localStorage` API.

---

## 📂 Instrucciones de Uso

1. Introduce la URL base de tu repositorio con archivos raw de GitHub (por ejemplo, `https://raw.githubusercontent.com/USUARIO/REPOSiTORIO/main`) [cite: 9].
2. Mueve el control deslizante de fecha para verificar la activación del *Skin* estacional correcto [cite: 9].
3. Modifica la barra de *commits* para probar la animación correspondiente al nivel de actividad [cite: 9].
4. Utiliza la *Checklist* para marcar los sprites completados a medida que los diseñes y subas al repositorio [cite: 9].
