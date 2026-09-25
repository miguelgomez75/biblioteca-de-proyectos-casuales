# Typing Assessment Dashboard (typing::hub)

`typing::hub` es una aplicación web interactiva diseñada para la evaluación, práctica y registro de la velocidad y precisión en mecanografía. Soporta pruebas de texto fluido en varios idiomas (Español e Inglés) y fragmentos de código fuente (JavaScript, Python y HTML), integrando métricas en tiempo real como WPM (*Words Per Minute*), velocidad bruta y porcentaje de precisión con almacenamiento local persistente.

## 🚀 Características Principales

* **Modos de Prueba Versátiles**:
  * **Modo Idioma (Español e Inglés)**: Generación aleatoria de cadenas de texto a partir de bancos de palabras de alta frecuencia.
  * **Modo Código**: Selección de fragmentos de código (*snippets*) reales en JavaScript, Python y HTML con preservación de sangría y saltos de línea (`\n`).

* **Telemetría y Métricas en Tiempo Real**:
  * **WPM (Palabras Por Minuto)**: Velocidad ponderada neta basada en caracteres correctos.
  * **Precisión (%)**: Relación porcentual entre los caracteres ingresados correctamente y la cantidad total de pulsaciones efectivas.
  * **Reloj Temporizador Adaptativo**: Conteo regresivo configurable ($15$, $30$, $60$ y $120$ segundos) activado automáticamente con la primera pulsación de tecla del usuario.

* **Renderizado de Texto e Interfaz de Escritura Directa**:
  * Representación interactiva estado por estado: resaltado de carácter actual, caracteres correctos y errores cometidos.
  * Captura fluida de entrada mediante un campo de entrada oculto sincronizado con la interfaz visual.

* **Historial y Persistencia de Desempeño**:
  * Registro de los últimos $12$ intentos almacenados localmente (`localStorage`).
  * Destacado automático de la marca personal más alta (*Best WPM*).

## 🛠️ Especificaciones Técnicas

* **Cálculo Matemático de Métricas de Mecanografía**:

  * La métrica de Palabras Por Minuto Netas ($WPM$) se calcula estandarizando una "palabra" como $5$ caracteres válidos consecutivos y evaluando el tiempo transcurrido $T_{min}$ en minutos:

    $$
    T_{min} = \frac{\Delta t_{\text{ms}}}{60000}
    $$

    $$
    WPM = \left\lfloor \frac{C_{\text{correctos}}}{5 \cdot T_{min}} \right\rfloor
    $$

  * El $WPM$ en Bruto ($WPM_{\text{raw}}$) evalúa el volumen total de teclas presionadas independientemente de sus errores:

    $$
    WPM_{\text{raw}} = \left\lfloor \frac{C_{\text{totales}}}{5 \cdot T_{min}} \right\rfloor
    $$

  * La Precisión ($A$) se determina mediante:

    $$
    A = \begin{cases} 
      100\% & \text{si } C_{\text{totales}} = 0 \\
      \left\lfloor \left( \frac{C_{\text{correctos}}}{C_{\text{totales}}} \right) \cdot 100 \right\rfloor & \text{si } C_{\text{totales}} > 0 
    \end{cases}
    $$

* **Flujo de Estado y Sincronización de Entrada**:
  * La entrada de teclado es procesada comparando en tiempo real el valor de la entrada en oculto $V_{\text{typed}}$ contra la cadena objetivo $S_{\text{target}}$.
  * Para cada índice $i$:
    * Si $i < \text{length}(V_{\text{typed}})$, se asigna la clase `.correct` si $V_{\text{typed}}[i] == S_{\text{target}}[i]$, o `.incorrect` si difieren.
    * Si $i == \text{length}(V_{\text{typed}})$, se resalta como el carácter activo `.current`.

* **Estructura del Historial de Resultados**:
  Los resultados se estructuran en JSON bajo la clave `typinghub_history`:

  ```json
  {
    "date": "2026-09-25T11:51:35.000Z",
    "mode": "code",
    "codeLang": "js",
    "duration": 30,
    "wpm": 78,
    "acc": 98
  }
  ```

* **Tecnologías**: HTML5, CSS Custom Properties, JavaScript Vanilla (ES6+), Event Listeners API, Web Storage API (`localStorage`).

## 📂 Instrucciones de Uso

1. **Configuración**: Selecciona el **Modo** (Español, English o Código), la **Duración** deseada y el **Lenguaje** (en caso de elegir el modo Código).
2. **Iniciar Prueba**: Haz clic en el área del texto y comienza a escribir. El temporizador se iniciará con tu primera tecla.
3. **Pausar o Reiniciar**: Puedes reiniciar el fragmento actual haciendo clic en **↻ Nuevo texto**.
4. **Resultados**: Al agotarse el tiempo o finalizar el texto, se desplegará una tarjeta con tus estadísticas completas y el intento se guardará en tu **Historial reciente**.