# cryptic::builder — Creador y Editor de Puzles Cryptic Clues

## 1. Descripción

**cryptic::builder** es una herramienta web ligera y autónoma para la creación, edición, organización y exportación de pistas criptográficas (*cryptic clues*). Genera y manipula estructuras de datos en formato JSON compatibles con visores e intérpretes de *cryptic crosswords*.

Permite resaltar la sintaxis de las pistas (identificando definición, *fodder* e indicador), validar la estructura de la pista, calcular enumeraciones automáticas y reordenar o mover pistas tanto individualmente como en lote.

---

## 2. Requisitos y Características Técnicas

El procesamiento y la manipulación del JSON se realizan **100% en el cliente (navegador)** sin dependencias externas ni servidor backend.

| Característica | Detalle |
| :--- | :--- |
| **Tecnologías** | HTML5, CSS3, JavaScript (ES6 Native) |
| **Fuentes tipográficas** | IBM Plex Mono, Inter (vía Google Fonts) |
| **Formato de Salida** | JSON (`puzzles.json`) |
| **Compatibilidad** | Cualquier navegador moderno con soporte para Web Storage / Clipboard API |

---

## 3. Estructura de Datos (Esquema JSON)

Cada pista (*clue*) procesada por la aplicación sigue un esquema estándar como el siguiente:

```json
[
  {
    "clue": "Be quiet — anagram of listen (6)",
    "answer": "SILENT",
    "fodder": ["listen"],
    "indicator": ["anagram of"],
    "definition": ["Be quiet"],
    "explanation": "LISTEN → SILENT",
    "name": "17-Mi clue",
    "category": "September",
    "group": "Dailys 2026"
  }
]
```

### Tabla de Campos

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :---: | :--- |
| `clue` | `String` | Sí | Texto completo de la pista, incluyendo la enumeración final entre paréntesis. |
| `answer` | `String` | Sí | Solución o respuesta final en mayúsculas. |
| `definition` | `Array<String>` | Sí | Fragmento(s) del texto que definen directamente la solución. |
| `fodder` | `Array<String>` | Opcional | Letras o palabras base sobre las que opera el anagrama u otro mecanismo criptográfico. |
| `indicator` | `Array<String>` | Opcional | Palabras que indican el tipo de juego criptográfico (p. ej., "anagram of", "hidden in"). |
| `explanation` | `String` | Opcional | Explicación textual del razonamiento para resolver la pista. |
| `name` | `String` | Opcional | Identificador o número de referencia de la pista dentro del conjunto. |
| `category` | `String` | Opcional | Categoría o mes de la pista (cuenta con autocompletado automático). |
| `group` | `String` | Opcional | Agrupación secundaria o volumen (cuenta con autocompletado automático). |

---

## 4. Instrucciones de Uso

### Paso 1: Cargar o Importar Datos Existententes

1. Abre `cryptic builder.html` en un navegador web.
2. Si ya posees un archivo `puzzles.json`:
   - Haz clic en **"Importar puzzles.json"** en el panel superior.
   - Selecciona el archivo para cargar las pistas en el listado.

---

### Paso 2: Crear o Editar una Pista (*Clue*)

1. **Escribir el Clue y Answer**:
   - Introduce el texto de la pista en el campo **Clue**.
   - Introduce la solución en el campo **Answer**.
2. **Generar Enumeración Automática**:
   - Haz clic en el botón **"+ (enum)"** para calcular y añadir automáticamente la enumeración de la solución al final del *clue* (ej. `SILENT` $\rightarrow$ `(6)`).
3. **Asignación de Sintaxis y Resaltado**:
   - Selecciona texto directamente en el área de texto del *clue* con el ratón.
   - Presiona el botón correspondiente: **Definición** (azul), **Fodder** (rosa) o **Indicador** (verde).
   - *Alternativa*: Puedes añadir manualmente fragmentos utilizando los campos individuales ubicados debajo de la vista previa.
4. **Metadatos y Organización**:
   - Completa opcionalmente los campos `Explanation`, `Name`, `Category` y `Group`.
   - Activa/desactiva la opción **"mantener category/group al guardar"** según necesites agilizar la entrada rápida de datos pertenecientes al mismo grupo.
5. **Guardar Pista**:
   - Haz clic en **"Añadir clue"** (o **"Guardar cambios"** si estás editando).

---

### Paso 3: Organización y Reordenación de Pistas

La aplicación permite reordenar el listado de pistas de dos formas:

#### Reordenación Individual
En cada elemento del listado puedes usar los siguientes botones:
- `↑` / `↓`: Mueve la pista una posición arriba o abajo.
- `#`: Permite ingresar un número de posición específico para reubicar la pista directamente.
- **Editar**: Carga la pista en el formulario superior para modificarla.
- **Duplicar**: Crea una copia exacta inmediatamente debajo de la pista actual.
- `×`: Elimina la pista de la lista.

#### Reordenación en Bloque (*Bulk Move*)
1. Selecciona las casillas de verificación de las pistas que desees mover.
2. Aparecerá la barra superior de acciones masivas indicando la cantidad de elementos seleccionados.
3. Especifica la posición destino (1-based) en el cuadro **"Mover a la posición"**.
4. Haz clic en **"Mover"**. Las pistas seleccionadas se trasladarán conservando su orden relativo entre sí.

---

### Paso 4: Exportación y Salida de Datos

- **Descargar JSON**: Haz clic en **"Descargar JSON"** para descargar un archivo `puzzles.json` listo para producción.
- **Copiar al Portapapeles**: Haz clic en **"Copiar al portapapeles"** para enviar la estructura JSON directamente a tu portapapeles.
- **Vista Previa del JSON**: La caja de texto final muestra la salida formateada en tiempo real.

---

## 5. Validaciones y Advertencias Automáticas

La herramienta incluye un motor de alertas en tiempo real que notificará los siguientes inconsistencias:

- **Falta de enumeración**: Si el *clue* no finaliza con una sintaxis del tipo `(N)` o `(N, M)`.
- **Incoincidencia en la enumeración**: Si la longitud indicada en el *clue* difiere de la calculada a partir del `answer`.
- **Sin definición**: Si no se ha asignado ningún fragmento como definición.
- **Texto desaparecido**: Si un fragmento asignado a *definition*, *fodder* o *indicator* no existe exactamente dentro del texto del *clue*.

---

## 6. Estructura del Proyecto

```text
cryptic-builder/
├── cryptic builder.html  # Aplicación monocapa ejecutable (HTML, CSS, JS)
└── README.md             # Documentación técnica y de usuario
```