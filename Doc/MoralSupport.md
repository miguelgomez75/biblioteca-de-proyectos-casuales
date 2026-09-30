# moralsupport::hub — Mensaje diario de apoyo

Página de una sola vista (`MoralSupport.html`) que ofrece una reflexión o mensaje de apoyo positivo diferente cada día para promover el bienestar mental. Funciona de manera 100% determinista y local, sin backend ni APIs externas, garantizando que todos los usuarios vean el mismo mensaje en una fecha determinada.

## Qué hace

### Mensaje determinista diario

* **Selección por fecha**: calcula un índice determinista basado en un algoritmo de *hashing* sobre la fecha en formato ISO (`YYYY-MM-DD`). Esto garantiza que el mensaje del día sea idéntico para cualquiera que abra la aplicación esa misma fecha.

* **Banco de datos local**: incluye un catálogo integrado de más de 300 frases de apoyo, reflexiones sobre el ritmo de vida, la autocompasión, la perseverancia y el manejo de la exigencia personal.

* **Acompañamiento visual**: asocia cada mensaje con un icono (*emoji*) representativo generado de forma correlativa a través del valor de *hash*.

* **Presentación cuidada**: tarjeta de lectura central con diseño de graduación suave, animación de entrada (*fadeIn*) y fecha formateada en texto largo según la localización local.

### Contador de rachas e historial

* **Seguimiento de consistencia**:
  * **Días seguidos (Racha)**: evalúa de forma retrospectiva el número de días consecutivos que el usuario ha visitado la aplicación. Si se interrumpe la secuencia, el contador se recalcula automáticamente.
  * **Total de días visitados**: contabiliza el número total de días únicos registrados en la aplicación.

* **Historial de lecturas**: muestra una lista descendente con las visitas recientes (últimos 14 días), permitiendo repasar las frases leídas en fechas anteriores junto a su fecha simplificada.

## Tecnología

* **HTML + CSS + JavaScript "vanilla"** estructurado en un único archivo ejecutable de forma autónoma.

* **Diseño e interfaz**: integrado con la estética visual del ecosistema (`DevTools Hub`) utilizando fondo oscuro, tipografías modulares (`Inter` para interfaz y `IBM Plex Mono` para datos), acentos en tono ámbar y tarjeta destacada mediante gradiente sutil.

* **Algoritmo de Hashing**: implementación de *hash* de cadenas de texto (basado en desplazamiento de bits) para mapear de manera uniforme la fecha a los índices del array de mensajes.

* **Persistencia local**: utiliza `localStorage` (`moralsupporthub:streak`) para almacenar el registro de días visitados sin enviar ni procesar datos en servidores remotos.

## Limitaciones a tener en cuenta

* **Dependencia del reloj local**: el mensaje mostrado se calcula con base en la fecha configurada en el dispositivo cliente.

* **Sincronización entre dispositivos**: la racha y el historial de días visitados residen exclusivamente en la memoria del navegador utilizado (`localStorage`), por lo que no se comparten entre diferentes navegadores o dispositivos.