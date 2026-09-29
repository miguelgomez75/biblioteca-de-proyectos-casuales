# Documentación Técnica: `stats::hub`

## 1. Visión General del Sistema

**`stats::hub`** (`Stats.html`) es un panel de control (*dashboard*) ligero y de ejecución exclusiva en el lado del cliente. Su propósito principal es conectarse en tiempo real a la API REST pública de GitHub para auditar, calcular y visualizar métricas consolidadas (proyectos, ficheros, líneas de código, commits y actividad reciente) de repositorios de código estructurados por carpetas.

La aplicación opera sin necesidad de backend propio o bases de datos intermedias, realizando todo el cálculo, procesamiento concurrente y renderizado de la interfaz dentro del navegador web del usuario.

## 2. Arquitectura de Software e Interfaz

### 2.1. Estructura y Componentes Visuales

El diseño se estructura mediante un contenedor principal (`.shell`, `max-width: 780px`) responsivo, dividido en cuatro componentes o tarjetas principales (`.card`):

1. **Panel de Configuración y Autenticación**:
   * Entrada del repositorio objetivo (`usuario/repositorio`).
   * Campo opcional para *Personal Access Token* (PAT) de GitHub para mitigar restricciones de frecuencia de la API (*rate limits*).
   * Persistencia configurable del token en `localStorage`.
   * Indicador visual de estado y mensajes de error o caché.

2. **Panel de Resumen Estadístico (`#summary-card`)**:
   * **Proyectos**: Subdirectorios contados en la raíz del repositorio.
   * **Líneas de código (LOC)**: Recuento total de líneas de texto analizadas.
   * **Ficheros**: Total de archivos pertenecientes a los proyectos.
   * **Commits**: Total de commits del repositorio.
   * Enlace directo al repositorio con fecha del último *push*.

3. **Panel de Listado y Controles (`#list-card`)**:
   * Buscador interactivo por nombre de proyecto.
   * Selector de ordenación (Fecha de actualización, Nombre A–Z, Número de líneas).
   * Lista detallada de proyectos mostrando su nombre, volumen de código, recuento de ficheros y tiempo transcurrido desde la última modificación.

4. **Zona Estática / Placeholder**:
   * Estado inicial antes del análisis y notas sobre privacidad de datos.

### 2.2. Integración de Estilos y Temas

La interfaz utiliza variables CSS personalizadas que heredan la paleta de color del ecosistema visual y se integran dinámicamente con el script global `theme.js`:

* **`--bg`**: Fondo oscuro general (`#0c0c10`).
* **`--surface` / `--surface-2`**: Fondo para tarjetas y controles interactivos (`#13131a` / `#1c1c26`).
* **`--accent`**: Color de acento ámbar/dorado (`#e8a030`) usado en logos, resaltados y valores numéricos.
* **`--good` / `--bad`**: Indicadores de actividad reciente (`#34d399`) o errores de API (`#f87171`).

---

## 3. Integración con la API de GitHub y Flujo de Datos

### 3.1. Proceso de Extracción e Inspección (ETL)

El análisis de un repositorio se realiza mediante un flujo de peticiones asíncronas por etapas:

```
[API Git Trees] ──> [Filtrado de Blobs] ──> [Lectura Raw de Texto (Pool)] ──> [Inspección de Commits (Pool)]
```

1. **Obtención de Metadatos y Árbol de Archivos**:
   * Petición inicial a `https://api.github.com/repos/{owner}/{repo}` para verificar existencia y rama predeterminada.
   * Petición recursiva a `https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1` para obtener la estructura completa de archivos.

2. **Filtrado y Mapeo de Proyectos**:
   * Se excluyen archivos sueltos en la raíz y directorios privados/configuración (`.github`, `shhh`, etc.).
   * Se agrupan los *blobs* por la carpeta de primer nivel (cada carpeta equivale a un "proyecto").

3. **Conteo de Líneas de Código (Concurrencia Controlada)**:
   * Se filtran únicamente los archivos de texto/código mediante una lista blanca de extensiones (`html`, `js`, `ts`, `css`, `py`, `md`, `json`, etc.) con un tamaño inferior a **400 KB** por razones de rendimiento.
   * Se descargan los contenidos mediante peticiones HTTP directas a `raw.githubusercontent.com`.
   * El cálculo de líneas de código se ejecuta utilizando una piscina de procesos concurrentes (*worker pool*) limitada a **8 peticiones simultáneas**.

4. **Análisis de Commits por Proyecto y Totales**:
   * Peticiones a la API de commits (`/commits?path={folder}`) con límite de **4 peticiones simultáneas** para identificar la fecha y mensaje de la última modificación por carpeta.
   * Extracción del total de commits del repositorio mediante inspección de cabeceras de paginación (`Link: <...page=X>; rel="last"`).

---

## 4. Gestión de Rendimiento, Caché y Autenticación

### 4.1. Concurrencia mediante Pool de Promesas

Para evitar saturar la red y el navegador con cientos de peticiones HTTP simultáneas, la función utilitaria `pool(items, limit, worker)` gestiona una cola de procesamiento con concurrencia máxima acotada:

$$\text{Peticiones Activas} = \min(\text{Límite}, \text{Longitud de Cola})$$

### 4.2. Estrategia de Caché Local

Para minimizar el consumo de la cuota de la API de GitHub, los resultados completos del análisis se almacenan en `localStorage` con una clave única basada en el repositorio:

* **Estructura en Caché**: `statshub:cache:{usuario/repositorio}`
* **Tiempo de Vida (TTL)**: 10 minutos (`10 * 60 * 1000 ms`).
* Permite recargar la información al instante o forzar una actualización manual limpia.

### 4.3. Gestión de Límite de Peticiones (*Rate Limit*)

* **Sin autenticación**: ~60 peticiones/hora asociadas a la IP.
* **Con Personal Access Token**: 5.000 peticiones/hora. El token solo requiere permisos de lectura pública (sin directivas especiales) y se envía mediante la cabecera `Authorization: Bearer {token}`.

---

## 5. Algoritmos de Interfaz y Utilidades

### 5.1. Normalización y Formato de Fechas

* **Fecha Relativa (`relativeDate`)**: Convierte sellos de tiempo ISO 8601 en representaciones legibles ("hace X minutos", "hace X días", etc.). Marca visualmente en verde los proyectos actualizados en los últimos 3 días.
* **Fecha Absoluta (`absDate`)**: Convierte la fecha al formato local (`es-ES`).

### 5.2. Filtrado y Ordenación Dinámica

La lista de proyectos se re-renderiza en el DOM mediante eventos en tiempo real:

* **Búsqueda por coincidencia parcial** de texto en el nombre del proyecto.
* **Criterios de Ordenación**:
  * **`updated`**: Por timestamp decreciente del último commit.
  * **`name`**: Orden alfabético ascendente mediante `localeCompare()`.
  * **`loc`**: Por cantidad total de líneas de código descritas.

---

## 6. Seguridades y Privacidad

* **Procesamiento 100% Local**: No existen servidores analíticos intermediarios. Las peticiones viajan directamente desde el navegador a los servidores oficiales de GitHub (`api.github.com` y `raw.githubusercontent.com`).
* **Manejo Seguro del Token**: Si el usuario decide almacenar su token, este se guarda de forma aislada en el `localStorage` del origen y nunca se expone fuera de las cabeceras HTTPS de la API oficial de GitHub.