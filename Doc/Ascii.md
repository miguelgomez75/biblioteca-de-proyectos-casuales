# ASCII Art & Decorator (ascii::hub)

`ascii::hub` es una aplicación web interactiva diseñada para la conversión en tiempo real de imágenes y texto plano en arte ASCII, junto con un generador de fuentes decorativas Unicode. Integrada en un único lienzo funcional, permite procesar archivos de imagen, sintetizar banners tipográficos y transformar texto mediante mapeos de caracteres Unicode.

## 🚀 Características Principales

* **Generador de Arte ASCII (Modo Doble Origen)**:
  * **Modo Texto**: Renderizado de cadenas en un canvas interno dinámico con ajuste de tipografía (`IBM Plex Mono`, `Inter`, `Georgia`, `Impact`), peso y grosor visual.
  * **Modo Imagen**: Carga y procesamiento local de imágenes mediante arrastrar y soltar (*drag & drop*) o selector de archivos vía FileReader API.
* **Control Fino de Renderizado**:
  * Ajuste de resolución por columnas (ancho de $40$ a $220$ caracteres).
  * Rampas de densidad de caracteres seleccionables: Clásico (`@%#*+=-:. `), Bloques (`█▓▒░ `), Mínimo (`#+-. `) y Binario (`10 `).
  * Inversión de tonos de luminancia e interpretación de color RGB dinámico por carácter para imágenes.
* **Convertidor de Fuentes Decorativas**:
  * Transformación instantánea de texto plano a $17$ estilos decorativos Unicode (Negrita, Cursiva, Gótica, Caligráfica, Pizarra, Ancho completo, Versalitas, Espejo/Al revés, entre otros).
* **Exportación y Utilidades**:
  * Copiado directo al portapapeles y descarga del arte generado en formato de texto plano (`.txt`).

## 🛠️ Especificaciones Técnicas

* **Compensación de Aspect Ratio de Fuentes Monoespaciadas**:
  * Al mapear una grilla bidimensional de celdas sobre el canvas de origen, la altura de la celda $H_{celda}$ se ajusta para compensar la proporción típica vertical de los caracteres monoespaciados ($\sim 1:2.05$):

    $$
    H_{celda} = W_{celda} \cdot 2.05 = \left( \frac{W_{canvas}}{C} \right) \cdot 2.05
    $$

    Donde $W_{canvas}$ es el ancho total de la imagen/canvas y $C$ es el número de columnas ($Cols$).

* **Cálculo de Luminancia Fotométrica**:
  * La conversión de los canales de color $RGB$ promediados de cada celda a un valor de brillo percibidode $0.0$ a $1.0$ utiliza la fórmula de luminancia rec.601:

    $$
    Y = \frac{0.299 \cdot R + 0.587 \cdot G + 0.114 \cdot B}{255}
    $$

    Si la opción de inversión está activa, la luminancia final se calcula como $Y' = 1 - Y$.

* **Mapeo a Rampa de Caracteres**:
  * El índice $i$ del carácter en la rampa seleccionada de longitud $L$ se determina mediante:

    $$
    i = \min\left(L - 1, \; \lfloor (1 - Y) \cdot L \rfloor\right)
    $$

* **Transformación Unicode de Fuentes Decorativas**:
  * Uso de puntos de código Unicode suplementarios (`String.fromCodePoint`) para mapear rangos alfabéticos ASCII a bloques específicos de símbolos alfanuméricos matemáticos (`U+1D400`, `U+1D504`, `U+1D538`, etc.) considerando excepciones estandardizadas de glifos.

* **Tecnologías**: HTML5, CSS Custom Properties, JavaScript Vanilla (ES6+), Canvas API, FileReader API, Clipboard API.

## 📂 Instrucciones de Uso

1. Selecciona la pestaña superior deseada: **Arte ASCII** o **Fuentes decorativas**.
2. Para **Arte ASCII**:
   * Selecciona el origen (**Texto** para escribir una cadena con tipografía personalizada o **Imagen** para cargar un archivo local).
   * Ajusta los parámetros de **Ancho (columnas)**, **Densidad de caracteres**, **Invertir tonos** o **Color**.
   * Haz clic en **Generar** y utiliza los botones inferiores para **Copiar** o **Descargar .txt**.
3. Para **Fuentes decorativas**:
   * Introduce el texto en el campo de entrada central.
   * Explora las vista previas generadas en tiempo real y haz clic en **Copiar** en el estilo deseado para usarlo en redes sociales o documentos.