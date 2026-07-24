# word::hub — Anagram Solver & Dictionary

Página de una sola vista (`index.html`) con dos utilidades lingüísticas independientes en pestañas: un **buscador de anagramas** (inglés/español) y un **buscador de definiciones**. Sin backend propio: los diccionarios y las definiciones se descargan directamente desde APIs y repositorios públicos.

## Qué hace

### Pestaña "Anagramas"
- **Selector de idioma** (EN/ES) que determina qué lista de palabras se usa para buscar.
- **Descarga del diccionario bajo demanda**: la primera vez que se busca en un idioma, descarga la lista completa de palabras correspondiente (ver tabla de fuentes más abajo) y la cachea en memoria (variable `dicts`) para no volver a descargarla en esa misma sesión; mientras tanto muestra un estado "Descargando diccionario…" con spinner, y si dos búsquedas piden el mismo diccionario a la vez, la segunda espera a que termine la primera en lugar de duplicar la descarga.
- **Normalización de acentos**: al procesar el diccionario y las letras introducidas, quita tildes/diéresis (á→a, ü→u, etc.) para que coincidan aunque el usuario no escriba acentos; la letra `ñ` se conserva.
- **Búsqueda de anagramas exactos**: dado un conjunto de letras y una longitud, encuentra todas las palabras del diccionario que:
  1. tienen exactamente esa longitud (tras normalizar), y
  2. se pueden formar usando solo las letras disponibles, sin repetir más veces de las que aparecen en la entrada (comprobación de "bolsa de letras" con conteo de caracteres, `canForm`/`countChars`).
- **Pastillas de letras** (`pills-row`) que muestran visualmente las letras introducidas tal como se interpretaron.
- **Resultados** en forma de "pills" clicables, con contador de coincidencias y un desplegable para ordenar A→Z o Z→A.
- **Integración con la pestaña de diccionario**: al hacer clic en cualquier palabra encontrada, cambia automáticamente a la pestaña "Diccionario", rellena el campo de búsqueda con esa palabra y busca su definición.

### Pestaña "Diccionario"
- **Selector de idioma** (EN/ES) independiente del de la pestaña de anagramas.
- **Definiciones en inglés**: usa la [Free Dictionary API](https://dictionaryapi.dev/) (`api.dictionaryapi.dev`); muestra la palabra, su transcripción fonética (si existe) y, por cada categoría gramatical, hasta 3 definiciones con su ejemplo de uso cuando está disponible.
- **Definiciones en español**: usa la API de MediaWiki de Wiktionary en español (`es.wiktionary.org/w/api.php`, con `origin=*` para evitar problemas de CORS desde el navegador) pidiendo el extracto de texto plano del artículo; filtra los títulos de sección (líneas que empiezan por `=`) y muestra hasta 4 líneas como "acepciones".
- Si la palabra no existe en la fuente correspondiente (o la petición falla), muestra un aviso de "No se encontró definición…" sin romper la interfaz.

## Fuentes de datos externas

| Uso | Fuente | Notas |
|---|---|---|
| Diccionario de anagramas (inglés) | `raw.githubusercontent.com/dolph/dictionary` (`enable1.txt`) | Lista de texto plano, una palabra por línea (~172k palabras). |
| Diccionario de anagramas (español) | `raw.githubusercontent.com/words/an-array-of-spanish-words` (`index.json`) | Array JSON de palabras (~636k palabras). |
| Definiciones en inglés | Free Dictionary API (`api.dictionaryapi.dev`) | Pública, sin API key. |
| Definiciones en español | Wiktionary en español vía API de MediaWiki | Pública, sin API key; usa `origin=*` para CORS. |

Al cargar cualquiera de los dos diccionarios de anagramas, cada palabra se filtra para quedarse solo con las que contienen exclusivamente letras (incluyendo vocales acentuadas y `ñ`/`ü`), descartando números, símbolos o líneas vacías.

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Interfaz por pestañas simple (mostrar/ocultar con clases), sin router.
- Todas las peticiones de red son directas desde el navegador a servicios públicos (GitHub raw, Free Dictionary API, Wiktionary); no hay servidor intermedio ni claves de API que configurar.

## Limitaciones a tener en cuenta

- La búsqueda de anagramas es de **coincidencia exacta de longitud y letras disponibles** (no anagramas parciales ni comodines).
- El diccionario descargado se cachea solo en memoria mientras la pestaña esté abierta: al recargar la página, se vuelve a descargar.
- Las definiciones dependen de servicios externos gratuitos; si alguno cambia su API o limita las peticiones, esa parte dejaría de funcionar hasta actualizar la URL correspondiente en el código.
