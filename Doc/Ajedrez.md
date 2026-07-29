# chess::hub — Ajedrez personalizable

Página de una sola vista (`index.html`) con un ajedrez totalmente configurable: tamaño de tablero, composición de cada bando, colocación automática o manual de las piezas, tres modos de reglas distintos, un comprobador visual de piezas amenazadas, y la posibilidad de jugar contra una IA o contra otra persona en el mismo dispositivo. Sin backend propio: todo el motor de reglas y la IA se ejecutan en el navegador.

## Qué hace

### Modo de reglas
Se elige antes de configurar el resto de la partida, porque determina qué se puede personalizar:

- **Clásico**: tablero 8×8 y ejército tradicional (1 Rey, 1 Dama, 2 Torres, 2 Alfiles, 2 Caballos, 8 Peones por bando), fijos — las tarjetas de personalización se ocultan. Se tienen en cuenta los **jaques y el jaque mate**: no se puede mover a una posición que deje al propio rey en jaque, y la partida termina en jaque mate o en tablas por ahogado.
- **Modificado**: tablero y composición de piezas totalmente personalizables, pero **cada bando debe tener exactamente un rey** (el control no deja bajar de 1 ni subir de 1). Igual que en Clásico, se aplican jaques y jaque mate.
- **Eliminación**: todo es personalizable, **incluido el número de reyes** (0, 1 o varios por bando). Los jaques no se tienen en cuenta y **capturar un rey no termina la partida** — es una pieza más, como cualquier otra. Se gana eliminando todas las piezas del rival; si un bando se queda sin movimientos legales (con o sin piezas), la partida termina en tablas o por eliminación según corresponda.

### Tamaño del tablero y composición de cada bando
(Disponible en Modificado y Eliminación)
- Columnas y filas configurables de 4 a 10.
- Contador independiente por tipo de pieza (Rey, Dama, Torre, Alfil, Caballo, Peón) y por bando, hasta 24 piezas de cada tipo — el Rey se limita a 1 en Modificado y puede subir libremente en Eliminación.
- Si la composición elegida no cabe en la mitad del tablero que le corresponde a un bando, se avisa con un banner y se recorta automáticamente al empezar (los peones se recortan primero; el resto de piezas, por orden de valor, como último recurso).

### Colocación de piezas: automática o manual
- **Automática**: al empezar la partida, cada bando se coloca solo, pieza mayor por pieza mayor desde el borde hacia el centro y los peones en la fila siguiente, repartiendo en más filas si no caben en una sola.
- **Manual**: aparece un tablero de configuración con un **inventario de piezas por color** (como las piezas capturadas fuera del tablero en algunas variantes). Se hace clic en una pieza del inventario y luego en una casilla para colocarla; si esa casilla ya tenía otra pieza, esa pieza vuelve automáticamente al inventario. También se pueden mover piezas ya colocadas (clic en la pieza, clic en el destino). Incluye botones para "Auto-colocar con estos recuentos" (para partir de una base y retocarla) y "Vaciar tablero". Si cambias los contadores, el tamaño del tablero o el modo de reglas mientras estás en manual, el inventario y el tablero se resincronizan solos sin duplicar ni perder piezas. En Clásico y Modificado no se puede empezar la partida sin un rey colocado de cada color; se avisa con un banner si falta.

### Jugadores
- Elige con qué color juegas tú (Blancas o Negras).
- El rival puede ser la **IA** (Fácil, Normal o Difícil) u **otro jugador** en el mismo dispositivo (modo local, "hot-seat").

### Partida
- Tablero dinámico según el tamaño configurado, con notación de casillas tipo ajedrez (columnas con letras, filas con números) adaptada al tamaño elegido.
- Clic para seleccionar una pieza (se resaltan sus movimientos legales) y clic en el destino para moverla.
- Promoción de peón con selector de pieza (Dama, Torre, Alfil o Caballo) al llegar a la última fila.
- En Clásico y Modificado, la casilla del rey se resalta en rojo y la insignia de turno muestra "¡Jaque!" cuando corresponde; las piezas clavadas o sin movimientos que resuelvan el jaque no ofrecen destinos legales.
- Botón **"⚠ Piezas amenazadas"**: resalta con un contorno discontinuo cualquier pieza —de cualquier bando— que el rival podría capturar ahora mismo. Útil para detectar horquillas de caballo y amenazas similares de un vistazo.
- Bandejas de piezas capturadas por cada bando e historial de jugadas con notación simplificada (por ejemplo `Ng1-f3` o `Dd1xh5`).
- Al terminar la partida se indica el motivo exacto: jaque mate, tablas por ahogado, eliminación (sin piezas) o captura de rey (solo en Clásico/Modificado).

## Motor de reglas y de IA

- **Movimientos**: implementados desde cero para cada tipo de pieza (deslizantes para Torre/Alfil/Dama con bloqueo por la primera pieza encontrada, saltos para Caballo/Rey, y Peón con avance simple/doble desde su posición inicial, captura en diagonal y promoción). No incluye enroque ni captura al paso en ningún modo.
- **Jaque y jaque mate** (Clásico/Modificado): se detecta comprobando si alguna pieza enemiga puede alcanzar la casilla del rey; un movimiento es legal solo si, tras jugarlo, el propio rey no queda en jaque.
- **IA**: tres niveles de dificultad.
  - *Fácil*: movimiento mayoritariamente aleatorio, con preferencia por capturas.
  - *Normal*: elige el movimiento que maximiza la ganancia de material inmediata.
  - *Difícil*: búsqueda minimax a 2 jugadas con poda alfa-beta y una función de evaluación por material más un pequeño incentivo posicional hacia el centro del tablero.
  - En Clásico/Modificado el valor del rey en la evaluación es extremadamente alto (perderlo equivale a jaque mate); en Eliminación tiene un valor moderado, como una pieza más algo valiosa por su movilidad.
- **Piezas amenazadas**: se calcula, para cada pieza del tablero, si alguna pieza enemiga podría capturarla en su próximo movimiento (ataque pseudo-legal, sin comprobar si esa captura dejaría al atacante en jaque).

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Mismo lenguaje visual que el resto de la suite de herramientas (`DevTools Hub`): misma paleta de color, tipografías (`Inter` + `IBM Plex Mono`), pestañas/controles segmentados y tarjetas.
- Piezas representadas con los glifos Unicode de ajedrez (♔♕♖♗♘♙ / ♚♛♜♝♞♟), sin imágenes externas.
- El motor de reglas, la colocación automática/manual y la IA se probaron de forma aislada (fuera del DOM, en Node) antes de integrarse: generación de movimientos por tipo de pieza, jaque/clavadas/jaque mate/ahogado, recorte y colocación de composiciones (incluidas más de 20 piezas o varios reyes en un tablero pequeño), horquillas para el resaltado de amenazas, y la elección de movimiento de la IA en los tres niveles.

## Limitaciones a tener en cuenta

- No hay enroque ni captura al paso en ningún modo de reglas.
- La colocación manual no valida posiciones "raras" como dejar un peón en su propia fila de promoción (quedaría inmóvil, ya que nunca podría avanzar) ni impide mezclar piezas de ambos colores en cualquier zona del tablero.
- La partida no se guarda: al recargar la página se pierde el progreso y hay que volver a configurar (o jugar) desde cero.
- El "Difícil" de la IA busca solo 2 jugadas por adelantado; en tableros grandes con muchas piezas puede tardar una fracción de segundo más en responder, pero sigue siendo prácticamente instantáneo.
- El resaltado de "piezas amenazadas" es pseudo-legal: no comprueba si la propia pieza atacante quedaría en jaque al realizar esa captura, así que en Clásico/Modificado puede señalar, en casos muy puntuales, una amenaza que en la práctica no se podría ejecutar por estar esa pieza clavada.
- En Eliminación, con varios reyes por bando, no existe ningún concepto de "jaque": los reyes se comportan exactamente como cualquier otra pieza, tanto para el jugador como para la IA.
