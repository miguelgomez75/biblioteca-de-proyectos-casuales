# color::picker — Selector y Cuentagotas de Color para Imágenes

Página de una sola vista (`index.html`) para la inspección visual y extracción de códigos de color a partir de archivos de imagen locales. Permite cargar imágenes mediante arrastrar y soltar, exploración por explorador de archivos o pegado directo desde el portapapeles. Ofrece inspección de píxel con lupa/tooltip flotante en tiempo real, soporte para GIF animados fotograma a fotograma y un historial de colores copiados. Sin backend propio: toda la decodificación, el renderizado en canvas y el muestreo de píxeles se realizan localmente en el navegador.

## Qué hace

### Carga e importación de imágenes

* Soporta múltiples formatos de imagen habituales: **PNG, JPG, WebP y GIF**.
* Múltiples vías de importación:
  * Botón explícito de carga ("Subir imagen…").
  * Zona interactiva para **arrastrar y soltar** (*drag & drop*).
  * Soporte para **pegar desde el portapapeles** (Ctrl+V / Cmd+V) cuando se tiene una captura o imagen copiada.
* Muestra la ficha de metadatos de la imagen cargada con el nombre del archivo, sus dimensiones exactas en píxeles ($Ancho \times Alto$) y su peso en kilobytes.

### Inspección visual y cuentagotas en tiempo real

* **Lupa / Tooltip flotante**: Al desplazar el cursor sobre la imagen, un cuadro informativo sigue el movimiento mostrando:
  * Una muestra del color exacto bajo el puntero (*swatch*).
  * El código en formato hexadecimal (por ejemplo, `#E8A030`).
  * Los componentes en formato RGB (`rgb(r, g, b)`).
* **Posicionamiento inteligente**: El tooltip ajusta automáticamente su posición según los límites de la pantalla para evitar quedar oculto en los bordes.
* **Copiado al clic**: Al hacer clic en cualquier punto de la imagen, el código HEX del píxel seleccionado se copia automáticamente al portapapeles del sistema y se muestra una notificación flotante (*toast*).

### Soporte para GIF animados (Secuencia por fotogramas)

* Detecta archivos GIF y utiliza la API nativa `ImageDecoder` cuando está disponible en el navegador para extraer y decodificar la secuencia completa de fotogramas.
* Muestra una **barra de control de fotogramas** con un deslizador (*slider*) que permite iterar fotograma por fotograma para inspeccionar el color de imágenes animadas en puntos clave de la animación.
* Muestra el contador de fotograma actual frente al total (`Frame X / Y`). Si la decodificación por fotogramas no es soportada por el navegador, cae de forma segura en la visualización del primer fotograma estático.

### Historial de colores copiados

* Al hacer clic sobre un píxel, el color extraído se añade a la barra de historial (*color strip*).
* Cada elemento del historial se representa mediante una tarjeta compacta (*chip*) con la muestra de color y su código HEX.
* Hacer clic en cualquier color del historial lo **vuelve a copiar al portapapeles** inmediatamente.
* Incluye un botón para limpiar el historial completo.

## Tecnología

* HTML + CSS + JavaScript "vanilla" (sin frameworks ni dependencias externas), todo integrado en un único archivo ejecutables.
* Uso de `HTML Canvas 2D` con la opción `willReadFrequently: true` optimizada para lecturas continuas y de alto rendimiento del búfer de píxeles mediante `getImageData`.
* Mismo lenguaje visual que el resto de la suite (`DevTools Hub`): fondo oscuro (`--bg: #0c0c10`), acentos en color ámbar (`--accent`), fuentes monoespaciadas para códigos numéricos (`IBM Plex Mono`) e interfaz limpia.
* Copiado robusto mediante `navigator.clipboard` con solución de reserva (*fallback*) mediante elemento temporal en el DOM para compatibilidad en diversos entornos.

## Limitaciones a tener en cuenta

* Todo el procesamiento depende del motor gráfico del navegador y de la memoria del dispositivo; imágenes de resoluciones extremadamente altas pueden requerir más memoria de procesamiento al renderizar en el canvas.
* La decodificación fotograma a fotograma de GIF animados requiere navegadores modernos compatibles con la API `ImageDecoder` (como Chrome/Edge 94+). En navegadores que no la soporten, el GIF se visualizará únicamente como una imagen estática con su primer fotograma.
* No existe persistencia de sesión: al recargar la página se limpia la imagen y el historial de colores recopilados.