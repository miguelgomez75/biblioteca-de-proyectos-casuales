# color::picker — Selector de Color e Inspección de Imágenes

## 1. Descripción

**color::picker** es una herramienta web liviana y sin dependencias para la extracción, inspección y copia de valores cromáticos a partir de imágenes locales. Permite cargar imágenes mediante selección, arrastrar y soltar o pegado directo desde el portapapeles, ofreciendo soporte para formatos estáticos y cuadros de GIFs animados.

---

## 2. Requisitos y Formatos Soportados

El procesamiento de las imágenes se realiza de manera 100% local en el navegador del usuario utilizando la API de HTML5 Canvas e ImageDecoder.

| Característica | Detalle |
| :--- | :--- |
| **Formatos soportados** | PNG, JPG, WebP, GIF |
| **Métodos de entrada** | Selección de archivo, Drag & Drop, Pegado (`Ctrl+V`) |
| **Requisitos** | Navegador moderno con soporte para Canvas / Clipboard API |

---

## 3. Instrucciones de Uso

### Paso 1: Cargar una Imagen

1. Abre el archivo `color picker.html` en tu navegador web.
2. Carga la imagen mediante cualquiera de las siguientes alternativas:
   - Haz clic en el botón **"Subir imagen…"** o sobre la zona principal.
   - Arrastra y suelta un archivo de imagen en la **Dropzone**.
   - Pega una imagen directamente desde tu portapapeles usando `Ctrl+V`.

### Paso 2: Inspeccionar y Extraer Colores

1. Desplaza el cursor sobre la imagen cargada para activar la vista previa flotante (**tooltip**).
2. Observa el color exacto, su valor hexadecimal (`#HEX`) y sus componentes `rgb(r, g, b)`.
3. Haz clic sobre cualquier punto de la imagen para **copiar automáticamente** el código hexadecimal al portapapeles.

### Paso 3: Navegación en GIFs Animados (opcional)

Si se carga un archivo `.gif`, se desplegará una barra inferior de control (**Frame bar**):
- Utiliza el deslizador (*slider*) para navegar entre los distintos cuadros o fotogramas (*frames*) del GIF e inspeccionar sus colores individualmente.

### Paso 4: Historial de Colores Copiados

- Cada color seleccionado se registrará en la barra inferior (**Colores copiados**).
- Haz clic sobre cualquier bloque del historial para **volver a copiar** su valor hexadecimal de forma rápida.
- Usa el botón **"Limpiar"** del historial si deseas reiniciar la lista.

---

## 4. Estructura del Proyecto

El proyecto está estructurado como una aplicación monocapa ejecutable en un único archivo:

```text
color-picker/
├── color picker.html  # Aplicación completa (HTML, CSS, JS)
└── README.md          # Documentación del proyecto
```