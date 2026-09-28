# Documentación Técnica: `cheat::hub`

## 1. Visión General del Sistema

**`cheat::hub`** es una aplicación de referencia rápida y chuleta interactiva del lado del cliente dentro del ecosistema digital. Proporciona a los desarrolladores un conjunto de consultas rápidas para **comandos de Git**, **Expresiones Regulares (Regex)**, **Atajos de Teclado (VS Code, Terminal, Vim, Navegador y Sistema Operativo)** y **Códigos de Estado HTTP**.

La herramienta está implementada en un único archivo HTML/CSS/JS, ejecutándose completamente en el navegador del usuario e integrándose con el módulo `theme.js` para la propagación dinámica del tema visual de la suite.

---

## 2. Arquitectura Base y Estructura de Componentes

### 2.1. Maquetación y Propiedades Personalizadas CSS
El diseño sigue una estructura de columna centrada (`.shell`, `max-width: 720px`) adaptable a dispositivos móviles.

Variables CSS principales utilizadas y sobreescribibles por `theme.js`:
* **`--bg`**: Color de fondo principal (`#0c0c10`).
* **`--surface` / `--surface-2`**: Superficies de tarjetas y estados interactivos elevados (`#13131a` / `#1c1c26`).
* **`--border`**: Tono para bordes base y divisores (`#25253a`).
* **`--accent` / `--accent-dim`**: Color de acento de interfaz y su versión atenuada (`#e8a030` / `#271d08`).
* **`--good` / `--bad`**: Indicadores de estado e informes de códigos HTTP (`#34d399` / `#f87171`).

---

## 3. Esquema de Datos y Categorías

Los datos están definidos en una matriz principal (`DATA`) dentro de una función autoejecutable (IIFE). Cada registro utiliza una tupla de 4 elementos:

$$\text{Elemento} = [\text{categoría}, \text{código/atajo}, \text{descripción}, \text{etiqueta}]$$

```javascript
[
  'git',                            // ID de Categoría
  'git commit --amend --no-edit',   // Comando o combinación de teclas
  'Añade cambios al último commit', // Descripción
  'deshacer'                        // Etiqueta/Subgrupo
]
```

### 3.1. Categorías Soportadas

| Categoría (`cat`) | Icono | Descripción | Ejemplos de Etiquetas |
| :--- | :--- | :--- | :--- |
| **`all`** | `*` | Vista global con todos los elementos registrados. | `git`, `regex`, `key`, `http` |
| **`git`** | `$` | Comandos para control de versiones Git. | `básico`, `deshacer`, `historial`, `ramas`, `stash`, `remoto` |
| **`regex`** | `.*` | Sintaxis y patrones de Expresiones Regulares. | `clases`, `anclas`, `cuantif.`, `grupos`, `lookaround`, `ejemplo`, `flags` |
| **`keys`** | `⌘` | Atajos de teclado por entornos. | `vs code`, `terminal`, `vim`, `navegador`, `escritorio` |
| **`http`** | `#` | Códigos de respuesta de protocolo HTTP. | `1xx`, `2xx`, `3xx`, `4xx`, `5xx` |

---

## 4. Funcionalidades Clave e Implementación

### 4.1. Algoritmo de Búsqueda Normalizada Multi-Palabra
La búsqueda descompone la entrada del usuario y los registros utilizando `NFD` para eliminar diacríticos y acentos:

```javascript
function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
```

* **Criterio de Coincidencia**: Evalúa texto de comando, descripción, sub-etiqueta y categoría.
* **Soporte Multi-Palabra**: Las palabras separadas por espacios actúan como un filtro `AND`, requiriendo que cada término coincida con el elemento evaluado.

### 4.2. Portapapeles e Interacción
Al hacer clic en cualquier elemento de la lista, el código o comando se copia al portapapeles mediante la API nativa `navigator.clipboard.writeText()`, con un *fallback* a un nodo `<textarea>` temporal cuando las directivas de seguridad restringen la API moderna.

### 4.3. Navegación por Teclado
* **Teclas ` / `**: Enfoca automáticamente el campo de búsqueda (`#search`) desde cualquier punto de la interfaz.
* **Tecla ` Escape `**: Limpia el texto de búsqueda y retira el foco del cuadro de texto.

### 4.4. Estilizado Dinámico para Códigos HTTP
Los elementos de estado HTTP aplican clases específicas (`.c1`, `.c2`, `.c3`, `.c4`, `.c5`) en función del primer dígito del código ($1\times\times$ a $5\times\times$):
* **`2xx`**: Éxito (`--good` / Verde)
* **`3xx`**: Redirección (`--accent` / Ámbar)
* **`4xx` / `5xx`**: Errores de cliente o servidor (`--bad` / Rojo)

---

## 5. Privacidad y Seguridad

* **Ejecución Local**: Funciona 100% en el cliente sin enviar peticiones a servidores ni recopilar analíticas.
* **Protección contra XSS**: La manipulación del DOM para renderizar la lista utiliza métodos seguros (`document.createElement` y `.textContent`) evitando la inyección directa mediante `innerHTML`.