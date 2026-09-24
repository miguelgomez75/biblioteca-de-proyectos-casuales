# audio::lens — BPM, Espectrograma y Detección de Beats

Página de una sola vista (`index.html`) para el análisis espectral y de tempo de archivos de audio en tiempo real y diferido. Ofrece cálculo de BPM mediante autocorrelación de flujo espectral, marcado automático de beats con respuesta visual, espectrograma completo estático y visualizaciones vivas (espectrograma dinámico y osciloscopio). Sin backend propio: la decodificación, el cálculo de FFT y el procesamiento matemático se ejecutan íntegramente en el navegador utilizando Web Workers para no bloquear la interfaz.

## Qué hace

### Carga y decodificación de audio
- Acepta archivos de audio en formatos **MP3, OGG, WAV y FLAC** mediante arrastrar y soltar (*drag & drop*) o selector de archivos.
- Decodificación local instantánea a través del estándar Web Audio API (`AudioContext.decodeAudioData`).
- Genera una ficha informativa con la duración exacta, frecuencia de muestreo (*sample rate*), número de canales, tempo calculado en BPM y el recuento total de beats detectados.

### Análisis en segundo plano (Web Worker)
Para garantizar una experiencia fluida sin congelar la pantalla durante procesamientos pesados, el análisis se delega a un *Web Worker* con barra de progreso en tiempo real:
- **Onset Strength (Flujo Espectral)**: Mide el incremento de energía espectral entre tramas consecutivas de audio (paso de 10 ms) aplicando una ventana de Hanning sobre transformadas rápidas de Fourier (FFT de 2048 puntos).
- **Cálculo de BPM por autocorrelación**: Determina el tempo del archivo mediante autocorrelación sobre el flujo espectral en el rango de 60 a 200 BPM, refinando el resultado ante armónicos de doble o medio tempo.
- **Detección de Beats**: Identifica los picos locales de energía (*onsets*) que superen el umbral promedio del entorno (ventana de 400 ms) respetando un intervalo mínimo entre beats.
- **Generación del Espectrograma Completo**: Construye una representación visual completa de todo el tema mapeando el tiempo en el eje X, las frecuencias en el eje Y (de graves a agudos) y la amplitud a una escala de color logarítmica (negro → azul → verde → amarillo → rojo).

### Reproducción e interacción
- **Reproductor integrado**: Controles de reproducción, pausa y barra de progreso interactiva con tiempo actual y total.
- **Marcadores de Beat en la barra de progreso**: Indicadores verticales de color naranja desplegados a lo largo de la barra en cada punto donde se detectó un golpe de ritmo.
- **Efecto "Flash Beats"**: Opción activable para generar un destello en pantalla en sincronía exacta con cada beat durante la reproducción.
- **Navegación (*Seek*)**: Permite saltar a cualquier punto de la canción haciendo clic directamente en la barra de progreso o en cualquier zona del espectrograma completo estático.
- **Control de Volumen**: Ajuste lineal de ganancia mediante un deslisador (*slider*).

### Visualización en tiempo real
Durante la reproducción, se ofrece un panel de visualización en directo con dos modos intercambiables:
- **Espectrograma dinámico**: Cascada o *waterfall* en desplazamiento continuo (*scrolling*) que muestra la distribución de frecuencias en tiempo real.
- **Osciloscopio**: Muestra la forma de onda del dominio del tiempo mediante captura de datos del canal activo.

## Motor matemático y de procesamiento

- **Transformada Rápida de Fourier (FFT)**: Implementación propia del algoritmo de Cooley-Tukey para datos reales dentro del *Worker*, sin dependencias externas.
- **Paleta de Color Personalizada (*Colormap*)**: Mapeo continuo de valores normalizados en espacio RGB para la lectura intuitiva de densidades de frecuencia.
- **Procesamiento Multihilo**: Uso de transferencias de memoria sin copia (*Transferable ArrayBuffers*) entre el hilo principal y el *Worker* para maximizar la velocidad de procesamiento.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks, sin *build step* ni dependencias externas), todo integrado en un único archivo ejecutable.
- Mismo lenguaje visual que el resto de la suite (`DevTools Hub`): fondo oscuro (`--bg: #0c0c10`), detalles en tono ámbar/naranja (`--accent`, `--beat`), tipografías (`Inter` + `IBM Plex Mono`) y contenedores estilizados.
- Renderizado de altas prestaciones mediante `HTML5 Canvas 2D` utilizando `ImageData` a nivel de píxel para la renderización del espectrograma.

## Limitaciones a tener en cuenta

- Todo el análisis se realiza en la memoria RAM del navegador; archivos de audio extremadamente largos o pesados pueden demorar más tiempo en procesarse en dispositivos de gama baja.
- El algoritmo de detección de BPM está optimizado para música con patrones rítmicos o de percusión definidos; temas de música clásica, *ambient* o con cambios constantes de compás pueden ofrecer lecturas de tempo orientativas.
- La sesión no almacena datos: al recargar la página se limpia el archivo cargado y hay que volver a seleccionar o arrastrar el audio.