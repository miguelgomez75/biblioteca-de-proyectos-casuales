# Expense Splitter (split::hub)

`split::hub` es una aplicación web intuitiva y autónoma diseñada para la gestión de gastos compartidos entre múltiples integrantes y grupos. Permite llevar el registro de compras, distribuir los costos de manera equitativa o personalizada, calcular automáticamente el balance de cada persona y optimizar las transferencias para saldar cuentas con la menor cantidad de movimientos posibles.

---

## 🚀 Características Principales

* **Gestión Multigrupo**:
  * Creación, renombramiento y eliminación de múltiples grupos independientes (p. ej., "Viaje a la playa", "Piso compartido").
  * Cambio dinámico entre grupos con almacenamiento de contexto activo.
* **Reparto Flexible de Gastos**:
  * **Modo Partes Iguales**: Divide automáticamente el importe ($Total / n$) entre las personas seleccionadas, asignando equitativamente los céntimos sobrantes.
  * **Modo Importes Propios**: Permite indicar exactamente cuánto debe pagar cada participante, con validación visual en tiempo real que advierte si la suma no cuadra con el total.
* **Balances e Historial**:
  * Listado completo de transacciones con concepto, pagador, participantes e importe en euros (€).
  * Panel de estado de cuentas individualizado que resalta saldos a favor (en verde) o en deuda (en rojo).
* **Algoritmo de Liquidación Eficiente**:
  * Simplificación del número de transacciones necesarias para saldar la deuda total del grupo con transferencias directas entre deudores y acreedores.
* **Importación y Exportación JSON**:
  * Respaldo completo de la información de cada grupo en archivos `.json` locales para compartir o migrar datos fácilmente.
* **Persistencia Local**:
  * Sincronización automática de grupos, miembros e historial en el `localStorage` del navegador.

---

## 🛠️ Especificaciones Técnicas

* **Modelado Numérico**: Todos los cálculos de importes se ejecutan internamente en céntimos de euro ($1\text{ €} = 100\text{ céntimos}$) para evitar errores de precisión flotante flotantes en JavaScript (`0.1 + 0.2`).
* **Algoritmo de Saldado de Cuentas**:
  1. Cálculo del saldo neto por participante: $B_i = P_i - C_i$ (donde $P_i$ es lo pagado y $C_i$ es la cuota consumida).
  2. Ordenamiento de deudores ($B_i < 0$) y acreedores ($B_i > 0$).
  3. Reducción mediante técnica codiciosa (*greedy*) acoplando pares para saldar balances mayores iterativamente con tiempo de complejidad $O(n \log n)$.
* **Tecnologías**: HTML5, CSS Custom Properties (Sass-like layout), JavaScript Vánila (ES6+), `localStorage` API.

---

## 📂 Instrucciones de Uso

1. Crea o selecciona un grupo desde la barra superior e introduce los nombres de los **Integrantes**.
2. En la sección **Añadir gasto**, ingresa el concepto, importe, quién realizó el pago y selecciona si el reparto es a partes iguales o personalizado.
3. Haz clic en **Añadir gasto** para guardar la transacción.
4. Consulta el bloque **Balance** para saber el estado actual de cada participante y revisa **Cómo saldar cuentas** para ver las transferencias recomendadas.
5. Exporta la información a un archivo JSON en caso de requerir un respaldo o compartir la información del grupo con otra persona.
```

Con esto queda generada la documentación técnica de `split::hub`. ¿Hay algún otro proyecto que quieras documentar?