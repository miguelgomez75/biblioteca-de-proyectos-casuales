# DevTools Hub — Navaja suiza de formato y utilidades

Página de una sola vista (`index.html`) con cinco utilidades para desarrolladores independientes en pestañas: **JSON**, **Contraseñas & Hash**, **Conversor de texto**, **Cifrados** y **Regex**. Todo se ejecuta en el navegador: no hay backend, no hay peticiones de red y no se envía ningún dato a ningún servidor.

## Qué hace

### Pestaña "JSON"
- **Formatear / Validar**: parsea el JSON introducido y lo vuelve a serializar con la indentación elegida (2 espacios, 4 espacios o tabulación), mostrando un resaltado de sintaxis por tipo de token (claves, strings, números, booleanos, `null`).
- **Minificar**: serializa el JSON sin espacios y muestra el porcentaje de reducción de tamaño respecto al original.
- **Detección de errores legible**: si el JSON no es válido, localiza la línea y columna del error (a partir de la posición que reporta `JSON.parse` o del mensaje de motor), traduce el mensaje nativo a una frase en español más clara, y selecciona automáticamente el carácter problemático en el textarea.
- **Barra de estado**: muestra línea/columna del cursor y el recuento de caracteres en tiempo real.
- Atajo de teclado `Ctrl/Cmd + Enter` para formatear sin usar el ratón.
- Botones para copiar el resultado al portapapeles y para limpiar la entrada.
- Si el resultado supera un umbral de tamaño (250.000 caracteres), se omite el resaltado de sintaxis por rendimiento y se muestra como texto plano.

### Pestaña "Contraseñas & Hash"
- **Generador de contraseñas** configurable por tipo de carácter (minúsculas, mayúsculas, números, símbolos) y con opción de excluir caracteres ambiguos (`l`, `I`, `1`, `O`, `0`).
- Longitud ajustable de 4 a 128 caracteres mediante control deslizante o campo numérico.
- Generación con `crypto.getRandomValues` (no `Math.random`), garantizando al menos un carácter de cada tipo seleccionado y barajando el resultado con Fisher-Yates.
- **Medidor de fortaleza** que calcula la entropía en bits (`longitud × log2(tamaño del alfabeto)`) y la clasifica como Débil / Media / Fuerte.
- **Generador de hashes** en tiempo real (con debounce) sobre cualquier texto introducido:
  - **MD5**: implementado desde cero en JavaScript (sin librerías externas).
  - **SHA-256**: calculado con la Web Crypto API (`crypto.subtle.digest`).
- Botones de copiar independientes para la contraseña y para cada hash.

### Pestaña "Conversor de texto"
- Convierte cualquier texto introducido a cinco formatos de nomenclatura de código en tiempo real: **camelCase**, **PascalCase**, **snake_case**, **kebab-case** y **CONST_CASE**, detectando separadores existentes (espacios, guiones, guiones bajos, puntos) y límites de palabra en `camelCase`/`PascalCase` ya existentes.
- **Base64**: codifica el texto introducido y, por separado, intenta decodificarlo como Base64, avisando si la entrada no es válida.

### Pestaña "Cifrados"
- **Cifrado César**: cifra o descifra desplazando letras (preservando mayúsculas/minúsculas y dejando intactos los caracteres no alfabéticos), con desplazamiento configurable de 1 a 25.
- **Binario**: convierte texto a su representación binaria UTF-8 (bytes de 8 bits separados por espacio) y viceversa, validando que la entrada binaria solo contenga `0`/`1` en grupos de hasta 8 bits y que los bytes resultantes formen UTF-8 válido.
- **Morse**: convierte texto a código Morse (letras, dígitos y signos de puntuación comunes) y viceversa, usando `/` como separador de palabras.
- Cada herramienta tiene su propio botón de copiar que se habilita solo cuando hay un resultado válido.

### Pestaña "Regex"
- **Probador de expresiones regulares** en tiempo real: introduce un patrón, activa los flags que necesites (`g` global, `i` sin distinguir mayúsculas, `m` multilínea, `s` `.` incluye saltos de línea, `u` unicode) y pega un texto de prueba.
- **Resaltado de coincidencias** directamente sobre el texto de prueba, y **listado de coincidencias** con su posición y el contenido de cada grupo de captura (numerados y con nombre).
- Si el patrón no es una expresión regular válida, muestra un aviso de error con el mensaje del motor.
- **Reemplazar**: aplica `String.replace` con el patrón y un texto de sustitución que admite referencias a grupos (`$1`, `$2`, `$<nombre>`).
- Límite de 2.000 coincidencias mostradas para evitar bloquear la interfaz con textos muy grandes.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Interfaz por pestañas simple (mostrar/ocultar con clases), sin router.
- Fuente tipográfica vía Google Fonts (`Inter` para la interfaz, `IBM Plex Mono` para código/datos monoespaciados); esta es la única petición de red que hace la página.
- Criptografía nativa del navegador: `crypto.getRandomValues` para la generación de contraseñas y `crypto.subtle.digest` para SHA-256; MD5 está implementado manualmente porque no existe de forma nativa en la Web Crypto API.

## Limitaciones a tener en cuenta

- No hay persistencia: todo el estado (texto introducido, contraseñas y hashes generados, historial de regex) vive solo en memoria mientras la pestaña está abierta; al recargar la página se pierde.
- El resaltado de sintaxis del JSON se desactiva en resultados muy grandes (>250.000 caracteres) para no bloquear el navegador.
- El probador de regex limita la lista de coincidencias mostradas a 2.000, aunque puede haber más en el texto.
- La implementación de MD5 es propia y no ha sido auditada como librería criptográfica de producción; se ofrece únicamente como utilidad de hash rápida, no para casos que requieran garantías de seguridad.
- El copiado al portapapeles depende de `navigator.clipboard`; en contextos no seguros (HTTP sin TLS) o navegadores muy antiguos recurre a un método de respaldo (`textarea` temporal + `execCommand('copy')`).
