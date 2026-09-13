# Definición de Mockups y Prototipo UI - FlowKanban

## 1. Concepto Visual y Diseño (UI/UX)
El diseño de **FlowKanban** está inspirado en estándares modernos de herramientas de gestión (estilo Trello/Linear), aplicando principios de diseño modular (Atomic Design) y la teoría de la Gestalt para agrupar visualmente la información mediante jerarquía tipográfica, tarjetas limpias y contraste adecuado.

---

## 2. Paleta de Colores y Tipografía

* **Tipografía:** `Inter`, sistema Sans-Serif (`system-ui, sans-serif`).
* **Colores Principales:**
  * Fondo general: `#F8FAFC` (Slate 50)
  * Superficies y tarjetas: `#FFFFFF` (Blanco puro)
  * Texto principal: `#0F172A` (Slate 900)
  * Texto secundario: `#475569` (Slate 600)
  * Color Primario (Acción): `#2563EB` (Blue 600)
  * Bordes y separadores: `#CBD5E1` (Slate 300) / `#E2E8F0` (Slate 200)

* **Badges de Prioridad:**
  * 🔴 **Alta:** Fondo `#FEE2E2` (Red 100) | Texto `#B91C1C` (Red 700)
  * 🟡 **Media:** Fondo `#FEF3C7` (Amber 100) | Texto `#92400E` (Amber 800)
  * 🟢 **Baja:** Fondo `#DCFCE7` (Green 100) | Texto `#166534` (Green 800)

---

## 3. Especificaciones del Mockup del Tablero (`board.png`)
* **Barra superior fija (`sticky`):** Logo alineado a la izquierda, barra de búsqueda centralizada con icono, botón de acción primario `+ Nueva tarea` a la derecha con sombra sutil y efecto hover.
* **Métricas rápidas:** Etiquetas con badges redondeados indicando la cantidad de elementos en cada columna (`Por hacer`, `En proceso`, `Finalizado`).
* **Columnas del Tablero:** Grid de 3 columnas con fondo gris suave (`#E2E8F0`), esquinas redondeadas (`14px`), cabecera con título y botón de adición rápida, y contenedor interno flexible (`.list`) con indicador visual cuando está vacío ("Arrastra tarjetas aquí").
* **Tarjetas de Tarea:** Tarjetas blancas con sombra ligera (`box-shadow`), efecto de elevación en `hover`, título legible, descripción truncada a dos líneas y footer con badge de prioridad y fecha límite.

---

## 4. Especificaciones del Mockup del Modal (`detalle.png`)
* **Contenedor Modal:** Ventana central flotante con fondo blanco, esquinas redondeadas y sombra profunda (`rgba(0,0,0,0.2)`), con overlay semitransparente oscuro (`background: rgba(15,23,42,.55)`).
* **Fila Superior de Configuración:** Distribución horizontal mediante Flexbox para los selectores de **Prioridad**, **Fecha de entrega** y **Estado**.
* **Campos Editables:** Inputs de ancho completo para título y área de texto expandible para la descripción con soporte Markdown.
* **Sección de Comentarios:** Listado con avatares circulares de usuarios, nombre, rol, tiempo relativo de publicación (`hace 2 horas`) y caja de redacción con botón `Publicar`.
* **Barra de Acciones Inferior:**
  * Izquierda: Botón de **Eliminar tarea** en tono rojo con icono de papelera.
  * Derecha: Botones secundarios de **Cancelar** y primario de **Guardar cambios**.
