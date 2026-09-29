# Documentación Técnica: `morsetrain::hub`

## 1. Visión General del Sistema

**`morsetrain::hub`** (`Morsepractise.html`) es una aplicación web interactiva del lado del cliente diseñada para la referencia, codificación y entrenamiento auditivo de Código Morse. Forma parte del ecosistema de aplicaciones ligeras integradas y funciona de manera 100% autónoma en el navegador del usuario utilizando la Web Audio API nativa para la síntesis de sonido en tiempo real.

Al igual que otras utilidades del paquete, se integra con el módulo global `theme.js` para heredar y mantener la coherencia con el tema de la plataforma.

---

## 2. Arquitectura Base y Estructura de Componentes

### 2.1. Layout e Interfaz Visual
El diseño sigue la estructura estandarizada de columna centrada (`.shell`, `max-width: 720px`) responsiva y optimizada para uso en escritorio y dispositivos móviles.

La interfaz se divide en 3 módulos funcionales (pestañas):
1. **Referencia (`#panel-ref`)**: Diccionario interactivo y buscador de caracteres con vista previa sonora.
2. **Codificador (`#panel-enc`)**: Conversor de texto a morse con reproducción de audio continua.
3. **Práctica (`#panel-practice`)**: Módulo de entrenamiento auditivo con retroalimentación e historial de puntuación/rachas.

### 2.2. Variables CSS y Estilizado
Sigue el esquema de tokens del ecosistema manejado globalmente por `theme.js`:
* **`--bg`**: Fondo general (`#0c0c10`).
* **`--surface` / `--surface-2`**: Tarjetas de contenedor e interacciones secundarias (`#13131a` / `#1c1c26`).
* **`--accent` / `--accent-dim`**: Tono principal de acento/destacado (`#e8a030` / `#271d08`).
* **`--good` / `--bad`**: Indicadores de aciertos y errores (`#34d399` / `#f87171`).

---

## 3. Motor de Audio (`Web Audio API`)

El sistema prescinde de archivos de audio externos (`.mp3` / `.wav`), construyendo las señales sonoras mediante sintetizadores por software generados dinámicamente con `AudioContext`.

### 3.1. Parámetros Configurables
* **Velocidad (PPM / WPM)**: Configurable entre `5` y `30` Palabras Por Minuto.
  * **Unidad base de tiempo ($t_{\text{unidad}}$)**:
    $$t_{\text{unidad}} = \frac{1.2}{\text{WPM}} \quad (\text{en segundos})$$
* **Frecuencia del Tono**: Configurable entre `400 Hz` y `1000 Hz` (onda senoidal puramente sintetizada).

### 3.2. Reglas del Temporizador Morse
* **Punto (`.`)**: $1 \times t_{\text{unidad}}$ de sonido.
* **Raya (`-`)**: $3 \times t_{\text{unidad}}$ de sonido.
* **Pausa entre elementos del mismo carácter**: $1 \times t_{\text{unidad}}$ de silencio.
* **Pausa entre caracteres**: $3 \times t_{\text{unidad}}$ de silencio.
* **Pausa entre palabras (`/`)**: $7 \times t_{\text{unidad}}$ de silencio (representado internamente por $4 \times t_{\text{unidad}}$ de espacio acumulativo).

---

## 4. Estructura de Datos y Módulos

### 4.1. Diccionario Internacional Morse
Almacenado como un objeto clave-valor (`MORSE`), cubriendo:
* **Letras**: `A-Z`
* **Dígitos**: `0-9`
* **Símbolos Especiales**: `. , ? ' ! / ( ) & : ; = + - _ " $ @`

### 4.2. Algoritmo de Búsqueda Normalizada (Pestaña Referencia)
Al buscar en la lista de símbolos, la entrada se procesa con descomposición Unicode `NFD` para ignorar diacríticos/acentos:

```javascript
function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
```

* Permite filtrar tanto por la representación textual del carácter como por la secuencia en morse (`.` y `-`).

### 4.3. Codificador de Texto
Transforma cadenas de texto plano de entrada en una secuencia gráfica de morse utilizando la barra `/` como separador de palabras:

```javascript
// Ejemplo de salida para "SOS MORSE"
"... --- ...  /  -- --- .-. ... ."
```

### 4.4. Módulo de Entrenamiento / Práctica de Escucha
Incluye tres modos de juego seleccionables:
1. **Solo letras**: Selección aleatoria dentro del alfabeto `A-Z`.
2. **Letras y números**: Selección aleatoria dentro del conjunto alfanumérico.
3. **Palabras cortas**: Selección dentro de un banco de 30 palabras de radiofrecuencia/emergencia comunes (`SOS`, `RADIO`, `SIGNAL`, etc.).

Guarda estadísticas locales de sesión:
* **Aciertos**
* **Intentos totales**
* **Racha actual**
* **Mejor racha alcanzada**

---

## 5. Accesibilidad y Atajos de Teclado

* **Atajo de Búsqueda (`/`)**: Presionar `/` estando dentro de la pestaña de Referencia mueve automáticamente el foco al cuadro de búsqueda `#ref-search`.
* **Envío con `Enter`**: Permite enviar respuestas en el modo de práctica presionando la tecla `Enter`.

---

## 6. Privacidad y Rendimiento

* **Cero Peticiones de Red**: Todo el cálculo, renderizado de DOM y síntesis de sonido ocurren localmente en la CPU/DSP del dispositivo.
* **Eficacia Energética**: Los osciladores y nodos de ganancia (`OscillatorNode`, `GainNode`) se crean y destruyen dinámicamente solo durante la reproducción para liberar memoria del navegador.