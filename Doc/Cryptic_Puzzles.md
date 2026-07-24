# Cryptic

Juego de una sola página (`index.html`) para practicar **crucigramas crípticos** (cryptic crossword clues) al estilo británico. Sin backend: toda la lógica vive en JavaScript, y los puzzles se cargan desde un archivo `puzzles.json` situado junto al `index.html`.

## Qué hace

- **Carga los puzzles desde `puzzles.json`** (mismo directorio) y, si el archivo no existe o falla la carga, usa un pequeño set de 4 puzzles de ejemplo integrado en el propio código (`FALLBACK`) para que el juego nunca se quede vacío.
- **Tolera JSON "a mano"**: antes de parsear, elimina comas finales sobrantes (`,]` o `,}`) para que un `puzzles.json` editado manualmente no rompa la página por una coma de más.
- **Muestra la pista (clue) con resaltado por capas**: cada pista puede tener partes marcadas como *fodder* (letras a reordenar/usar), *indicador* (la palabra que dice qué truco aplica: anagrama, homófono, palabra escondida, etc.) y *definición* (el significado real de la respuesta). Estas partes se subrayan con colores distintos superpuestos cuando el jugador pide la pista correspondiente.
- **Casillas de letras** (`letter-boxes`) que muestran guiones bajos por cada letra de la respuesta (respetando espacios como huecos), y se van revelando letra a letra o se marcan en verde al acertar.
- **Sistema de pistas** con 4 botones:
  - *Fodder*: resalta en la pista el fragmento de texto que se usa como materia prima.
  - *Indicator*: resalta la palabra/frase que indica el tipo de truco.
  - *Definition*: resalta la definición literal de la respuesta.
  - *Letter*: revela una letra aleatoria no revelada todavía (contador `Letter (x/y)`), y se desactiva sola cuando ya no quedan letras por revelar.
  - Los botones de *Fodder* e *Indicator* se desactivan automáticamente si el puzzle no define contenido para esos campos.
- **Comprobación de respuesta**: compara el texto introducido (normalizado a mayúsculas y espacios simples) contra la respuesta; si falla, marca el campo en rojo y muestra "✗ not quite — try again" durante 1.2s; si acierta, revela todas las capas de la pista, pone todas las casillas en verde y muestra un cuadro de **explicación** con el texto de `explanation`.
- **Botón "Next puzzle"**: tras resolver un puzzle, salta a otro elegido al azar entre todos los cargados.
- **Panel lateral de navegación** (☰) con:
  - Buscador de puzzles por nombre, respuesta, categoría, grupo o texto de la pista.
  - Estructura en dos niveles: **grupos** (opcional, campo `group`) que contienen **categorías** (campo `category`, por defecto "Other"), y dentro de cada categoría, botones individuales por puzzle.
  - Grupos y categorías se pliegan/despliegan, y se auto-expanden para mostrar el puzzle activo cuando se carga uno.
  - Al elegir un puzzle del panel se carga directamente ese, en vez de uno aleatorio.

## Formato de `puzzles.json`

Un array de objetos con esta forma:

```json
[
  {
    "clue": "Be quiet — anagram of listen (6)",
    "answer": "SILENT",
    "fodder": ["listen"],
    "indicator": ["anagram of"],
    "definition": ["Be quiet"],
    "explanation": "Anagram indicator: 'anagram of'. Rearrange LISTEN → SILENT, meaning 'be quiet'.",
    "name": "Anagram",
    "category": "Claude examples"
  },
  ...
]
```

Campos que usa el código:

| Campo | Tipo | Obligatorio | Uso |
|---|---|---|---|
| `clue` | string | sí | Texto de la pista mostrado al jugador. Si falta (junto con `answer`), el puzzle se descarta al cargar. |
| `answer` | string | sí | Respuesta correcta. Puede incluir espacios (se muestran como huecos entre casillas). |
| `fodder` | string[] | no | Fragmento(s) de texto dentro de `clue` que se resaltan como "materia prima" al usar la pista *Fodder*. Si está vacío, el botón *Fodder* aparece desactivado. |
| `indicator` | string[] | no | Fragmento(s) de texto que indican el tipo de truco (anagrama, homófono, palabra oculta…). Si está vacío, el botón *Indicator* aparece desactivado. |
| `definition` | string[] | no | Fragmento(s) que son la definición literal de la respuesta. |
| `explanation` | string | no | Texto que se muestra al resolver el puzzle, explicando el truco usado. |
| `name` | string | no | Nombre corto del puzzle mostrado en el panel de navegación (si falta, se usa `answer`, o "Puzzle N" como último recurso). |
| `category` | string | no | Subcategoría para agrupar puzzles en el panel lateral (por defecto "Other"). |
| `group` | string | no | Agrupación de nivel superior, opcional (por ejemplo, para separar bloques temáticos grandes); si no se indica, la categoría aparece directamente en el nivel superior del panel. |

Notas sobre `fodder`/`indicator`/`definition`: el código busca ese texto dentro de `clue` primero de forma literal y, si no lo encuentra exacto, con una búsqueda flexible en espacios (por si hay saltos de línea o espacios múltiples). Si el texto no aparece de ninguna forma en `clue`, esa pista simplemente no resalta nada (sin error).

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Resaltado de texto mediante capas de `background-image`/`background-position` superpuestas (subrayados de distintos colores en la misma palabra según cuántas pistas se hayan usado sobre ella).
- Tipografías Inter (UI), IBM Plex Mono (casillas y etiquetas) y Lora en cursiva (texto de la pista y de la explicación), dando un aire "de imprenta" a las pistas, típico de los crucigramas impresos.

## Cómo añadir puzzles nuevos

Basta con añadir objetos al array de `puzzles.json` siguiendo el formato de la tabla anterior. No hace falta tocar el `index.html`: los campos `group`/`category` nuevos aparecerán automáticamente como nuevas secciones en el panel lateral de navegación.
