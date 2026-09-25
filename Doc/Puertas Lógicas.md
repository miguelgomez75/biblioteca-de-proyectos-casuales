# Documentación Técnica: `logic::hub`

## 1. Visión General y Propósito del Sistema

**`logic::hub`** es un simulador interactivo de circuitos y puertas lógicas digitales de combinación y lógica secuencial básica. Formando parte de la suite **`::hub`**, la aplicación comparte una interfaz técnica en modo oscuro (*dark-mode*), tipografía dual (`IBM Plex Mono` e `Inter`) y una arquitectura ejecutable en un único archivo HTML (*Single-File Component*).

El motor de simulación opera en tiempo real mediante propagación topológica sobre una superficie vectorial SVG interactiva. Soporta conmutadores de entrada, generadores de reloj, indicadores LED, puertas lógicas fundamentales, multiplexores, y cuenta con un módulo de generación automática de tablas de verdad.

---

## 2. Arquitectura de Software y Modelo de Datos

La aplicación está construida desacoplando el estado del circuito de la capa de renderizado vectorial (SVG).

### 2.1. Dominio de Datos (Estado del Grafo)

El circuito se define como un grafo dirigido $G = (V, E)$:
* $V$: Conjunto de nodos o componentes del circuito.
* $E$: Conjunto de arcos o conexiones (*wires*) que transportan la señal lógica $s \in \{0, 1\}$.

#### Estructura de un Nodo (`node`)
```javascript
{
  id: "node_1",
  type: "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR" | "MUX" | "SWITCH" | "CLOCK" | "LED",
  x: 220,
  y: 70,
  width: 70,
  height: 60,
  inputs: [
    { id: "A", value: 0 },
    { id: "B", value: 0 }
  ],
  outputs: [
    { id: "OUT", value: 0 }
  ],
  state: {
    switchOn: false,
    label: "AND",
    lit: false
  }
}
```

#### Estructura de un Cable (`wire`)
```javascript
{
  id: "wire_1",
  fromNode: "node_1",
  fromPort: "OUT",
  toNode: "node_3",
  toPort: "A"
}
```

---

## 3. Motor de Simulación y Álgebra Booleana

### 3.1. Funciones Lógicas Implementadas

Cada tipo de nodo evalúa sus salidas $S$ basándose en los valores de entrada $(A, B, S_0)$:

| Tipo | Función Booleana | Descripción |
| :--- | :--- | :--- |
| **SWITCH** | $S = \text{state.switchOn}$ | Fuente de estado manual ($0$ o $1$). |
| **CLOCK** | $S = \lfloor t / 500\text{ms} \rfloor \bmod 2$ | Pulso periódico de reloj en tiempo real. |
| **LED** | $\text{lit} = (\text{IN} == 1)$ | Indicador gráfico de estado. |
| **NOT** | $S = \overline{A}$ | Inversión lógica. |
| **AND** | $S = A \cdot B$ | Conjunción. |
| **OR** | $S = A + B$ | Disyunción inclusiva. |
| **NAND** | $S = \overline{A \cdot B}$ | Conjunción negada. |
| **NOR** | $S = \overline{A + B}$ | Disyunción negada. |
| **XOR** | $S = A \oplus B$ | Disyunción exclusiva. |
| **XNOR** | $S = \overline{A \oplus B}$ | Equivalencia lógica. |
| **MUX 2:1** | $S = (\overline{S_0} \cdot A) + (S_0 \cdot B)$ | Selección de canal de entrada mediante $S_0$. |

### 3.2. Propagación y Bucle de Simulación

Para garantizar estabilidad en la propagación de señales y soportar realimentaciones (como en biestables o lazos), el método `evaluateCircuit()` ejecuta $N = 10$ pasadas de propagación topológica por iteración:

1. Transfiere los valores de los puertos de salida (`outputs`) a los puertos de entrada (`inputs`) mediante la lista de conexiones (`wires`).
2. Evalúa las funciones lógicas internas de cada nodo actualizando sus puertos de salida.
3. El bucle de renderizado se ejecuta sincronizado con el refresco de pantalla vía `requestAnimationFrame(simLoop)`.

---

## 4. Circuitos Prediseñados (Presets)

El sistema incluye 5 circuitos precargados para análisis inmediato:

1. **Sumador Medio (`half_adder`)**: Implementa la suma de 2 bits mediante una puerta XOR para la suma ($S$) y una AND para el acarreo ($C$).
2. **Sumador Completo (`full_adder`)**: Combina dos semisumadores y una puerta OR para procesar los bits $A$, $B$ y el acarreo de entrada $C_{in}$.
3. **Demostración MUX 2:1 (`mux_demo`)**: Permite conmutar la salida entre dos entradas independientes mediante una línea de selección.
4. **Biestable / Lazo SR (`sr_latch`)**: Latch asíncrono con realimentación cruzada de dos puertas NOR.
5. **Oscilador (`oscillator`)**: Generador de impulsos conectado a una etapa de inversión NOT.

---

## 5. Módulo de Generación de Tablas de Verdad

El sistema evalúa el espacio combinacional del circuito mediante simulación exhaustiva:

1. Filtra los nodos de entrada (`SWITCH` y `CLOCK`) y de salida (`LED`).
2. Genera las $2^N$ combinaciones posibles para $N$ entradas ($N \le 8$).
3. Preserva el estado original de la interfaz, fuerza la combinación $i$-ésima en los conmutadores, fuerza la evaluación del circuito y registra los valores en las salidas LED.
4. Restaura el estado previo del circuito y dibuja una tabla HTML con los resultados evaluados.

---

## 6. Sistema de Estilos y Tokens de Interfaz

La aplicación utiliza la paleta de tokens CSS estandarizada de la suite:

```css
:root {
  --bg: #0c0c10;
  --surface: #13131a;
  --surface-2: #1c1c26;
  --border: #25253a;
  --border-2: #40405a;
  --text: #e2e2f0;
  --text-2: #8080a0;
  --text-3: #454560;
  --accent: #e8a030;       /* Tensión alta / Activo */
  --accent-dim: #271d08;
  --good: #7cc98a;
  --bad: #f87171;
  --wire-high: #e8a030;
  --wire-low: #303045;
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --radius: 10px;
  --radius-lg: 16px;
}
```

---

## 7. Persistencia Local

La funcionalidad de guardado y lectura de esquemas personalizados utiliza la API `localStorage` del navegador mediante la clave `logichub_circuits`:

* **Guardado**: Convierte el estado actual de `nodes` y `wires` a formato JSON y lo almacena con una marca de tiempo.
* **Carga**: Deserializa la estructura y rehidrata los nodos y conexiones en el lienzo SVG.