# buckshot::roulette

Versión web de un solo archivo (`index.html`) del juego *Buckshot Roulette*: un duelo por turnos contra la CPU con una escopeta cargada con balas verdaderas y de fogueo, en la que hay que decidir si disparar al rival o arriesgarse a dispararse a uno mismo, apoyándose en objetos que dan información o ventaja. Explícitamente porteado desde una versión original en Java Swing (según el propio código).

## Qué hace

- **Configuración aleatoria de cada partida** (`nuevoJuego`): vidas por jugador (entre 2 y 6, iguales para ambos), número total de balas de la escopeta (entre 1 y 8) y cuántas de ellas son verdaderas (al menos 1, y no todas), más entre 2 y 4 objetos repartidos a cada jugador al empezar.
- **Escopeta como cola de balas**: se genera un array de balas `{ real: true/false }` mezclado al azar (`crearBalas` + `shuffle`); disparar (`disparar`) saca la primera bala de la cola. Cuando se acaban, se recarga automáticamente con una nueva combinación aleatoria de balas y se reparten objetos nuevos.
- **Elección de objetivo al disparar**: al pulsar "Disparar" aparecen dos opciones, "Dispara a ti mismo" o "Dispara a la CPU" (con un botón de cancelar); disparar al rival siempre termina el turno (acierte o falle), mientras que dispararse a uno mismo y fallar (bala de fogueo) permite seguir jugando en el mismo turno.
- **9 objetos** utilizables antes o en vez de disparar, cada uno con su emoji, nombre y descripción (tooltip): cigarros (cura 1 vida), cerveza (expulsa la bala actual sin dispararla), cuchillo (el próximo disparo hace doble daño), lupa (revela la bala actual), inversor (invierte la polaridad de la bala actual), pastilla (50% cura, 50% daña 1 vida), robador (permite robar y usar un objeto de la CPU), teléfono (revela la polaridad de una bala futura al azar) y esposas (inmoviliza al rival durante su siguiente turno). Usar un objeto no consume el turno.
- **Cuadrícula de objetos** (hasta 8 huecos por jugador) que se deshabilita cuando no corresponde usarla (por ejemplo, la partida ha terminado, o no toca robar), y resalta visualmente los objetos de la CPU que se pueden robar mientras el efecto "robador" está activo.
- **IA de la CPU** (`cpuTurnStep`): en cada paso de su turno elige al azar entre dispararse a sí misma, dispararte a ti, o usar uno de sus objetos al azar; si se dispara a sí misma y falla, repite turno; si te dispara a ti (acierte o falle), termina su turno. El bucle de turno de la CPU (`turnoCPU`) sigue encadenando pasos mientras la elección sea "seguir jugando" (fallo al dispararse a sí misma) y no haya terminado la ronda.
- **Esposas**: si un jugador queda esposado, se salta por completo su siguiente turno (se consume el estado y se avisa en el registro).
- **Doble daño con cuchillo**: el efecto se marca (`cuchilloUsado`) y se aplica al *siguiente* disparo que impacte (bala real), tanto si lo hace el jugador como la CPU, reparando la escopeta después de aplicarse.
- **Registro de eventos** (`log-panel`): historial de toda la partida en texto (balas cargadas, objetos recibidos/usados, disparos, esposas, recargas…), donde el último mensaje se resalta y se hace scroll automático al añadir uno nuevo.
- **Fin de ronda automático** (`checkEndOfRound`): comprueba tras cada acción si algún jugador se quedó sin vidas (fin de partida, con overlay de victoria/derrota y opción de jugar de nuevo) o si la escopeta se quedó sin balas (recarga automática con nuevas balas y objetos).
- **Notas del propio código sobre el port**: dos efectos de objeto de la CPU (lupa y teléfono) se comentan explícitamente como corrección de un bug del Java original, donde a esos objetos les faltaba un `break` y acababan ejecutando también el efecto de otro objeto (invertir polaridad / esposar) sin que correspondiera.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step, sin backend: toda la partida vive en memoria del navegador y se pierde al recargar la página).
- Estado del juego centralizado en un único objeto `S` (vidas, escopeta, objetos, esposas, bandera de fin de partida), con un `render()` que vuelca ese estado a la interfaz en cada cambio.
- Overlay modal genérico y reutilizable (`showOverlay`/`hideOverlay`) para los mensajes de fin de partida, con botones configurables por llamada.
- Tipografías Inter (UI) e IBM Plex Mono (logo, título del panel de escopeta, contador de balas).

## Limitaciones a tener en cuenta

- No hay persistencia ni historial entre partidas: cada partida nueva reinicia el estado por completo.
- La IA de la CPU es puramente aleatoria (no evalúa probabilidades de bala real/falsa ni usa objetos de forma "inteligente" según lo que sabe).
