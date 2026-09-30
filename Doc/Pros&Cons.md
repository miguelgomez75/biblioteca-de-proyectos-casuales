# proscons::hub — Lista simple de pros y contras

Página de una sola vista (`Pros&Cons.html`) que permite evaluar decisiones complejas ponderando argumentos a favor y en contra en una interfaz de dos columnas en paralelo. Sin backend propio: la persistencia y los cálculos de balance se realizan íntegramente en el navegador.

## Qué hace

### Gestión de decisiones
- **Múltiples listas**: permite crear, organizar y alternar entre distintas listas de decisiones mediante un selector desplegable.
- **Título de la decisión**: campo superior editable para definir el tema de evaluación (por ejemplo, "¿Cambiar de trabajo?" o "Comprar coche nuevo").
- **Exportación JSON**: botón para descargar la decisión activa en un archivo `.json` que sirve como copia de seguridad o para compartir datos entre dispositivos.

### Puntos y ponderación (Pros y Contras)
- **Columnas en paralelo**: dos secciones claramente diferenciadas por colores (verde para pros, rojo para contras) con contadores independientes del número de elementos.
- **Edición en caliente**: los argumentos añadidos pueden editarse directamente haciendo clic sobre el texto (`contenteditable`). Dejar un punto vacío al perder el foco lo elimina automáticamente.
- **Ponderación de peso (1–3)**: cada argumento incluye un selector de peso interactivo (`×1`, `×2`, `×3`). Clicar sobre la insignia de peso incrementa su relevancia dentro de la decisión.
- **Eliminación individual**: botón `×` en cada fila para borrar argumentos de manera inmediata.

### Balance y veredicto dinámico
- **Cálculo porcentual**: analiza la suma total de los pesos asignados a cada columna (no solo la cantidad de elementos) para obtener un porcentaje ponderado de cada postura.
- **Barra de balance visual**: representa la proporción entre pros y contras mediante una barra bicolor graduada.
- **Resumen cualitativo**: muestra una conclusión contextual sobre el peso de la decisión ("Los pros pesan más", "Los contras pesan más" o "Está muy igualado").

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), empaquetado en un único archivo.
- Mismo lenguaje visual que el resto de la suite de herramientas (`DevTools Hub`): paleta oscura, tipografías (`Inter` + `IBM Plex Mono`), tarjetas agrupadas y acentos de color funcional (`#34d399` para verde y `#f87171` para rojo).
- **Persistencia Local**: almacenamiento automático mediante la API `localStorage` (`prosconshub:lists` y `prosconshub:last`).

## Limitaciones a tener en cuenta

- La información no se sincroniza en la nube; los datos son locales del navegador a menos que se exporten manualmente en formato `.json`.
- Al borrar el último punto de una lista o vaciar el texto de un elemento editable, la columna se ajusta y actualiza el veredicto en tiempo real sin confirmar acción.
- El cálculo del balance se limita a 3 niveles de peso máximo por cada punto para mantener la simplicidad en la toma de decisiones.