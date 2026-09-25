# Real-Time Weather Dashboard (weather::hub)

`weather::hub` es una aplicación web interactiva de visualización meteorológica en tiempo real integrada con la API pública de **Open-Meteo**. Proporciona pronósticos detallados del clima actual, predicciones horarias para las próximas 24 horas y tendencias térmicas semanales a 7 días con soporte para la conversión dinámica de unidades (°C / °F), geolocalización basada en el navegador y almacenamiento de ubicaciones recientes.

## 🚀 Características Principales

* **Búsqueda Geográfica y Geolocalización Directa**:

  * Integración con la API de Geocodificación de Open-Meteo con autocompletado en tiempo real (*debounce* de $350 \text{ ms}$).

  * Detección automatizada de la posición del usuario mediante la API de Geolocalización nativa del navegador (`navigator.geolocation`).

* **Telemetría y Pronóstico Actual**:

  * Visualización de la temperatura actual, sensación térmica (*apparent temperature*), porcentaje de humedad relativa, velocidad del viento en $\text{km/h}$ y nivel de precipitación acumulada en $\text{mm}$.

  * Mapeo de códigos meteorológicos estandarizados WMO (*World Meteorological Organization*) a descripciones en español e íconos temáticos.

* **Pronóstico Horario y Térmico Semanal**:

  * **Carrusel Horario**: Muestra la evolución meteorológica durante las próximas 24 horas a partir del momento de consulta.

  * **Línea de Tiempo Semanal (7 Días)**: Mapeo de rangos térmicos representados mediante barras de proporción relativas a la fluctuación global de temperatura esperada para la semana.

* **Conversión de Unidades y Almacenamiento Persistente**:

  * Alternancia dinámica entre grados Celsius (°C) y Fahrenheit (°F).

  * Registro local persistente (`localStorage`) de las últimas 6 ciudades consultadas para un acceso directo mediante etiquetas interactiva (*chips*).

## 🛠️ Especificaciones Técnicas

* **Estandarización y Conversión Térmica**:

  * La conversión de valores térmicos desde la escala métrica Celsius ($T_{C}$) a Fahrenheit ($T_{F}$) sigue la ecuación lineal:

    $$
    T_{F} = \left\lfloor T_{C} \cdot \frac{9}{5} + 32 \right\rceil
    $$

* **Cálculo de Proporción para la Barra de Rango Térmico**:

  * En el módulo de pronóstico semanal, las barras de temperatura visualizan la fluctuación diaria de la temperatura mínima ($T_{\text{min}, i}$) y máxima ($T_{\text{máx}, i}$) con respecto a las extremas globales de la semana ($T_{\text{mín}, \text{global}}$ y $T_{\text{máx}, \text{global}}$):

    $$
    \text{Posición Inicial (\%)} = \left( \frac{T_{\text{mín}, i} - T_{\text{mín}, \text{global}}}{T_{\text{máx}, \text{global}} - T_{\text{mín}, \text{global}}} \right) \cdot 100
    $$

    $$
    \text{Ancho (\%)} = \max \left( \left( \frac{T_{\text{máx}, i} - T_{\text{mín}, i}}{T_{\text{máx}, \text{global}} - T_{\text{mín}, \text{global}}} \right) \cdot 100, \; 6 \right)
    $$

* **Mapeo de Códigos Meteorológicos WMO**:

  * La interpretación de la condición climática se basa en el estándar WMO Code Table 4677:

    * $0$: Despejado (☀️).

    * $1, 2, 3$: Nubosidad variable / Nublado (🌤️, ⛅, ☁️).

    * $45, 48$: Niebla (🌫️).

    * $51\text{--}67$: Llovizna y lluvia (🌦️, 🌧️).

    * $71\text{--}77$: Nieve / Granizo (🌨️, ❄️).

    * $80\text{--}82$: Chubascos (🌦️, 🌧️, ⛈️).

    * $95\text{--}99$: Tormentas severas (⛈️).

* **APIs Externas Utilizadas**:

  * **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`

  * **Forecast API**: `https://api.open-meteo.com/v1/forecast`

* **Tecnologías**: HTML5, CSS Custom Properties / Modern Layouts, JavaScript Vanilla (ES6+), Fetch API, Geolocation API, Web Storage API.

## 📂 Instrucciones de Uso

1. **Seleccionar Ubicación**: Escribe el nombre de una ciudad en la barra de búsqueda o presiona **📍 Mi ubicación** para usar tu posición actual.

2. **Cambiar Unidades**: Utiliza los botones **°C** / **°F** en la parte superior derecha para ajustar la unidad de temperatura.

3. **Consultar Pronósticos**: Navega por la tarjeta del clima actual, desliza horizontalmente el módulo de las **Próximas 24 horas** o revisa la tendencia de la barra de rango de los **7 días**.