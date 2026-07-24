# Lights Out · Panel de control

Página de una sola vista (`index.html`) con el clásico puzzle **Lights Out**, ambientado como un panel de control industrial (metal, remaches, placa de latón). Todo el juego —generación del tablero, resolución y persistencia de la mejor puntuación— se ejecuta íntegramente en el navegador.

## Qué hace

- **Tablero cuadrado configurable**: selector de tamaño (`3×3` a `7×7`) mediante un control segmentado; cada bombilla es un botón independiente.
- **Generación siempre resoluble**: cada partida nueva se construye partiendo del tablero completamente apagado y aplicando una serie de pulsaciones aleatorias (`n² + 1` a `n² + n`); como pulsar una casilla es su propia operación inversa, el resultado siempre tiene solución garantizada. Si por azar el tablero generado queda ya resuelto (todo apagado), se vuelve a generar.
- **Mecánica clásica de Lights Out**: al pulsar una bombilla, se invierte su estado y el de sus vecinas ortogonales (arriba, abajo, izquierda, derecha), sin efecto diagonal ni "wrap-around" en los bordes.
- **Contador de pulsaciones** y **cronómetro** (arranca en la primera pulsación de cada partida), mostrados en formato de "lector" tipo panel industrial.
- **Mejor puntuación por tamaño de tablero**: al resolver el puzzle, si el número de pulsaciones mejora el récord guardado para ese tamaño concreto, se actualiza y persiste en `localStorage` (clave `lightsout-best-N`, una por cada tamaño de tablero).
- **Botón "Pista"**: resuelve el estado actual del tablero mediante **eliminación gaussiana sobre GF(2)** (aritmética módulo 2) para calcular qué casillas hay que pulsar desde la posición actual hasta apagarlo todo, y resalta esas casillas con un anillo pulsante. Las pistas no se aplican automáticamente: el jugador sigue pulsando manualmente.
- **Botón "Nuevo panel"**: genera un tablero nuevo del tamaño seleccionado y reinicia contador, cronómetro y estado de victoria.
- **Aviso de victoria** ("CIRCUITO COMPLETO") superpuesto sobre el tablero cuando todas las luces quedan apagadas, momento en el que también se detiene el cronómetro y se bloquean más pulsaciones hasta la siguiente partida.
- Accesibilidad básica: cada bombilla tiene un `aria-label` describiendo su fila y columna, hay estilos de foco visibles (`:focus-visible`) y se respeta `prefers-reduced-motion` desactivando animaciones (transición de bombillas, anillo de pista) para quien lo prefiera.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Sin backend ni peticiones de red propias: la única petición externa es la carga de las tipografías (`Oswald` para los títulos, `IBM Plex Mono` para los datos) desde Google Fonts.
- Persistencia mediante `localStorage` del navegador (solo la mejor puntuación por tamaño; no se guarda el estado de la partida en curso).
- Toda la lógica del juego (generación, resolución y detección de victoria) se modela como vectores/matrices sobre **GF(2)**: cada casilla es un bit, pulsar es un XOR con un vector de vecindad, y resolver el tablero equivale a resolver un sistema lineal binario.

## Limitaciones a tener en cuenta

- La partida en curso (tablero actual, pulsaciones, tiempo) no se guarda: al recargar la página se pierde y se genera un panel nuevo; solo la mejor puntuación por tamaño sobrevive a la recarga.
- El cronómetro se basa en `setInterval` de 1 segundo; si la pestaña queda en segundo plano y el navegador limita los temporizadores, el tiempo mostrado puede desincronizarse ligeramente del tiempo real transcurrido.
- La pista siempre calcula la solución óptima en número de pulsaciones necesarias desde el estado actual, pero no anima ni limita cuántas veces se puede pedir; se puede abusar de ella para resolver el puzzle casilla a casilla.
- No hay modo multijugador, ranking global ni forma de compartir o reproducir un tablero concreto (cada partida es aleatoria y no reproducible mediante semilla).
