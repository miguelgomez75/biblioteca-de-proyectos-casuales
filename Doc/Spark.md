# sparks::studio

> **Generador de Inspiración y Motor de Ideación Abstracta Local**  
> *Una SPA en un único archivo HTML que utiliza modelos de lenguaje en GPU local mediante WebGPU para generar conceptos de diseño, estructuras sandbox, proyectos de software e historias.*

---

## 📄 Resumen Técnico

* **Nombre del Proyecto:** `sparks::studio`
* **Tipo:** Single Page Application (SPA 100% Client-Side)
* **Stack Principal:** HTML5, CSS3, Vanilla JavaScript (ES6+), WebGPU API
* **Librería Cliente:** `@mlc-ai/web-llm` (Inferencia cliente en VRAM)
* **Modelos Soporte:** *Llama-3.2-1B*, *Qwen2.5-0.5B*, *Llama-3.2-3B*
* **Arquitectura de Red:** 100% Offline (Tras la descarga inicial del modelo en caché IndexedDB)

---

## 🛠️ Objetivos del Proyecto

1. **Superación del Bloqueo Creativo:** Generar tarjetas de inspiración estructuradas (Título, Descripción, Puntos Clave y Giro Único) de forma ilimitada.
2. **Aleatoriedad Estructurada (Ruido Térmico):** Inyectar conceptos de caos e hiperparámetros de temperatura dinámica para evitar respuestas repetitivas.
3. **Multi-Dominio:** Soporte nativo para construcciones Sandbox, arquitectura de software SPA, narrativa/historias y diseño de videojuegos.
4. **Moodboard de Sesión:** Posibilidad de guardar chispas creativas en una lista local y exportar la selección en formato Markdown (`.md`).

---

## 🎨 Características Interactively

* **Dominios Seleccionables:**
  * 🏰 *Build Sandbox* (Minecraft, Terraria, estructuras, biomas).
  * 💻 *Proyectos SPA* (Herramientas web, utilidades, calculadoras).
  * 📜 *Historias & Lore* (Narrativa, premisas de ficción, trasfondos).
  * 🎲 *Game Design* (Mecánicas de juego, conceptos de interacción).
* **Inyección de Caos (Anti-Repetición):** Algoritmo cliente que pasa semillas conceptuales aleatorias y bloquea la repetición de las últimas 5 ideas generadas.
* **Control de Temperatura Creativa:** Deslizador para ajustar el nivel de impredecibilidad del modelo.
* **Atajo de Teclado:** Generación instantánea mediante la tecla `Espacio`.

---

## 📁 Estructura del Archivo

```text
index.html
├── <head>
│   ├── CSS Design System (Variables, Fonts Inter & IBM Plex Mono)
│   └── WebLLM SDK Import (ESM Module)
├── <body>
│   ├── Status Bar & WebGPU Engine Switcher
│   ├── Domain Selector Buttons
│   ├── Controls (Temperature Slider & Model Selector)
│   ├── Spark Output Card (Title, Desc, Bullets, Twist)
│   ├── Moodboard Container & Markdown Exporter
│   └── JS Logic (Inference engine, JSON Parser, Keybindings)
