# Documentación Técnica: `cards::builder` (`Card Creator_3.html`)

## 1. Visión General

**`cards::builder`** es una aplicación web cliente (*Single Page Application*) desarrollada con tecnologías nativas (HTML5, CSS3 y JavaScript Vanilla) sin dependencias ni *frameworks* externos. 

Su función principal es servir como entorno visual interactivo para crear, editar, validar y exportar el archivo manifest `cards.json`, utilizado por el ecosistema **tradingcards::hub**.

---

## 2. Arquitectura de Datos

La aplicación gestiona un modelo de datos jerárquico centralizado en memoria mediante el array global `collections`.

### 2.1. Objeto `Collection` (Colección)
Representa un mazo o conjunto temático de cartas.

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único de la colección (ej. `balatro`). |
| `name` | `string` | Nombre legible de la colección. |
| `basePath` | `string` | Ruta del directorio base dentro del repositorio de GitHub. |
| `cardBack` | `string` *(opcional)* | Archivo de imagen correspondiente al reverso común del mazo. |
| `rarities` | `Array<Rarity>` | Lista de rarezas pertenecientes a la colección. |
| `packTypes` | `Array<PackType>` | Configuraciones de sobres/paquetes disponibles. |
| `cards` | `Array<Card>` | Catálogo completo de cartas del mazo. |

### 2.2. Objeto `Rarity` (Rareza)
Define las categorías de escasez y atributos estéticos de las cartas.

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador de la rareza (ej. `comun`, `legendaria`). |
| `name` | `string` | Nombre público de la rareza. |
| `folder` | `string` *(opcional)* | Subcarpeta específica para sus imágenes si difiere del `id`/`name`. |
| `color` | `string` | Código de color hexadecimal (ej. `#94a3b8`). |
| `weight` | `number` | Peso genérico de probabilidad para sorteos. |
| `glow` | `boolean` | Determina si la carta emite un efecto de brillo al revelarse. |

### 2.3. Objeto `PackType` (Tipo de Sobre)
Configura variantes de apertura y probabilidades específicas por paquete.

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único del tipo de sobre. |
| `name` | `string` | Nombre del sobre (ej. *Sobre Mega*). |
| `packSize` | `number` | Cantidad total de cartas obtenidas por apertura. |
| `images` | `Array<string>` | Lista de imágenes del sobre (se selecciona una de forma aleatoria). |
| `weights` | `Record<string, number>` | Sobrescritura de pesos por rareza para este sobre. |
| `guaranteed`| `Array<{rarity: string, min: number}>` | Lista de cantidades mínimas aseguradas por rareza. |

### 2.4. Objeto `Card` (Carta)
Definición de cada elemento coleccionable.

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único de la carta dentro de la colección. |
| `rarity` | `string` | ID de la rareza vinculada. |
| `file` | `string` | Nombre del archivo de imagen (ej. `001.png`). |
| `name` | `string` | Nombre legible de la carta. |

---

## 3. Módulos y Funcionalidades Principales

### 3.1. Gestión de Estado e Importación/Exportación
* **`mergeManifest(data)`**: Sanitiza y procesa una estructura JSON importada rellenando valores por defecto si faltan atributos opcionales.
* **`buildManifest()`**: Limpia los objetos en memoria y genera la estructura JSON final lista para producción.
* **Exportación Local / Portapapeles**: Permite descargar directamente el archivo `cards.json` en disco mediante Blobs HTML5 o copiar su contenido mediante la API Clipboard (`navigator.clipboard`).

### 3.2. Motor de Previsualización Remota
* **Sincronización `localStorage`**: Utiliza la clave compartida `tradingcardshub:settings` para almacenar y leer los campos `owner`, `repo` y `branch`.
* **Generación de URLs Raw**: Módulo `previewUrl()` y `packImagePreviewUrl()` que componen URLs hacia GitHub Raw (`https://raw.githubusercontent.com/...`), gestionando el escapado de caracteres mediante `encodeURIComponent`.

### 3.3. Sistema Integrado de Validaciones (`computeGlobalWarnings`)
Ejecuta diagnósticos automáticos en tiempo real y notifica los siguientes errores/advertencias:
1. **Incoherencia de IDs**: Claves duplicadas en colecciones, rarezas, cartas o sobres.
2. **Huérfanos**: Colecciones o rarezas sin cartas asociadas.
3. **Referencias Rota**: Cartas apuntando a IDs de rareza inexistentes.
4. **Cálculos de Sobre**:
   * Sobres con garantía total superior al tamaño disponible (`packSize`).
   * Sobres que garantizan rarezas que carecen de cartas creadas.
   * Colecciones o sobres con suma de pesos de probabilidad iguales a `0`.

---

## 4. Diseño e Interfaz (CSS)

* **Tema de Color Dark**: Paleta con fondos neutros profundos (`#0c0c10`, `#13131a`), bordes de alto contraste suave (`#25253a`) y acentos en tono ámbar/dorado (`#e8a030`).
* **Tipografías**:
  * `Inter`: Utilizada para elementos UI, etiquetas y campos de entrada.
  * `IBM Plex Mono`: Aplicada a identificadores técnicos, código hexadecimal, JSON y vista previa textual.
* **Componentes**: Contenedores tipo *card*, badgets de estado, visores de miniaturas (*preview-thumb*), e indicadores emergentes (*toast notifications*).