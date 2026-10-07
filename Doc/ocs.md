# oc::hub — Ficha de personaje

**oc::hub** es un gestor y creador de fichas detalladas para personajes originales (OCs). Permite registrar información exhaustiva sobre la identidad, apariencia, personalidad, historia y atributos de cada personaje, además de ofrecer una vista limpia de lectura y opciones de exportación.

---

## Características principales

* **Roster de personajes**: Lista lateral interactiva para crear, seleccionar, exportar y eliminar personajes.
* **Modos Editor / Vista**:
  * **Modo Editar**: Formulario estructurado por bloques para rellenar campos de texto y listas dinámicas.
  * **Modo Ver ficha**: Genera una vista de lectura en formato tarjeta, organizada, limpia y compacta.
* **Categorías de información detalladas**:
  * **Identidad**: Nombre, apodo, edad, género, pronombres y ocupación.
  * **Especie / Raza**: Selección entre múltiples especies predefinidas o campo libre personalizado.
  * **Apariencia física**: Altura, complexión, piel, ojos, pelo, marcas distintivas, vestimenta y descripción general.
  * **Personalidad**: Rasgos (convertidos automáticamente a etiquetas/chips en la vista final), virtudes, defectos, gustos, disgustos, miedos y motivaciones.
  * **Historia de fondo**: Origen, infancia, evento definitorio e historia libre.
  * **Listas dinámicas repetibles**: Habilidades/poderes, relaciones personales e inventario de objetos (con posibilidad de añadir o eliminar ítems libremente).
  * **Voz y manierismos**: Frase característica, tono de voz y manías/tics.
  * **Meta**: Autor, universo/fandom, inspiración y notas privadas.
* **Exportación JSON**: Descarga la ficha completa del personaje activo en formato `.json` para copia de seguridad o transferencia.
* **Persistencia local**: Almacena todos los personajes en el navegador vía `localStorage` bajo la clave `ochub_characters`.

---

## Estructura de archivos y tecnologías

* **Tecnologías**: HTML5, CSS3 (CSS Grid, Flexbox, interfaz responsive) y JavaScript ES6 vanilla.
* **Tipografías**: *Inter* y *IBM Plex Mono* (mediante Google Fonts).
* **Dependencias externas**: Archivo script local `../theme.js` para el soporte de temas claro/oscuro.

---

## Estructura del objeto Personaje (`JSON`)

```json
{
  "id": "p1",
  "identidad": {
    "nombre": "Aria",
    "apodo": "Sombra",
    "edad": "24",
    "genero": "Femenino",
    "pronombres": "Ella",
    "ocupacion": "Exploradora"
  },
  "especie": {
    "tipo": "Humano",
    "personalizada": ""
  },
  "apariencia": {
    "altura": "1.70m",
    "complexion": "Atlética",
    "piel": "Pálida",
    "ojos": "Verdes",
    "pelo": "Negro",
    "marcas": "Cicatriz en la mano",
    "vestimenta": "Capa oscura",
    "descripcion": "Suele llevar ropa cómoda para pasar desapercibida."
  },
  "personalidad": {
    "rasgos": "Leal, Cautelosa, Curiosa",
    "virtudes": "Determinación",
    "defectos": "Desconfiada",
    "miedos": "Espacios cerrados",
    "motivaciones": "Descubrir la verdad",
    "gustos": "Lectura, Mapas",
    "disgustos": "Ruido excesivo"
  },
  "historia": {
    "origen": "Distrito Norte",
    "infancia": "",
    "evento": "",
    "libre": "Creció viajando entre diferentes asentamientos..."
  },
  "habilidades": [
    {
      "nombre": "Sigilo",
      "descripcion": "Moverse sin hacer ruido en la oscuridad"
    }
  ],
  "relaciones": [
    {
      "nombre": "Kael",
      "tipo": "Aliado",
      "nota": "Compañero de viaje"
    }
  ],
  "inventario": [
    {
      "nombre": "Daga de acero",
      "descripcion": "Arma corta de herencia familiar"
    }
  ],
  "voz": {
    "frase": "Nunca dejes que te vean venir.",
    "tono": "Suave y pausado",
    "manias": "Toca su brazalete cuando se pone nerviosa"
  },
  "meta": {
    "autor": "Usuario",
    "universo": "Original",
    "inspiracion": "",
    "notas": ""
  }
}
```