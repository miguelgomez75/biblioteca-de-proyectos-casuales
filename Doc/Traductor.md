# translate::hub — Traductor de texto

Página de una sola vista (`index.html`) que traduce texto entre idiomas. Sin backend propio: las traducciones se piden directamente desde el navegador a una API pública gratuita.

## Qué hace

- **Selectores de idioma origen/destino** con 19 idiomas (español, inglés, francés, alemán, italiano, portugués, neerlandés, ruso, japonés, chino simplificado, coreano, árabe, turco, polaco, sueco, griego, catalán, euskera, gallego).
- **Botón de intercambio (⇄)**: invierte los idiomas origen/destino y, si ya hay una traducción en pantalla, la coloca como nuevo texto de entrada y vuelve a traducir en el sentido contrario.
- **Traducción automática mientras se escribe**: cada cambio en el texto dispara una traducción tras una pequeña pausa (debounce de 700 ms) para no lanzar una petición por cada pulsación; también se puede forzar con el botón "Traducir" o con `Ctrl/Cmd + Enter`.
- **Cancelación de peticiones obsoletas**: si el texto cambia antes de que responda la traducción anterior, esa petición se aborta (`AbortController`) para que una respuesta tardía no sobrescriba el resultado de una búsqueda más reciente.
- **Contador de caracteres** (0/500) que se pone en rojo al llegar al límite; el límite de 500 caracteres corresponde al uso anónimo (sin clave) de la API de traducción.
- **Estados claros de la interfaz**: caja de resultado vacía con mensaje de ayuda, estado de carga con spinner mientras se traduce, y aviso (banner) si el servicio no responde, se agota su límite de uso o falla la conexión.
- **Atajo para el mismo idioma**: si origen y destino coinciden, se muestra el texto tal cual, sin llamar a la API.
- **Copiar traducción** al portapapeles con confirmación visual ("Copiado ✓").
- **Historial de la sesión**: las últimas 8 traducciones se guardan como "chips" clicables (con el par de idiomas y el texto original) que permiten recuperar una traducción anterior sin volver a pedirla.
- **Limpiar**: vacía el texto de entrada, el resultado y el historial visual de la caja actual (el historial de chips no se borra con este botón).

## Fuente de datos externa

| Uso | Fuente | Notas |
|---|---|---|
| Traducción de texto | [MyMemory Translation API](https://mymemory.translated.net/) (`api.mymemory.translated.net`) | Pública, sin API key; límite de uso anónimo (aprox. 500 caracteres por petición y una cuota diaria total). |

## Tecnología

- HTML + CSS + JavaScript "vanilla" (sin frameworks ni build step), todo en un único archivo.
- Mismo lenguaje visual que el resto de la suite de herramientas (`DevTools Hub`): misma paleta de color, tipografías (`Inter` + `IBM Plex Mono`) y componentes (tarjeta, banners, botones, cajas de salida).
- Todas las peticiones de red son directas desde el navegador a la API pública de MyMemory; no hay servidor intermedio ni claves de API que configurar.

## Limitaciones a tener en cuenta

- El límite de 500 caracteres por traducción es el que impone el uso gratuito y anónimo de MyMemory; textos más largos hay que traducirlos por partes.
- La API tiene una cuota diaria compartida entre todos los usuarios anónimos; si se agota, la app lo muestra como un aviso de error en lugar de romper la interfaz.
- No hay detección automática de idioma: hay que elegir explícitamente el idioma de origen.
- El historial y el texto en curso viven solo en memoria mientras la pestaña está abierta: al recargar la página se pierden.
- La calidad de la traducción depende enteramente del servicio externo (MyMemory combina traducción automática y una memoria de traducciones colaborativa); puede variar según el par de idiomas y no sustituye a un traductor profesional para textos sensibles.
