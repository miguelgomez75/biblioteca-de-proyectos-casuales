# Map Processor (map::processor)

`map::processor` es una aplicación web interactiva diseñada para automatizar la conversión de imágenes complejas en mapas de bloques de lana para **Minecraft**, generando matrices estructuradas en formato CSV de 64 chunks para su posterior importación y construcción en partida.

---

## 🚀 Flujo de Trabajo y Características

La herramienta forma parte de un proceso integrado de 4 pasos para construir Pixel Art en Minecraft:

1. **Conversión inicial**:
   * Mediante herramientas como [Minecraft Dot Pictures](https://www.minecraft-dot.pictures), la imagen original se renderiza en una matriz de lanas de $128 \times 128$ bloques (exportada en PNG de $2048 \times 2048$ px).
2. **Procesamiento de imagen por Chunks (`map::processor`)**:
   * Carga la imagen de $2048 \times 2048$ px y la divide en **64 chunks** ($8 \times 8$ chunks de $256 \times 256$ px).
   * Mapea cada bloque de $16 \times 16$ px comparándolo contra las **16 plantillas oficiales de colores de lana de Minecraft** (valores hexadecimales del `0` al `f`).
   * Genera tableros visuales interactivos para inspección directa por chunk.
3. **Exportación a CSV**:
   * Exporta la matriz completa con separadores estructurales de chunk (`g`) para la correcta alineación en hojas de cálculo (Google Sheets / Excel).
4. **Guía de Construcción**:
   * Importación de la matriz CSV en plantillas de diseño para recrear la estructura en Minecraft usando alfombras/bloques de lana.

---

## 🛠️ Especificaciones Técnicas

* **Formato de Imagen Entrante**: PNG de $2048 \times 2048$ px exactamente.
* **Resolución de Bloque**: Patrones de $16 \times 16$ px por bloque individual de lana.
* **Algoritmo de Matching**: Análisis de diferencia absoluta de color Pixel-by-Pixel (RGB) frente a las 16 plantillas precargadas (`plantillas/0.png` a `plantillas/f.png`).
* **Estructura de Salida**: Archivo `mapa_procesado.csv` delimitado por comas con identificadores hexadecimales de bloques y separadores `g` entre bordes de chunks.

---

## 📂 Instrucciones de Uso

1. Selecciona o arrastra el archivo PNG de $2048 \times 2048$ px en el área de carga.
2. Haz clic en **Procesar** para cargar las plantillas y realizar el análisis por chunks.
3. Al finalizar, pulsa **Descargar CSV** para guardar `mapa_procesado.csv`.
4. Importa el CSV en tu hoja de cálculo para sincronizar con la guía de construcción.
