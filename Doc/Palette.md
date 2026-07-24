# palette::hub

Generador de paletas de color armónicas y comprobador de contraste conforme a las pautas de accesibilidad WCAG en una sola página (`index.html`). Pensado para diseñadores y desarrolladores que necesitan extraer colores, exportar variables CSS o verificar la accesibilidad de sus interfaces **sin enviar datos a ningún servidor**: todo el cálculo ocurre localmente en el propio navegador.

## Qué hace

- **Generación de paletas armónicas**: crea combinaciones de 5 colores basándose en algoritmos de teoría del color (armónicas Análoga, Complementaria, Monocromática, Triádica y Dividida) utilizando el espacio de color HSL.
- **Bloqueo individual de colores**: permite "fijar" (🔒) uno o varios colores de la paleta mediante un icono de candado. Al pulsar "🎲 Generar paleta", solo se recalculan los colores desbloqueados tomando como referencia el tono base del color fijado.
- **Copia rápida de formatos**: al hacer clic sobre cualquier valor (`HEX`, `RGB` o `HSL`) de una tarjeta de color, el código se copia automáticamente al portapapeles con una confirmación visual instantánea (`✓ copiado`).
- **Exportación automática a CSS**: genera en tiempo real un bloque de código con variables CSS (`:root { --color-1: ...; }`) listo para copiar y pegar directamente en las hojas de estilo del proyecto.
- **Comprobador de contraste WCAG (2.1)**: evalúa la relación de contraste exacta entre un color de texto y un color de fondo.
  - Permite ingresar códigos HEX manualmente o seleccionarlos mediante un selector de color interactivo (`<input type="color">`).
  - Muestra una vista previa del texto en tiempo real sobre el fondo seleccionado.
  - Ofrece una paleta en miniatura (*mini-dots*) para probar rápidamente el contraste entre los 5 colores generados actualmente sin tener que copiar y pegar sus códigos HEX.
- **Matriz de cumplimiento de accesibilidad**: calcula el *ratio* de contraste (ej. `21.00 : 1`) y evalúa automáticamente si la combinación supera los niveles **AA** y **AAA** del estándar WCAG, tanto para texto normal como para texto grande.

## Cómo funciona la generación y el contraste

1. **Generación de la armónica**:
   - Se selecciona una tonalidad base (aleatoria o heredada del primer color bloqueado).
   - El motor asigna los tonos de los 5 *swatches* aplicando desplazamientos angulares (*hue shifts*) según el esquema activo (por ejemplo, $+180^\circ$ para el complementario o $\pm 30^\circ, \pm 60^\circ$ para el análogo), aplicando una pequeña variación (*jitter*) para dar mayor riqueza cromática.
2. **Conversión de espacios de color**:
   - Convierte internamente de **HSL** a **RGB** y a **HEX** para garantizar una renderización uniforme y precisa de las tarjetas y el código CSS exportable.
3. **Cálculo de luminancia y contraste**:
   - Se determina la luminancia relativa de los colores elegidos en el comprobador de contraste ajustando las componentes RGB según la fórmula estándar de la W3C.
   - Aplica la fórmula del ratio de contraste $((L_1 + 0.05) / (L_2 + 0.05))$ para clasificar si la lectura es apta (*Cumple ✓*) o insuficiente (*No cumple ✕*) en los 4 umbrales de la normativa WCAG.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks, dependencias externas ni paso de compilación/build step).
- **Clipboard API** (`navigator.clipboard.writeText`) para copiar los códigos de color y las variables CSS con *fallback* a execCommand para navegadores más antiguos.
- **Cálculos matemáticos de color puros**: funciones internas en JS para conversiones de color (`HSL ↔ RGB ↔ HEX`) y cálculo de luminancia sintética sin librerías de terceros.
- Tipografías Inter (UI) e IBM Plex Mono (códigos de color, variables CSS, resultados WCAG).

## Limitaciones a tener en cuenta

- Las paletas generadas **no se persisten** entre recargas de la página: si obtienes una paleta que te gusta, asegúrate de copiar sus variables CSS o bloquear los valores antes de refrescar la pestaña.
- El cálculo del contraste WCAG utiliza el espacio de color estándar sRGB.
- Para el nivel **AAA · normal**, la WCAG exige un ratio mínimo de 7:1, lo cual puede ser exigente con tonos medios o muy saturados (el sistema indicará "No cumple" de forma estricta según la norma).
