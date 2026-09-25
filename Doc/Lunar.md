# Astronomical & Lunar Dashboard (lunar::hub)

`lunar::hub` es una plataforma web interactiva y modular orientada a la divulgación y cálculo de eventos astronómicos, fases lunares en tiempo real y cartografía celeste simplificada. Proporciona herramientas de precisión algorítmica para determinar la iluminación y edad lunar, catálogo vectorial de constelaciones y un calendario astronómico global con conversión dinámica a la zona horaria local del usuario.

## 🚀 Características Principales

* **Cálculo y Renderizado de Fase Lunar en Tiempo Real**:
  * Motor matemático interno para calcular la edad, iluminancia porcentual y nombre de la fase lunar activa en función de la fecha UTC actual.
  * Renderizado dinámico del disco lunar en un elemento Canvas 2D mediante composición de arcos y elipses para simular la línea del terminador (frontera entre el día y la noche lunar).
  * Predicción automatizada de las fechas exactas para los próximos eventos de Luna Nueva y Luna Llena.

* **Catálogo Vectorial de Constelaciones**:
  * Visualizador interactivo de $12$ constelaciones clave con esquemas geométricos simplificados proyectados dinámicamente mediante SVG.
  * Fichas detalladas con nomenclatura en latín, visibilidad estacional por hemisferio y descripciones astronómicas.

* **Calendario de Eventos Astronómicos con Contextualización Local**:
  * Agenda de eclipses solares, lunares y superlunas con conversión automática de marca temporal UTC a la hora y zona horaria nativa del dispositivo (`Intl.DateTimeFormat`).
  * Análisis de visibilidad local aproximado: evaluación de las horas solares/nocturnas en la ubicación del usuario para predecir si un eclipse será visible según el momento del día.
  * Navegación asistida para desplazamiento automático al próximo evento astrológico futuro.

## 🛠️ Especificaciones Técnicas

* **Cálculo Astronómico de la Fase y Edad Lunar**:
  * La edad de la Luna $A$ (en días) se determina con respecto al mes sinódico promedio $S = 29.530588853 \text{ días}$ y una fecha de referencia conocida de Luna Nueva $T_{ref}$ (06 de enero de 2000, 18:14 UTC):

    $$
    d = \frac{T_{actual} - T_{ref}}{86400000}
    $$

    $$
    A = d \pmod S \quad \text{si } A < 0, \; A \gets A + S
    $$

  * La fracción de la fase $\phi \in [0, 1)$ y la fracción de iluminación $I \in [0, 1]$ se calculan mediante:

    $$
    \phi = \frac{A}{S}
    $$

    $$
    I = \frac{1 - \cos(2\pi \cdot \phi)}{2}
    $$

* **Geometría del Terminador Lunar en Canvas 2D**:
  * El terminador es una elipse de radio vertical igual al radio del disco $R$ y radio horizontal $r_x$ ajustado según la fase $\phi$:

    $$
    r_x = R \cdot |\cos(2\pi \cdot \phi)|
    $$

  * La sombra se sobrepone dibujando un semicírculo de radio $R$ combinado con un arco elíptico de radio horizontal $r_x$, invirtiendo la dirección de barrido según si la Luna se encuentra en fase creciente ($\phi \le 0.5$) o menguante ($\phi > 0.5$).

* **Proyección de Próxima Ocurrencia**:
  * La fecha exacta para una fase objetivo $F_{frac}$ ($0.0$ para Luna Nueva, $0.5$ para Luna Llena) se proyecta iterando sobre el ciclo de lunación $k = \lfloor d / S \rfloor$:

    $$
    T_{evento} = T_{ref} + (k + F_{frac}) \cdot S \cdot 86400000
    $$

* **Evaluación de Visibilidad de Eclipses por Zona Horaria**:
  * Extracción de la hora local de ocurrencia $H_{local} \in [0, 23]$ en la zona horaria del sistema. La visibilidad teórica se clasifica de forma probabilística:
    * **Eclipse Solar**: Visible preferentemente si $7 \le H_{local} \le 20$ (diurno).
    * **Eclipse Lunar**: Visible preferentemente si $H_{local} \ge 20$ o $H_{local} \le 6$ (nocturno).

* **Tecnologías**: HTML5, CSS Custom Properties / Modern Layouts, JavaScript Vanilla (ES6+), Canvas 2D API, Inline SVG, Internationalization API (`Intl`).

## 📂 Instrucciones de Uso

1. Utiliza las pestañas superiores para alternar entre las tres secciones principales:
   * **Fase lunar**: Muestra la representación visual interactiva de la Luna en tiempo real, su iluminancia y la cuenta regresiva a las próximas fases principales.
   * **Constelaciones**: Selecciona cualquier constelación del catálogo para inspeccionar su trazado de estrellas y su descripción detallada.
   * **Eventos**: Revisa la lista de eventos astronómicos programados. Haz clic en **Ir al próximo** para desplazarte automáticamente al evento astronómico más cercano en el futuro.