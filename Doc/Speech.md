# Text-to-Speech Reader (speech::hub)

`speech::hub` es una aplicación web para la lectura asistida de textos en voz alta basada en la API nativa `WebSpeech Synthesis`. Permite cargar apuntes, artículos o documentos, dividirlos automáticamente en párrafos y frases, y seguir visualmente la lectura palabra por palabra en tiempo real.

## 🚀 Características Principales

* **Segmentación Inteligente de Texto**:
  * Procesamiento y parsing automático de texto plano en párrafos y oraciones sintácticamente delimitadas.
  * Resaltado visual interactivo en la interfaz (*Karaoke style*): sincronización de la frase activa y la palabra específica leída en tiempo real mediante el evento `onboundary`.

* **Controles de Audio y Transporte**:
  * Módulo de reproducción completo: Reproducir, Pausar, Detener, Saltar a frase anterior/siguiente.
  * Ajustes dinámicos de parámetros en tiempo real:
    * **Velocidad (Rate)**: Escala de $0.5\times$ a $2.0\times$.
    * **Tono (Pitch)**: Escala de $0.0$ a $2.0$.
    * **Volumen**: Escala de $0\%$ a $100\%$.

* **Voces del Sistema y Distinción de Privacidad**:
  * Detección y filtrado dinámico de las voces instaladas en el sistema operativo o navegador.
  * Distinción transparente entre voces de síntesis local (*offline*, procesadas en el dispositivo) y voces en la nube (*online*, procesadas por servicios externos de terceros).

* **Gestor de Textos y Estimación de Tiempo**:
  * Guardado de copias y borradores de textos en `localStorage`.
  * Contador de palabras y cálculo en tiempo real de la duración estimada de lectura en minutos basada en la velocidad de reproducción ($WPM$).

## 🛠️ Especificaciones Técnicas

* **Cálculo de Tiempo Estimado de Lectura**:
  * La velocidad base de lectura promedio es de $155$ palabras por minuto ($WPM$). El tiempo en minutos $T$ se recalcula en función de la tasa de velocidad ajustada por el usuario $r$:

    $$
    T = \frac{\text{Palabras Total}}{155 \cdot r}
    $$

* **Manejo de la API de Voz (`SpeechSynthesisUtterance`)**:
  * Segmentación mediante expresiones regulares para aislar puntuaciones de cierre (`.`, `!`, `?`, `…`) seguidas de comillas o cierres de paréntesis.
  * Mapeo de índices mediante `charIndex` enviado por el evento `onboundary` de la API de voz nativa del navegador para resaltar la palabra exacta consumida por el motor TTS.

* **Tecnologías**: HTML5, CSS Custom Properties, JavaScript Vanilla (ES6+), Web Speech API (`speechSynthesis`).

## 📂 Instrucciones de Uso

1. Introduce o pega el texto deseado en el área de trabajo central.
2. Selecciona la **Voz**, **Velocidad**, **Tono** y **Volumen** preferidos en el panel superior de controles.
3. Haz clic en el botón de reproducción (**▶**) para iniciar la lectura. Puedes hacer clic sobre cualquier frase del texto para saltar la reproducción directamente a ese punto.
4. Opcionalmente, guarda tus lecturas habituales utilizando el botón **Guardar** del panel lateral.

```

Here is the documentation file for `speech::hub`. Let me know if you need any adjustments or further help with your tools!