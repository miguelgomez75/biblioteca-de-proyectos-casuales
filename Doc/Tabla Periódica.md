# Tabla Periódica Interactiva (periodic::hub)

`periodic::hub` es una aplicación web interactiva diseñada para la exploración visual, filtrado analítico y consulta detallada de los 118 elementos químicos conocidos. Ofrece un diseño estructurado bajo las especificaciones de la IUPAC, mapeo dinámico del bloque $f$ (lantánidos y actínidos) y motores de búsqueda en tiempo real.

## 🚀 Características Principales

* **Mapa Estructural de la Tabla Periódica**:
  * Matriz interactiva de $18$ columnas y $7$ periodos para el bloque principal ($s$, $p$, $d$).
  * Separación adaptativa para el bloque $f$ (filas de lantánidos y actínidos) con conectores de referencia hacia los periodos 6 y 7.

* **Búsqueda y Filtrado Dinámico Multi-criterio**:
  * Motor de búsqueda en tiempo real capaz de evaluar consultas por número atómico ($Z$), símbolo químico o nombre.
  * Leyenda interactiva por categorías químicas que actúa como filtro combinatorio (alcalinos, alcalinotérreos, metales de transición, post-transicionales, metaloides, no metales, halógenos, gases nobles, lantánidos y actínidos).

* **Inspector Detallado de Elementos**:
  * Módulo desplegable con la información fundamental del elemento seleccionado: número atómico ($Z$), masa atómica estandarizada, grupo, periodo y estado de la materia a temperatura ambiente ($25 \text{ °C}$).

## 🛠️ Especificaciones Técnicas

* **Algoritmo de Mapeo Estructural y Coordenadas**:
  * Las posiciones $(\text{Grupo}, \text{Periodo})$ para cada elemento con número atómico $Z \in [1, 118]$ se calculan dinámicamente según las reglas del sistema periódico:

    * $Z = 1 \implies (1, 1)$, $Z = 2 \implies (18, 1)$.
    * Bloque $s$ y $p$ ($Z \in [3, 18]$): asignación de grupo mediante mapeo discreto $G = f(Z)$.
    * Bloque $d$ ($Z \in [19, 36]$, $[37, 54]$, $[72, 86]$, $[104, 118]$): asignación lineal de columna $G = Z - k$, donde $k$ es el desfase del periodo correspondiente.
    * Bloque $f$:
      * Lantánidos ($Z \in [57, 71]$): fila $1$ del bloque $f$, columna $C = Z - 57$.
      * Actínidos ($Z \in [89, 103]$): fila $2$ del bloque $f$, columna $C = Z - 89$.

* **Manejo de Estados de la Materia a $25 \text{ °C}$**:
  * La determinación del estado de aglomeración físico a temperatura ambiente se evalúa mediante estructuras de conjuntos explícitos ($O(1)$):
    * **Gases**: $S_{\text{gas}} = \{\text{H}, \text{He}, \text{N}, \text{O}, \text{F}, \text{Ne}, \text{Cl}, \text{Ar}, \text{Kr}, \text{Xe}, \text{Rn}, \text{Og}\}$.
    * **Líquidos**: $S_{\text{líq}} = \{\text{Br}, \text{Hg}\}$.
    * **Sólidos**: Todos los demás elementos $Z \notin (S_{\text{gas}} \cup S_{\text{líq}})$.

* **Estrategia de Filtrado Combinatorio**:
  * El estado de visibilidad de cada celda se define mediante la intersección lógica:

    $$
    V(e) = \big( \text{cat}(e) \in F_{\text{activocateg}} \big) \land \big( \text{match}(e, Q) \big)
    $$

    Donde $Q$ representa la cadena de texto ingresada en la barra de búsqueda y $\text{cat}(e)$ es la categoría del elemento.

* **Tecnologías**: HTML5, CSS Grid / Flexbox, CSS Custom Properties, JavaScript Vanilla (ES6+), DOM Manipulation API.

## 📂 Instrucciones de Uso

1. **Buscar un Elemento**: Utiliza la barra de búsqueda en la parte superior para ingresar un símbolo (ej. `Au`), un nombre (ej. `Oro`) o un número atómico (ej. `79`).
2. **Filtrar por Categoría**: Haz clic en cualquier categoría de la leyenda para ocultar o mostrar los elementos pertenecientes a ese grupo.
3. **Inspeccionar Ficha Técnica**: Haz clic sobre cualquier casilla de la tabla para visualizar su ficha extendida con la masa atómica, grupo, periodo y estado físico a temperatura ambiente.