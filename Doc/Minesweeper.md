# mines::hub — Buscaminas Personalizable

Aplicación web de una sola página (`index.html`) que implementa el juego clásico del Buscaminas (*Minesweeper*) con generación de tableros garantizados, selección de niveles de dificultad y soporte completo para dispositivos táctiles y de escritorio. Todo el procesamiento y la lógica del tablero ocurren en el navegador mediante JavaScript nativo, sin dependencias externas ni compiladores.

## Características Principales

### Generación de Tablero y Clic Seguro
* **Primer clic siempre seguro**: La colocación de minas no se realiza al iniciar el tablero, sino en el instante en que el usuario hace el primer clic.
* **Área de inicio garantizada**: Se asegura que la casilla pulsada y todas sus casillas adyacentes (hasta 8 casillas circundantes) queden libres de minas, garantizando una apertura inicial útil de casillas vacías o números de pista.

### Niveles de Dificultad y Personalización
* **Presets Estándar**:
  * **Principiante**: Tablero de $9 \times 9$ con 10 minas.
  * **Intermedio**: Tablero de $16 \times 16$ con 40 minas.
  * **Experto**: Tablero de $30 \times 16$ con 99 minas.
* **Modo Personalizado**:
  * Permite ajustar libremente el ancho ($5$ a $40$), alto ($5$ a $40$) y la cantidad de minas.
  * Límite dinámico de minas calculado según las dimensiones para evitar bloqueos durante el primer clic.

### Mecánicas de Juego y Controles
* **Revelar (Clic Izquierdo)**: Descubre la casilla seleccionada. Si contiene una mina, finaliza la partida; si no tiene minas alrededor ($0$), se ejecuta un algoritmo de propagación (*flood fill*) que desvela las casillas contiguas vacías.
* **Marcado de Banderas (Clic Derecho)**: Alterna una bandera (🚩) para señalar posibles minas y ajustar el contador.
* **Mecánica de Acorde / Chording (Doble Clic / Clic sobre número desvelado)**: Al pulsar sobre una cifra cuyo número de banderas adyacentes coincida con su valor, se desvelan automáticamente el resto de casillas adyacentes no marcadas.
* **Modo Táctil**: Toggle de interacción (👆 Revelar / 🚩 Bandera) pensado para optimizar el juego en teléfonos móviles o pantallas táctiles sin necesidad de pulsación prolongada.

### Interfaz y Marcadores
* **Barra de Estado**:
  * **Contador de minas**: Muestra las minas pendientes descontando las banderas colocadas.
  * **Botón carita (*Face Button*)**: Refleja el estado de la partida (`🙂` en juego, `😎` victoria, `💀` derrota) y permite reiniciar con un clic.
  * **Temporizador**: Mide el tiempo transcurrido en segundos desde el primer clic (hasta 999 s).
* **Banners de resultado**: Muestran un resumen con el tiempo final en caso de victoria o mensaje de derrota al activar una mina.

## Arquitectura Técnica

* **Tecnologías**: HTML5, CSS3 y JavaScript ES6 (vanilla).
* **Grid Dinámico**: Renderizado mediante CSS Grid con columnas adaptativas según la configuración activa.
* **Estilos y Tema**: Diseño oscuro (*Dark Mode*) coherente con la suite (`--bg: #0c0c10`, `--accent: #e8a030`), tipografía monoespaciada para marcadores (`IBM Plex Mono`) y paleta de colores estándar para la numeración de celdas adyacentes.

## Consideraciones de Uso

* No requiere servidor ni backend.
* Las partidas no se persisten en `localStorage`; refrescar la página reiniciará la sesión y el temporizador.