# Public Domain Digital Library Platform (books::hub)

`books::hub` es una aplicación web e interfaz de lectura en línea orientada a la búsqueda, exploración y lectura directa de literatura de dominio público. La plataforma se integra con la API de **Open Library** y el visor incrustable de **Internet Archive**, garantizando el acceso legal y gratuito a obras completas mediante un filtrado estricto de accesibilidad pública.

---

## 🚀 Características Principales

* **Filtrado Estricto de Dominio Público**:
  * Filtrado programático en el cliente que restringe los resultados exclusivamente a obras con identificador activo en **Internet Archive** ($ia \neq \emptyset$).

* **Búsqueda Avanzada y Por Categorías**:
  * Búsqueda por texto libre (*debounce* de $400 \text{ ms}$) para consultar por título o autor.
  * Selector por temas y géneros clásicos (Literatura clásica, Poesía, Filosofía, Ciencia, Historia, Aventuras, Misterio, Infantil) mediante sintaxis de consulta por atributo (`subject:"..."`).

* **Lector Integrado e Interactivo**:
  * Integración sin interrupciones del reproductor embebido de Internet Archive en un marco responsivo dentro de la interfaz (`iframe`).
  * Enlaces directos a fichas bibliográficas en Open Library, páginas de detalles de Internet Archive y repositorio de descarga multiformato (EPUB, PDF, Kindle).

* **Gestión de Favoritos en Local**:
  * Sistema de guardado y marcadores persistentes mediante `localStorage` (hasta 16 elementos simultáneos).
  * Renderizado dinámico de marcadores (*chips*) para acceso rápido.

---

## 🛠️ Especificaciones Técnicas

### 1. Algoritmo de Búsqueda y Filtrado
La consulta a la API REST de Open Library recupera un volumen máximo de 50 documentos (`limit=50`), aplicando posteriormente un filtro estricto sobre el atributo $ia$:

$$
B_{\text{validos}} = \{ d \in D_{\text{docs}} \mid \exists\, \text{ia}_i \in d.\text{ia} \}
$$

$$
B_{\text{render}} = B_{\text{validos}}[0 \dots 23]
$$

### 2. Integración del Lector de Internet Archive
El visor integrado se genera dinámicamente mediante la siguiente construcción de URL iframe usando el primer identificador único de Internet Archive:

$$
\text{URL}_{\text{embed}} = \texttt{https://archive.org/embed/} + \text{ia}[0]
$$

### 3. Modulo de Portadas (Covers API)
Las imágenes de portada se solicitan dinámicamente con resolución adaptativa según el contexto (tarjeta o modal):

* **Miniaturas de Grid**: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`
* **Modal Detallado**: `https://covers.openlibrary.org/b/id/{cover_i}-L.jpg`

---

## 🔌 API y Endpoints Utilizados

| Servicio | Propósito | Endpoint |
| :--- | :--- | :--- |
| **Open Library Search** | Consulta general de catálogo | `https://openlibrary.org/search.json?q={query}&limit=50` |
| **Open Library Covers** | Recuperación de portadas | `https://covers.openlibrary.org/b/id/{id}-{S\|M\|L}.jpg` |
| **Internet Archive Embed** | Visor incrustado de libros | `https://archive.org/embed/{ia_id}` |
| **Internet Archive Details** | Ficha del libro original | `https://archive.org/details/{ia_id}` |
| **Internet Archive Download** | Descargas directas | `https://archive.org/download/{ia_id}` |

---

## 💾 Estructura del Almacenamiento Local (`localStorage`)

Clave: `bookshub_favs`  
Estructura en formato JSON conteniendo los metadatos esenciales del objeto libro:

```json
[
  {
    "key": "/works/OL27448W",
    "title": "The Adventures of Sherlock Holmes",
    "author_name": ["Arthur Conan Doyle"],
    "cover_i": 8231856,
    "ia": ["adventuresofsher00doyl_0"],
    "first_publish_year": 1892,
    "language": ["eng"]
  }
]
```

---

## 📂 Instrucciones de Uso

1. **Búsqueda**: Introduce el título o autor en la barra principal, o selecciona un tema del desplegable para cargar una lista de obras.
2. **Visualizar Ficha**: Haz clic en cualquier tarjeta de la cuadrícula para abrir la ventana de detalles.
3. **Leer en Línea**: Haz clic en el botón **📖 Leer aquí** para desplegar el lector embebido directamente en la ventana modal.
4. **Descargar u Original**: Utiliza los botones auxiliares para navegar hacia Internet Archive y descargar el libro en formato PDF, EPUB o Kindle.