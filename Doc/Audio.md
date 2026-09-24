# audio::lens — Analizador de Audio en Navegador

## 1. Descripción

**audio::lens** es una herramienta web sin dependencias externas para el análisis de archivos de audio local. Permite la visualización de espectrogramas estáticos y en tiempo real, detección automática de ritmo (BPM y transitorios/beats) mediante Web Workers y visualización mediante osciloscopio.

---

## 2. Requisitos y Formatos Soportados

El procesamiento se realiza completamente del lado del cliente en el navegador a través del **Web Audio API**.

| Característica | Detalle |
| :--- | :--- |
| **Formatos soportados** | MP3, OGG, WAV, FLAC |
| **Límite de tamaño** | Sujeto a la memoria RAM del navegador |
| **Requisitos** | Navegador moderno con soporte para `AudioContext` y `Web Workers` |

---

## 3. Instrucciones de Uso

### Paso 1: Cargar el Archivo

1. Abre el archivo `index.html` (o `audio.html`) en cualquier navegador web moderno.
2. Arrastra tu archivo de audio a la zona de caída (**Dropzone**) o haz clic en la casilla para seleccionar un archivo local.

### Paso 2: Análisis Automatizado

Una vez cargado el archivo, un **Web Worker** procesará la señal en segundo plano realizando los siguientes pasos:

1. **Cálculo de Onset Strength:** Análisis de la variación de flujo espectral.
2. **Detección de BPM:** Estimación de ritmo por autocorrelación.
3. **Marcado de Beats:** Identificación de impactos/transitorios con sus marcas temporales.
4. **Renderizado Espectro-Temporal:** Generación del espectrograma completo con escala de color (*azul → verde → amarillo → rojo*).

### Paso 3: Reproducción e Interacción

- **Play/Pausa:** Controla la reproducción con el botón `▶` / `⏸`.
- **Navegación / Seek:** Haz clic sobre la barra de progreso o sobre el **Espectrograma Completo** para saltar a un segundo específico.
- **Modos en tiempo real:** Alterna entre el modo **Espectrograma** de desplazamiento horizontal y el **Osciloscopio** para visualizar la señal mientras suena.
- **Efecto Flash Beats:** Activa/desactiva la casilla `Flash beats` para recibir una pista visual con cada impacto detectado.

---

## 4. Estructura del Proyecto

El proyecto está diseñado como una aplicación monocapa en un único archivo ejecutable:

```text
audio-lens/
├── audio.html        # Aplicación completa (HTML, CSS, JS + Inline Web Worker)
└── README.md         # Documentación de la herramienta
```
