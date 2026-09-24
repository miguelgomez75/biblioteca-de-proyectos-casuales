# repo::path — Navegador en Cascadas de Repositorios de GitHub

Herramienta web interactiva (*Single Page Application*) que permite explorar la estructura de archivos y directorios de un repositorio de GitHub nivel por nivel para obtener rutas relativas directamente codificadas en formato URL (`encodeURIComponent`).

## Funcionalidades Principales

* **Exploración Jerárquica en Cascadas**: Navegación dinámica nivel a nivel desde una carpeta de inicio (*Base Path*) configurada.
* **Búsqueda y Autocompletado en Combobox**: Filtro en tiempo real por texto para cada nivel con navegación opcional por teclado (flechas y `Enter`).
* **Soporte para Repositorios Públicos y Privados**: Integración opcional mediante token de acceso personal de GitHub (`ghp_...`).
* **Copiado Automático**: Copia inmediata de la ruta relativa codificada al portapapeles al seleccionar un archivo final.
* **Previsualización de Imágenes**: Detección automática y despliegue de vista previa para formatos de imagen estándar (`.png`, `.jpeg`, `.jpg`, `.gif`, `.webp`, `.svg`, `.bmp`).

## Configuración e Entradas

El panel principal requiere los siguientes parámetros:

1. **Owner**: Nombre de usuario u organización en GitHub (por defecto `miguelgomez75`).
2. **Repositorio**: Nombre del repositorio objetivo (por defecto `biblioteca-de-proyectos-casuales`).
3. **Branch**: Rama sobre la cual realizar la consulta (por defecto `Biblioteca-Mc`).
4. **Carpeta de inicio**: Subdirectorio desde el cual se calculará la ruta relativa (por defecto `imgs`).
5. **Token (opcional)**: Personal Access Token de GitHub para autorizar peticiones en repositorios privados o evitar límites de la API (`rate limiting`).

## Funcionamiento Técnico

* **API Consumida**: Utiliza la [GitHub Contents API](https://docs.github.com/en/rest/repos/contents) (`GET /repos/{owner}/{repo}/contents/{path}`).
* **Formateo de Ruta**: La ruta resultante elimina el prefijo configurado en "Carpeta de inicio" y aplica codificación URI por cada segmento respetando la estructura de separadores `/`.
* **Cero Servidor Backend**: Toda la lógica se procesa en el cliente a través de Fetch API y JavaScript nativo.