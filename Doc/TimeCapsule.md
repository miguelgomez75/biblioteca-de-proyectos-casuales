# timecapsule::hub — Mensajes con bloqueo temporal

Página de una sola vista (`TimeCapsule.html`) diseñada para escribir y almacenar mensajes dirigidos al futuro, manteniéndolos bloqueados hasta que se alcance una fecha y hora exactas. Funciona de manera autónoma en el navegador, combinando persistencia local con lectura de archivos JSON estáticos sin backend.

## Qué hace

### Creación y bloqueo de cápsulas

* **Formulario de redacción**: permite definir un título (obligatorio), el mensaje en texto plano, la fecha de apertura y la hora exacta (configurada por defecto a las 08:00).

* **Validación en tiempo real**: calcula el tiempo restante dinámicamente y previene la creación de cápsulas orientadas a fechas o horas pasadas.

* **Sellado temporal**: al confirmar el bloqueo, la cápsula se guarda con su identificador único, contenido, metadatos y la marca de tiempo exacta de apertura.

### Listado y temporizadores

* **Estados visuales diferenciados**:

  * **Cápsulas bloqueadas (🔒)**: marcadas con un borde distintivo. Muestran la fecha programada junto a un contador dinámico que calcula los días, horas y minutos restantes. El botón de apertura permanece deshabilitado.

  * **Cápsulas disponibles (🔓)**: destacadas en verde. Habilitan la lectura del contenido.

* **Lectura e inspección**: al abrir una cápsula desbloqueada, el mensaje se despliega con su texto completo, la fecha de creación original y la fecha de apertura.

* **Gestión de cápsulas**: permite eliminar registros individuales mediante confirmación manual.

### Sincronización y persistencia (JSON + LocalStorage)

* **Carga híbrida**: intenta leer inicialmente el archivo estático `capsules.json` del servidor o repositorio. En caso de fallo o ejecución en entorno local sin servidor, recurre automáticamente a la memoria del navegador (`localStorage`).

* **Exportación estática**: incluye la función **"💾 Descargar JSON"** para guardar el conjunto de cápsulas actualizado en un archivo `.json` que se puede guardar en el proyecto para compartir datos entre usuarios.

* **Importación manual**: permite cargar archivos `.json` previamente guardados mediante el botón **"📁 Cargar JSON"**.

## Tecnología

* HTML + CSS + JavaScript "vanilla" estructurado en un único archivo.

* Mismo lenguaje visual que el resto de herramientas del ecosistema (`DevTools Hub`): paleta en tonos oscuros, tipografías (`Inter` + `IBM Plex Mono`), componentes modulares y sistema de notaciones dinámicas (*toasts*).

* **Persistencia e integración**: uso de la API `localStorage` (`timecapsulehub:capsules`) y solicitudes `fetch()` asíncronas con deshabilitación de caché (`?v=timestamp`).

## Limitaciones a tener en cuenta

* **Verificación del reloj**: la validación de tiempo depende del reloj del sistema operativo del usuario. Modificar la fecha u hora local del dispositivo permite desbloquear la visualización antes de tiempo.

* **Sin cifrado criptográfico**: los mensajes se almacenan en texto plano en el archivo `.json` o en `localStorage`, por lo que esta herramienta está diseñada para privacidad a nivel de interfaz y no para la protección de datos confidenciales.

* **Sincronización compartida**: para actualizar las cápsulas públicas en un repositorio o servidor estático (como GitHub Pages), es necesario descargar el archivo `capsules.json` e incluirlo en la raíz del proyecto.