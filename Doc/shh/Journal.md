# Journaling App (journal::hub)

`journal::hub` es una aplicación web de diario personal minimalista, privada y autónoma. Permite realizar un seguimiento diario mediante notas de texto, registro de estado de ánimo (*mood tracking*), categorización por etiquetas y cálculo de rachas de hábitos, todo respaldado con cifrado opcional en el navegador mediante la Web Crypto API.

## 🚀 Características Principales

* **Registro y Cifrado Seguro**:
  * Cifrado punto a punto en el navegador (*Zero-Knowledge client-side encryption*) utilizando **AES-GCM (256-bit)** y derivación de clave por medio de **PBKDF2** (100.000 iteraciones con SHA-256).
  * La contraseña vive exclusivamente en la memoria RAM durante la sesión y nunca se almacena en `localStorage` ni en ningún servidor.

* **Seguimiento de Ánimo y Rachas**:
  * Escala visual de 5 estados de ánimo (desde 😞 hasta 😄) asociados a un indicador de color dinámico en el calendario.
  * Contador automático de racha (*streak*) que calcula los días consecutivos de escritura.

* **Navegación por Calendario**:
  * Vista mensual interactiva que muestra visualmente los días con entradas mediante un punto de color indicativo del estado de ánimo registrado.
  * Bloqueo de fechas futuras para asegurar un registro cronológico realista.

* **Búsqueda y Organización**:
  * Sistema de etiquetas (*tags*) dinámico con generación automática de filtros visuales (*chips*).
  * Búsqueda en tiempo real por texto libre, fechas o hashtags.

* **Portabilidad e Interoperabilidad**:
  * Exportación e importación completa en formato `.json` sin cifrar para garantizar la portabilidad total de tus datos personales.

## 🛠️ Especificaciones Técnicas

* **Cifrado de Datos**:
  * **Algoritmo de Cifrado Simétrico**: AES-GCM de 256 bits con vector de inicialización ($IV$) aleatorio de 12 bytes por operación.
  * **Derivación de Clave**:
    $$K = \text{PBKDF2}(\text{password}, \text{salt}_{16\text{ bytes}}, \text{iterations}=100000, \text{hash}=\text{SHA-256})$$
  * Los bloques resultantes se codifican en Base64 para su almacenamiento local.

* **Estructura de Datos (JSON)**:
  ```json
  {
    "YYYY-MM-DD": {
      "mood": 1,
      "tags": ["trabajo", "ideas"],
      "text": "Contenido de la entrada...",
      "updatedAt": "2026-09-25T10:00:00.000Z"
    }
  }
  ```

* **Tecnologías**: HTML5, CSS Custom Properties (`color-mix`), JavaScript Vanilla (ES6+ async/await), Web Crypto API (`crypto.subtle`), `localStorage` API.

## 📂 Instrucciones de Uso

1. Selecciona el día actual o cualquier fecha pasada desde el calendario o presionando el botón **Hoy**.
2. Selecciona un estado de ánimo, añade etiquetas opcionales separadas por comas y redacta tu entrada. Haz clic en **Guardar**.
3. **Proteger con contraseña**: En el panel *Seguridad*, pulsa **Proteger con contraseña** para cifrar todas tus notas guardadas. Al recargar la página, se solicitará la clave para desencriptar el diario.
4. **Respaldo**: Utiliza el botón **Exportar JSON** para crear una copia de seguridad en texto plano de tus notas antes de cambiar de dispositivo o navegador.

```

He generado el archivo de documentación `JournalHub.md` correspondiente a `Journal.html`. ¿Necesitas alguna adición o ajuste en la especificación?