# calc::hub — Calculadora normal y de programador

Página de una sola vista (`index.html`) con dos calculadoras independientes en pestañas: una **calculadora normal** (aritmética básica) y una **calculadora de programador** (bases numéricas, operaciones bit a bit y módulo). Sin backend ni peticiones de red: todo el cálculo ocurre en el navegador.

## Qué hace

### Pestaña "Normal"
- Calculadora estándar con **suma, resta, multiplicación y división**, encadenable (permite pulsar varios operadores seguidos sin pulsar `=` cada vez, calculando el resultado parcial antes de aplicar el siguiente).
- **Historial de la operación en curso** sobre el resultado (p. ej. `12 + 5`), y expresión completa con `=` al obtener el resultado.
- **Porcentaje (%)**: si hay una operación pendiente, calcula el porcentaje sobre el primer operando (p. ej. `200 + 10% ` → suma 20); si no hay operación pendiente, convierte el número actual a su valor entre 100.
- **Cambiar signo (±)**, **borrar todo (AC)**, **borrar la entrada actual (CE)** y **retroceso (⌫)**.
- **División entre cero controlada**: en lugar de mostrar `Infinity` o `NaN`, muestra un mensaje de error y reinicia la calculadora al pulsar cualquier tecla.
- Números muy largos se muestran en notación científica para no desbordar la pantalla.
- **Soporte de teclado**: dígitos, `+ - * /`, `.`, `%`, `Enter`/`=`, `Backspace` y `Escape` (borrar todo).

### Pestaña "Programador"
- **Cuatro filas siempre visibles y sincronizadas** con el valor actual: **HEX, DEC, OCT y BIN**. Al hacer clic en cualquiera de ellas, esa pasa a ser la base activa para la siguiente entrada por teclado (se resalta con el color de acento), y el valor ya introducido se reinterpreta automáticamente en la nueva base sin perderse.
- **DEC se muestra en complemento a dos** según el ancho de bits seleccionado (p. ej. con todos los bits a 1 en 8 bits, HEX/OCT/BIN muestran el patrón de bits sin signo y DEC muestra `-1`), tal como lo haría una calculadora de programador convencional.
- **Selector de ancho de bits**: 8, 16, 32 o 64 bits. Cambiarlo vuelve a enmascarar el valor actual a ese ancho y reinicia la calculadora (para evitar arrastrar un valor calculado con un ancho distinto).
- **Teclado hexadecimal (A–F)** y numérico (0–9) con **deshabilitado automático de los dígitos que no son válidos en la base activa** (por ejemplo, en binario solo `0` y `1` están habilitados; en octal, del `0` al `7`).
- **Operaciones aritméticas**: `+ − × ÷` (división entera, truncada hacia cero) y **`MOD`** (resto de la división entera).
- **Operaciones bit a bit**: `AND`, `OR`, `XOR`, `NOT` (unaria, se aplica de inmediato al valor actual) y desplazamientos `<<` / `>>` (el número de posiciones a desplazar se introduce como segundo operando, igual que en las demás operaciones binarias, y se reduce automáticamente al rango del ancho de bits seleccionado).
- Todas las operaciones (incluida la suma/resta) se calculan sobre el patrón de bits sin signo y se vuelven a enmascarar al ancho de bits activo, por lo que un desbordamiento se comporta como en aritmética de enteros de ese tamaño (da la vuelta, "wraps"), igual que en una calculadora de programador real.
- **División y módulo entre cero controlados**: muestran un aviso de error en lugar de romper la interfaz o dejar el estado inconsistente.
- **Botón "Copiar"** independiente en cada fila (HEX/DEC/OCT/BIN) para copiar ese valor al portapapeles (sin los espacios de agrupación visual).
- Los valores hexadecimal y binario se muestran agrupados visualmente en bloques de 4 caracteres para facilitar la lectura (por ejemplo `1010 1100` en binario).
- **Soporte de teclado**: dígitos `0-9`, letras `A-F`, `+ - * /`, `Enter`/`=`, `Backspace` y `Escape` (borrar todo).

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Mismo lenguaje visual que el resto de la suite de herramientas (`DevTools Hub`): misma paleta de color, tipografías (`Inter` + `IBM Plex Mono`), pestañas, controles segmentados (`mode-toggle`) y filas de resultado con botón de copiar (`hash-row`).
- La calculadora de programador usa **`BigInt`** para representar el valor en curso (evita los límites e imprecisiones de los números de punto flotante de JavaScript al trabajar con 64 bits) y las funciones nativas **`BigInt.asUintN`** / **`BigInt.asIntN`** para el enmascarado sin signo y la interpretación en complemento a dos, respectivamente.
- La calculadora normal usa aritmética de punto flotante estándar de JavaScript, con redondeo a 10 decimales para evitar mostrar errores de precisión típicos de coma flotante (p. ej. `0.1 + 0.2`).

## Limitaciones a tener en cuenta

- No hay persistencia: el estado de ambas calculadoras (entrada actual, operación pendiente, historial) vive solo en memoria mientras la pestaña está abierta; al recargar la página se reinicia.
- La calculadora de programador no admite paréntesis ni una cola de operaciones más allá de "operando — operador — operando — operador…" encadenado, igual que la mayoría de calculadoras de programador sencillas.
- Los desplazamientos (`<<`, `>>`) toman el desplazamiento módulo el ancho de bits activo; un desplazamiento igual o mayor que el ancho de bits no se trata como error, sino que se reduce automáticamente a un valor dentro de rango.
- La calculadora normal no incluye funciones científicas (raíces, potencias, trigonometría); solo las cuatro operaciones básicas y porcentaje.
- Al cambiar el ancho de bits en la calculadora de programador se reinicia el cálculo en curso, para evitar mostrar un resultado calculado con un ancho de bits distinto al seleccionado.
