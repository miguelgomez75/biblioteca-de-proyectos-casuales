# tradingcards::hub — Colección y apertura de sobres

**tradingcards::hub** es una aplicación web interactiva diseñada para simular la experiencia de abrir sobres de cartas coleccionables (*booster packs*) y gestionar el álbum de una colección completa. La información de las colecciones, las cartas, las rarezas y las probabilidades se consulta de forma dinámica desde un archivo JSON remoto alojado en GitHub.

---

## Características principales

* **Carga remota de colecciones**:
  * Permite conectarse a cualquier repositorio público de GitHub indicando el usuario, repositorio, rama y ruta del archivo `cards.json` (por defecto apunta a GitHub Raw).
  * Soporta múltiples colecciones dentro del mismo archivo JSON.

* **Apertura e interacción con sobres**:
  * **Selección de tipo de sobre**: Cada colección puede ofrecer distintos tipos de sobre con sus propios contenidos y garantías.
  * **Efectos de cartas y animación**: Revelado interactivo (*flip*) con animaciones 3D.
  * **Rarezas y destellos**: Variedad de niveles de rareza con efectos de iluminación (*glow*) específicos.
  * **Indicadores visuales**: Etiqueta destacada de **"NUEVA"** para las cartas obtenidas por primera vez.

* **Sistema de probabilidades y sorteo**:
  * **Algoritmo ponderado**: Selección aleatoria basada en pesos (*weights*) definidos para cada rareza.
  * **Garantías por sobre**: Opción de definir ranuras (*slots*) obligatorias para rarezas específicas (ej. al menos 1 carta Rara o superior por sobre).

* **Gestión del álbum de colección**:
  * **Progreso global**: Porcentaje total completado y contador de sobres abiertos.
  * **Desglose por rareza**: Barras de estado individuales para monitorizar el porcentaje de colección de cada categoría de rareza.
  * **Visor de cartas y duplicadas**: Visualización de las cartas obtenidas y marcador de duplicadas ($\times N$).
  * **Ranuras no descubiertas**: Siluetas oscurecidas con el reverso de la carta para las piezas pendientes de obtener.
  * **Reseteo de progreso**: Posibilidad de reiniciar las estadísticas y cartas guardadas para una colección concreta.

* **Persistencia local**:
  * Guarda automáticamente las cartas conseguidas, número de copias acumuladas y sobres abiertos en el `localStorage` del navegador bajo la clave `tradingcardshub:progress:<collection_id>`.

---

## Estructura de archivos y tecnologías

* **Tecnologías**: HTML5, CSS3 (CSS Grid, Flexbox, transformaciones 3D `preserve-3d`) y JavaScript ES6 vanilla (Fetch API, Async/Await).
* **Tipografías**: *Inter* y *IBM Plex Mono* (Google Fonts).
* **Dependencias externas**: Script local `../theme.js` para el soporte de temas claro/oscuro.

---

## Estructura del archivo `cards.json`

El archivo de configuración remoto debe estructurarse con el siguiente esquema:

```json
{
  "collections": [
    {
      "id": "fantasy_vol1",
      "name": "Colección Fantasía Vol. 1",
      "description": "Cartas coleccionables del reino elemental.",
      "cardBack": "https://ejemplo.com/reverso.png",
      "rarities": [
        { "id": "common", "name": "Común", "color": "#9e9e9e", "weight": 70 },
        { "id": "rare", "name": "Rara", "color": "#2196f3", "weight": 20 },
        { "id": "legendary", "name": "Legendaria", "color": "#ff9800", "weight": 10 }
      ],
      "packTypes": [
        {
          "id": "standard_pack",
          "name": "Sobre Estándar",
          "cardCount": 5,
          "guarantees": ["common", "common", "common", "common", "rare"]
        }
      ],
      "cards": [
        {
          "id": "c01",
          "name": "Guerrero del Viento",
          "rarity": "common",
          "image": "https://ejemplo.com/c01.png"
        },
        {
          "id": "c02",
          "name": "Dragón de Fuego",
          "rarity": "legendary",
          "image": "https://ejemplo.com/c02.png"
        }
      ]
    }
  ]
}
```

---

## Estructura de persistencia (`localStorage`)

El progreso se almacena mediante una clave dinámica individual por colección:

* **Clave**: `tradingcardshub:progress:fantasy_vol1`
* **Contenido**:

```json
{
  "packsOpened": 12,
  "ownedCards": {
    "c01": 4,
    "c02": 1
  }
}
```