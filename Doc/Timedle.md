# Timedle

Mini-juego de una sola página (`index.html`) inspirado en el formato "-dle" (Wordle y compañía): en vez de adivinar una palabra, hay que adivinar **cuánto tiempo ha estado corriendo un cronómetro oculto**, con intentos que se van acercando en frío/tibio/caliente hasta dar con el valor exacto.

## Qué hace

- **Ronda aleatoria**: al pulsar "▶ Empezar ronda", se sortea un tiempo objetivo entre 1:00 y 10:00 (en centésimas de segundo internamente, formato `S:DD`) y arranca un temporizador real de esa duración exacta en segundo plano (`setTimeout`), sin mostrar nunca el número real mientras corre.
- **Indicador visual de grabación**: mientras el cronómetro corre, un punto rojo parpadea junto a la etiqueta "REC" y el número se muestra oculto como "? : ??"; al terminar el tiempo, cambia a "DETENIDO" y aparece el campo para introducir intentos.
- **Formato de intento validado**: exige el formato `S:DD` (un dígito de segundos del 1 al 10, dos dígitos de centésimas), rechazando por ejemplo "10:05" (solo se permite "10:00" como único valor válido con segundos=10) y mostrando un mensaje de error si no cumple el patrón.
- **Feedback tipo "frío/caliente"** por cada intento, según la diferencia absoluta con el tiempo objetivo (en centésimas):
  - diferencia ≤ 10 → **"muy caliente"** (verde, ✓ si es exacto o ▲/▼ si no).
  - diferencia ≤ 50 → **"tibio"** (ámbar).
  - diferencia > 50 → **"frío"** (gris azulado).
  - además de la categoría, cada intento muestra una flecha ▲ (tu intento fue menor que el objetivo, hay que subir) o ▼ (tu intento fue mayor, hay que bajar).
- **Historial de intentos**: cada intento se añade al principio de una lista (más reciente arriba), con una pequeña animación de entrada, mostrando el tiempo introducido y su feedback.
- **Victoria**: al acertar exactamente el tiempo objetivo, se muestra un cuadro de resultado con el tiempo exacto y el número de intentos empleados, y aparece el botón "↺ Jugar de nuevo" para reiniciar todo el estado (cronómetro, historial e interfaz) y volver a la pantalla inicial.
- **Atajo de teclado**: se puede enviar el intento actual pulsando `Enter` en el campo de texto, además del botón "→".

## Cómo funciona el temporizador oculto

El "cronómetro" no se muestra tickeando en pantalla: internamente se calcula un tiempo objetivo en centésimas de segundo (`target`, entre 100 y 1000, es decir 1:00 a 10:00) y se programa un único `setTimeout` de esa duración en milisegundos (`target * 10`). Mientras tanto, la interfaz solo informa de que está "grabando"; el número real no se revela hasta que se acierta la ronda (`showWin`), momento en el que se formatea con `fmt()` y se muestra tanto en el cronómetro como en el cuadro de resultado.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step, sin backend: cada ronda es independiente y no queda guardada al recargar la página).
- Toda la mecánica del juego (temporizador, parseo de intentos, feedback e historial) vive en un único cierre de función (IIFE) sin dependencias externas.
- Tipografías Inter (UI) e IBM Plex Mono (números del cronómetro, intentos, etiquetas de estado), con una paleta de tres colores de feedback (verde éxito, ámbar tibio, gris frío) sobre fondo oscuro.

## Limitaciones a tener en cuenta

- No hay persistencia entre partidas ni comparación con intentos anteriores de otras sesiones (no es un "diario" tipo Wordle con una única ronda por día): cada vez que se pulsa "Jugar de nuevo" se sortea un tiempo completamente nuevo.
- El rango de tiempos objetivo está fijo en el propio código (1:00–10:00); cambiarlo requiere editar los valores en `startRound()`.
