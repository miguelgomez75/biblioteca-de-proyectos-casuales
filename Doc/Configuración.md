# Documentación Técnica: `theme::hub`

## 1. Visión General del Sistema

**`theme::hub`** es el centro de control y personalización de temas de la suite/biblioteca digital. Permite gestionar, personalizar, derivar y sincronizar dinámicamente las paletas de colores, acentos, radios de curvatura de esquinas y tipografías para todos los módulos y herramientas que forman parte del ecosistema (`books::hub`, `logic::hub`, etc.).

La herramienta opera bajo un modelo **dinámico e interactivo de reactividad en tiempo real**, persistiendo la configuración del usuario en `localStorage` y propagando los cambios instantáneamente a través del módulo unificado `theme.js` mediante variables CSS nativas (*CSS Custom Properties*).

---

## 2. Arquitectura de Personalización y Motor de Derivación (`theme.js`)

El archivo central `theme.js` expone el objeto global `window.BCTheme`, el cual proporciona la lógica de cálculo y derivación de colores a partir de tres valores base fundamentales: **Fondo (`bg`)**, **Superficie (`surface`)** y **Texto (`text`)**.

### 2.1. Algoritmo de Derivación Dinámica (`T.derive`)
A partir de los tres colores principales provistos por el usuario o seleccionados desde una plantilla (*preset*), el motor calcula automáticamente la escala secundaria de la interfaz:

* **`--surface-2`**: Tono intermedio calculado mediante mezcla y contraste para tarjetas elevadas, botones secundarios e insumos.
* **`--border`**: Borde sutil derivado de la superficie.
* **`--border-2`**: Borde enfatizado para estados *hover* y elementos enfocados.
* **`--text-2`**: Texto secundario (opacidad relativa reducida).
* **`--text-3`**: Texto terciario/etiquetas (*labels*, leyendas de atajos).
* **`--accent-dim`**: Tono atenuado del color de acento para fondos de elementos activos o *badges*.

---

## 3. Modos de Operación y Parámetros del Estado

El estado global de la aplicación posee la siguiente estructura JSON de persistencia:

```json
{
  "preset": "medianoche",
  "custom": {
    "bg": "#0c0c10",
    "surface": "#13131a",
    "text": "#e2e2f0"
  },
  "accent": "#e8a030",
  "radius": "default",
  "font": "default"
}
```

### 3.1. Gestión de Acento (*Accent Mode*)
1. **Cada página el suyo (`accent: null`)**: Cada herramienta conserva su propio color distintivo de acento (por ejemplo, dorado en `logic::hub`, carmesí en `books::hub`).
2. **Unificado (`accent: "#hex"`)**: Aplica un único color de acento global a través de la variable `--accent` para toda la biblioteca.

### 3.2. Geometría y Tipografía
* **Radio de Esquinas (`--radius`, `--radius-lg`)**:
  * `sharp`: Esquinas totalmente rectas (`0px`).
  * `default`: Esquinas estándar (`10px` / `16px`).
  * `round`: Esquinas suaves y redondeadas (`18px` / `24px`).
* **Tipografía UI (`--font-ui`)**: Permite conmutar la fuente de la interfaz entre la tipografía original (`Inter`), fuentes de sistema (`system-ui`), estilo tradicional (`serif`) o fuentes de ancho fijo (`IBM Plex Mono`).

---

## 4. Presets del Sistema y Paletas Predefinidas

| Preset ID | Nombre | `--bg` | `--surface` | `--text` |
| :--- | :--- | :--- | :--- | :--- |
| **original** | Original | *N/A (Individual)* | *N/A (Individual)* | *N/A (Individual)* |
| **medianoche** | Medianoche | `#0c0c10` | `#13131a` | `#e2e2f0` |
| **carbon** | Carbón | `#121212` | `#1e1e1e` | `#f0f0f0` |
| **nord** | Nord Dark | `#2e3440` | `#3b4252` | `#eceff4` |
| **matrix** | Matrix | `#050e06` | `#0d1a0e` | `#a3f3a6` |
| **custom** | Personalizado | *Definido por usuario* | *Definido por usuario* | *Definido por usuario* |

---

## 5. Módulo de Vista Previa e Importación/Exportación

### 5.1. Vista Previa en Tiempo Real (*Mock Component*)
La interfaz gráfica expone una tarjeta interactiva tipo *Mockup* que refleja inmediatamente cualquier ajuste en tiempo real:
* Título y *Badges* con acento atenuado (`--accent-dim`).
* Bloques activos e inactivos.
* Botones primarios (`.btn.go`) y secundarios (`.btn`).
* Inputs y texto secundario (`--text-2`).

### 5.2. Exportación e Importación JSON
* **Exportar (`.json`)**: Genera y descarga un archivo estructurado `tema-biblioteca.json` listo para respaldar o compartir entre dispositivos.
* **Importar**: Valida y parsea el archivo `.json` subido mediante `T.normalize()` antes de escribirlo en `localStorage` y propagarlo.

---

## 6. Excepciones de Compatibilidad

El sistema ignora intencionalmente o excluye de la tematización global aquellas aplicaciones que utilizan esquemas gráficos de renderizado directo o canvas fijos aislados (por ejemplo: `Lights-out` y `BeatblockEditorObjects`).