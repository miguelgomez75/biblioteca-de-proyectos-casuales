# examplan::hub — Cuenta atrás y plan de estudio

**examplan::hub** es una aplicación web interactiva diseñada para planificar y organizar jornadas de estudio previas a exámenes. Permite crear múltiples exámenes, calcular la cuenta atrás para cada uno y distribuir automáticamente los temas a estudiar entre los días disponibles.

---

## Características principales

* **Gestión de exámenes**: Permite añadir, editar y eliminar diferentes exámenes con su nombre, asignatura opcional y fecha elegida.
* **Cuenta atrás dinámica**: Muestra los días restantes para la fecha del examen en tiempo real.
* **Planificación por días**: Genera bloques diarios desde el día actual hasta la víspera del examen (reservando el día de la prueba para repaso final).
* **Distribución de temas**:
  * **Repartir automáticamente**: Distribuye los temas sin asignar de forma equitativa entre los días de estudio restantes.
  * **Reordenar todo**: Vacía la asignación diaria y reparte todos los temas desde cero, manteniendo el estado de los que ya están completados.
* **Seguimiento de progreso**: Barra de progreso visual y contador numérico del total de temas completados.
* **Persistencia local**: Guarda automáticamente todos los datos en `localStorage` del navegador (`examplanhub_exams` y `examplanhub_items`).

---

## Estructura de archivos y tecnologías

* **Tecnologías**: HTML5, CSS3 (variables CSS, Flexbox) y JavaScript ES6 vanilla.
* **Tipografías**: *Inter* y *IBM Plex Mono* (a través de Google Fonts).
* **Dependencias externas**: Archivo script local `../theme.js` para la gestión de temas.

---

## Estructura de datos (`localStorage`)

### Exámenes (`examplanhub_exams`)

```json
[
  {
    "id": "e1",
    "name": "Matemáticas II",
    "subject": "Álgebra",
    "date": "2026-06-15"
  }
]
```

### Temas (`examplanhub_items`)

```json
[
  {
    "id": "i1",
    "examId": "e1",
    "text": "Tema 1: Matrices",
    "day": "2026-06-10",
    "done": false
  }
]
```