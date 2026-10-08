# chameleon::studio

> **Actor Conversacional Multimodal Local y Sandbox de Roleplay Privado**  
> *Una SPA en un único archivo HTML para simulación de diálogos, evaluación de discursos e interrogatorios con soporte RAG local y OCR.*

---

## 📄 Resumen Técnico

* **Nombre del Proyecto:** `chameleon::studio` (`chameleon::ai`)
* **Tipo:** Single Page Application (SPA 100% Client-Side)
* **Stack Principal:** HTML5, CSS3, Vanilla JavaScript (ES6+), WebGPU API, Web Speech API
* **Librerías Cliente:**
  * `@mlc-ai/web-llm` (Inferencia de LLMs en GPU local vía WebGPU)
  * `PDF.js` (Extracción cliente de texto desde archivos PDF)
  * `Tesseract.js` (Motor OCR en navegador para imágenes)
* **Arquitectura de Red:** 100% Offline (Tras la descarga/cacheo del modelo local)

---

## 🛠️ Objetivos del Proyecto

1. **Garantía Absoluta de Privacidad:** Ofrecer un entorno conversacional inmersivo donde el procesamiento de lenguaje natural (LLM) y la lectura de documentos adjuntos ocurran exclusivamente en la GPU/RAM del cliente.
2. **Interpretación de Roles Dinámica (Roleplay Sandbox):** Permitir al usuario configurar un "System Prompt" personalizado para transformar a la IA en un sospechoso de un caso, un oyente empático, un evaluador de discursos o un profesor.
3. **RAG Local Multimodal (Dossier de Pruebas):** Permitir la subida de archivos (PDF, TXT, MD) y capturas de pantalla/imágenes con texto (OCR) para que sirvan de base de conocimiento estricta al personaje.
4. **Búsqueda de Contradicciones y Pistas:** Incluir un cuaderno de notas lateral para registrar evidencias o respuestas del personaje y acorralarlo con datos reales extraídos de los documentos.

---

## 🎨 Características Interactivas

* **Lobby de Configuración con Presets:**
  * 🚨 *Imputado por Secuestro:* Sospechoso que sostiene una coartada hasta que el usuario le señala contradicciones basadas en el dossier.
  * 🎤 *Evaluador de Discursos:* Escucha presentaciones y da feedback estructurado comparado contra el guion adjunto.
  * 🎧 *Oyente Pasivo:* Entorno de desahogo con escucha empática y preguntas abiertas.
* **Procesamiento Local de Documentos (RAG):**
  * Extracción cliente de archivos PDF mediante `PDF.js`.
  * Reconocimiento Óptico de Caracteres (OCR) cliente en imágenes mediante `Tesseract.js`.
* **Motor WebGPU Seleccionable:**
  * *Llama-3.2-1B-Instruct* (~700 MB VRAM)
  * *Qwen2.5-0.5B-Instruct* (~350 MB VRAM)
  * *Llama-3.2-3B-Instruct* (~1.8 GB VRAM)
* **Herramientas de Inmersión:**
  * Cuaderno de pistas/anotaciones con guardado directo desde el chat.
  * Lectura en voz alta mediante la API nativa `window.speechSynthesis`.

---

## 🔒 Arquitectura de Seguridad y Privacidad

| Componente | Procesamiento | Salida de Datos a Red |
| :--- | :--- | :--- |
| **Inferencia LLM** | WebGPU (VRAM Local) | ❌ Ninguna |
| **Lectura PDF/TXT** | FileReader / PDF.js | ❌ Ninguna |
| **Reconocimiento OCR** | Tesseract.js (WASM) | ❌ Ninguna |
| **Historial y Notas** | Memoria RAM / State | ❌ Ninguna |

---

## 📁 Estructura del Archivo

```text
index.html
├── <head>
│   ├── CSS Variables & Layout
│   ├── PDF.js CDN
│   ├── Tesseract.js CDN
│   └── WebLLM Module Import
├── <body>
│   ├── <header> (Status Bar & Privacy Badge)
│   ├── <div id="setupOverlay"> (Lobby, Presets, Prompt & File Upload)
│   ├── <div class="chat-layout">
│   │   ├── Chat Stream Window
│   │   └── Notes & Clues Sidebar
│   └── <script> (Logic, WebGPU Engine & Document Extractors)
