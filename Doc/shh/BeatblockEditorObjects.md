# Recolor a 8 colores (Beatblock Editor Objects)

Herramienta web interactiva diseñada para procesar y cuantizar imágenes a una paleta fija de **8 colores puros primarios/secundarios/neutros**, eliminando degradados y antialiasing para garantizar bordes limpios e imágenes pixel-perfect.

---

## 🚀 Características Principales

* **Paleta estricta de 8 colores**: Transforma cualquier imagen seleccionando exclusivamente entre:
  * ⚪ `#ffffff` (Blanco)
  * ⬛ `#000000` (Negro)
  * 🔴 `#ff0000` (Rojo)
  * 🔵 `#0000ff` (Azul)
  * 🟢 `#00ff00` (Verde)
  * 🟡 `#ffff00` (Amarillo)
  * 💗 `#ff00ff` (Rosa)
  * 🩵 `#00ffff` (Aqua)
* **Dos Modos de Procesamiento**:
  * **Directo (Nearest Neighbor)**: Asigna a cada píxel el color más cercano de la paleta en el espacio RGB. Ideal para sprites, bordes nítidos y estilo Pixel Art puro.
  * **Difuminado (Floyd–Steinberg Dithering)**: Utiliza una matriz de dispersión de error para simular sombras y matices adicionales mediante tramas de puntos.
* **Gestión de Transparencias Limpias**:
  * Aplica un umbral binario al canal alfa (`A >= 128 ? 255 : 0`).
  * Mantiene las zonas transparentes nativas (PNG) sin contaminarlas con color de fondo ni bordes con semitransparencias (antialiasing).
* **Escalado Integrado de Píxeles**:
  * Redimensionamiento dinámico manteniendo o modificando la relación de aspecto (*aspect ratio*).
  * Renderizado mediante *Nearest Neighbor* (`imageSmoothingEnabled = false`) para evitar remuestreos que generen colores intermedios fuera de la paleta.
* **Vista previa y Descarga**:
  * Comparación visual simultánea entre la imagen original y la procesada.
  * Exportación directa a formato PNG sin pérdida.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 / Canvas API 2D**: Manipulación directa de arreglos de píxeles (`ImageData`).
* **JavaScript vanila**: Algoritmo de distancia euclidiana RGB y difuminado de Floyd–Steinberg.
* **CSS3**: Interfaz oscura (*Dark Mode*) con respuesta táctil y soporte Drag & Drop.

---

## 📂 Formato de Uso

1. Arrastra una imagen o haz clic en el área de carga.
2. Selecciona el modo deseado (**Directo** o **Difuminado**).
3. Ajusta las dimensiones en píxeles si deseas reescalar la imagen.
4. Haz clic en **Descargar imagen recoloreada**.
