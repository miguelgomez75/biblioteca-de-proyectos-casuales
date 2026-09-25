# 3D Solar System Visualizer (solar::hub)

`solar::hub` es una aplicación web interactiva e inmersiva para la simulación y exploración tridimensional del Sistema Solar. Diseñada con un enfoque didáctico y de visualización adaptativa, utiliza una escala de representación no realista optimizada para la navegabilidad web, permitiendo la inspección detallada de cuerpos celestes, sus órbitas y sus parámetros físicos esenciales.

## 🚀 Características Principales

* **Motor de Renderizado Tridimensional (WebGL)**:
  * Entorno 3D dinámico impulsado por `Three.js` con iluminación estelar central, sombras de reflexión estándar (`MeshStandardMaterial`) y campo de estrellas procedimental distribuido en una esfera envolvente de $2500$ puntos.

* **Navegación Esférica y Seguimiento Dinámico**:
  * Control de cámara orbital basado en coordenadas esféricas $(\rho, \theta, \phi)$ con soporte multitáctil, arrastre (*drag*) y zoom progresivo por rueda de desplazamiento (*wheel*).
  * Sistema de centrado automático y seguimiento (*camera targeting*) al seleccionar cualquier planeta desde el panel lateral o escena.

* **Simulación de Mecánica Orbital**:
  * Traslación planetaria parametrizada en función del periodo orbital real en días terrestres.
  * Rotación propia de cada cuerpo celeste sobre su eje vertical.
  * Controles de transporte para pausar/reanudar la simulación, ajustar la velocidad temporal (escala dinámicamente variable) y alternar la visibilidad de órbitas y etiquetas.

* **Sincronización de Interfaz y Proyección 2D/3D**:
  * Proyección matricial en tiempo real de etiquetas HTML sobre el espacio de coordenadas del canvas 2D utilizando la matriz de vista-proyección de la cámara.
  * Panel dinámico de información astronómica con estadísticas clave (diámetro, distancia al Sol, periodo orbital y duración del día).

## 🛠️ Especificaciones Técnicas

* **Cinemática Orbital y Escala Temporal**:
  * La velocidad angular de traslación $\omega_i$ de cada planeta $i$ se calcula en cada fotograma a partir de un factor de velocidad global configurado por el usuario $s$, normalizado con respecto al periodo orbital terrestre de $365$ días y su periodo orbital específico $P_i$ (en días):

    $$
    \omega_i = \left( \frac{s}{6000} \right) \cdot \left( \frac{365}{P_i} \right)
    $$

  * La posición angular acumulada $\theta_i(t)$ se actualiza progresivamente mediante integración discreta:

    $$
    \theta_i(t + \Delta t) = \theta_i(t) - \omega_i
    $$

* **Transformación Esférica de la Cámara**:
  * La posición de la cámara $(X_c, Y_c, Z_c)$ respecto al objetivo focal $T = (X_t, Y_t, Z_t)$ se determina mediante coordenadas esféricas parametrizadas por el radio $r$ (`camDist`), el ángulo azimutal $\theta$ (`camTheta`) y el ángulo polar $\phi$ (`camPhi`):

    $$
    \begin{aligned}
    X_c &= X_t + r \cdot \sin(\phi) \cdot \sin(\theta) \\
    Y_c &= Y_t + r \cdot \cos(\phi) \\
    Z_c &= Z_t + r \cdot \sin(\phi) \cdot \cos(\theta)
    \end{aligned}
    $$

    Donde el ángulo polar se restringe al intervalo $\phi \in [0.15, \; \pi - 0.15]$ para evitar la singularidad del cardán (*gimbal lock*).

* **Proyección de Etiquetas Pantalla (3D a 2D)**:
  * Las posiciones del mundo 3D $\vec{v}_{world}$ se transforman a coordenadas homogéneas de pantalla $\vec{v}_{ndc} \in [-1, 1]^3$ mediante la matriz combinada de proyección y vista $M = M_{proj} \cdot M_{view}$:

    $$
    \vec{v}_{ndc} = M \cdot \vec{v}_{world}
    $$

  * Si $z_{ndc} < 1$ (el objeto está dentro del frustum de la cámara), las coordenadas en píxeles de la pantalla $(X_{px}, Y_{px})$ se obtienen mediante:

    $$
    \begin{aligned}
    X_{px} &= \left( \frac{x_{ndc} + 1}{2} \right) \cdot W_{screen} \\
    Y_{px} &= \left( \frac{-y_{ndc} + 1}{2} \right) \cdot H_{screen}
    \end{aligned}
    $$

* **Generación del Campo de Estrellas (Distribución Esférica Uniforme)**:
  * Los puntos del fondo se distribuyen uniformemente sobre una capa esférica de radio $r \in [400, 1000]$ utilizando muestreo por inversión para el ángulo polar $\phi$:

    $$
    \theta = 2\pi \cdot U_1, \quad \phi = \arccos(2U_2 - 1)
    $$

    Donde $U_1, U_2 \sim \text{Uniforme}(0, 1)$.

* **Tecnologías**: HTML5, CSS Custom Properties / Modern Layouts, JavaScript Vanilla (ES6+), Three.js (r128), WebGL Context.

## 📂 Instrucciones de Uso

1. Utiliza el ratón o el panel táctil dentro de la ventana de la escena:
   * **Arrastrar (click primario / touch drag)**: Rotar la vista alrededor del objetivo actual.
   * **Rueda del ratón (scroll / pinch-to-zoom)**: Acercar o alejar la cámara.
2. Haz clic sobre cualquier planeta en la lista del panel superior derecho (**`planet-list`**) para enfocar automáticamente la cámara en el astro seleccionado y desplegar su ficha de datos técnicos.
3. Utiliza la barra de herramientas inferior para:
   * **Pausar / Reanudar (▶ / ⏸)** la simulación orbital.
   * Ajustar la **Velocidad** del paso del tiempo mediante el deslizador lineal.
   * Mostrar u ocultar las líneas de las **Órbitas** y las **Etiquetas** de nombres.
   * Presionar **Reiniciar vista** para reorientar la cámara al centro del Sistema Solar (Sol).