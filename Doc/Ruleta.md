# Decision Wheel (wheel::hub)

`wheel::hub` es una aplicación web interactiva y responsiva diseñada para facilitar la toma de decisiones mediante una ruleta ponderada personalizable. Soporta probabilidades ajustables (pesos), persisistencia de listas guardadas, eliminación de opciones ganadoras y registro de historial.

---

## 🚀 Características Principales

* **Ruleta Visual Ponderada**:
  * Renderizado mediante HTML5 Canvas con asignación de color automática para cada sector.
  * Los sectores se dimensionan proporcionalmente según el **peso** asignado a cada opción.
  * Puntero con animación suave basada en atenuación (*easing curve* `easeOutQuint`) para giros realistas.
* **Gestión de Opciones y Pesos**:
  * Añadir, editar pesos (entre `1` y `99`) o eliminar elementos dinámicamente.
  * Funcionalidad para **igualar pesos** de todas las opciones con un solo clic.
  * Modo *"Quitar al ganador tras girar"*: Oculta la opción ganadora de los siguientes giros sin borrarla del estado.
* **Listas Guardadas**:
  * Guardado y carga de conjuntos de opciones/configuraciones con nombres personalizados para reutilizarlos en cualquier momento.
* **Historial de Tiradas**:
  * Registro cronológico con marca de tiempo de los resultados obtenidos en cada tirada.
* **Persistencia Local**:
  * Guardado automático en `localStorage` de las opciones activas, historial de tiradas y listas personalizadas.

---

## 🛠️ Especificaciones Técnicas

* **Algoritmo de Selección**: Muestreo por distribución de probabilidad ponderada sobre la suma total de pesos activos.
* **Física de Animación**: Duración fija de $4.2\text{ s}$ con cálculo de fricción quintal (*Ease-Out Quintic*: $f(t) = 1 - (1 - t)^5$) e incrementos aleatorios de vueltas completas ($5\text{ a }7$ giros).
* **Tecnologías**: HTML5 (Canvas API), CSS Custom Properties, JavaScript Vánila (ES6+), `localStorage` API.

---

## 📂 Instrucciones de Uso

1. Añade las diferentes opciones que quieras sortear a través del formulario de entrada.
2. (Opcional) Ajusta los números de **peso** junto a cada opción para dar más o menos probabilidad a un elemento.
3. Haz clic en el botón central **GIRAR** para iniciar la ruleta.
4. Consulta el resultado en pantalla y revisa las tiradas anteriores en la sección **Historial**.
5. Guarda tu lista desde el menú desplegable inferior para volver a usarla más adelante.
```

He generado el archivo `WheelHub.md` con la documentación detallada de la ruleta de decisiones.