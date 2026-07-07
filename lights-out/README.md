# Lights Out

Puzzle Lights Out con generación aleatoria de tableros **siempre resolubles**, hecho en HTML/CSS/JS puro (un único archivo, sin dependencias de build).

## Cómo funciona

- **Reglas del juego**: pulsar un botón invierte su estado y el de sus vecinos ortogonales (arriba, abajo, izquierda, derecha). El objetivo es apagar todas las luces.
- **Generación garantizada resoluble**: cada tablero nuevo parte del estado "todo apagado" y aplica una secuencia de pulsaciones aleatorias. Como pulsar dos veces el mismo botón lo devuelve a su estado original, cualquier tablero generado así siempre puede resolverse (basta con pulsar de nuevo los mismos botones, aunque no necesariamente en el mismo orden).
- **Pista**: usa eliminación gaussiana sobre GF(2) para calcular exactamente qué botones hay que pulsar desde el estado actual para llegar a "todo apagado", y los resalta con un anillo verde.
- **Tamaños**: de 3×3 a 7×7.
- **Mejor puntuación**: se guarda en `localStorage` por tamaño de tablero.

## Desplegar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público, para poder usar Pages gratis).
2. Sube el archivo `index.html` de esta carpeta a la raíz del repositorio.
3. Ve a **Settings → Pages** en el repositorio.
4. En "Build and deployment", elige **Deploy from a branch**, selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
5. Guarda. GitHub te dará una URL del tipo `https://tu-usuario.github.io/tu-repo/` en uno o dos minutos.

### Alternativa por línea de comandos

```bash
git init
git add index.html README.md
git commit -m "Lights Out playable"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Luego activa Pages como en el paso 3-5 de arriba.

## Personalizar

Todo el juego está en `index.html`: los estilos (paleta de colores tipo panel eléctrico industrial) están en el `<style>` del `<head>`, y la lógica en el `<script>` al final del `<body>`. No hay dependencias externas salvo las tipografías de Google Fonts (Oswald e IBM Plex Mono), cargadas por `<link>`.

Ideas para ampliar:
- Un modo "clic derecho" para marcar notas sin pulsar.
- Un contador de movimientos mínimos (la solución de la eliminación gaussiana no siempre es la de menor número de pulsaciones si el sistema tiene grados de libertad; se podría comparar todas las soluciones del núcleo para quedarse con la más corta).
- Compartir el tablero actual mediante un parámetro en la URL.
