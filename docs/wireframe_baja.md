# Wireframes de Baja Fidelidad - FlowKanban

## 1. Descripción General
Los wireframes de baja fidelidad representan la estructura esquemática inicial de la aplicación **FlowKanban**, priorizando la jerarquía de la información, la distribución de los componentes clave y la experiencia de usuario (UX) antes de definir la paleta de colores y el diseño visual final.

---

## 2. Estructura de la Interfaz Principal (Tablero)

```
+-------------------------------------------------------------------------+
| [≡] FlowKanban    [ Buscar por título... ]           [+ Nueva tarea] [👤] |
+-------------------------------------------------------------------------+
| Por hacer: 3   |   En proceso: 2   |   Finalizado: 5                    |
+-------------------------------------------------------------------------+
| [ Por hacer ]          | [ En proceso ]         | [ Finalizado ]        |
|                        |                        |                       |
| +--------------------+ | +--------------------+ | +--------------------+|
| | Título de Tarea    | | | Título de Tarea    | | | Título de Tarea    ||
| | Breve descripción  | | | Breve descripción  | | | Breve descripción  ||
| | [Alta] [📅 15/09]  | | | [Media] [📅 18/09] | | | [Baja] [📅 10/09]  ||
| +--------------------+ | +--------------------+ | +--------------------+|
|                        |                        |                       |
| +--------------------+ |                        |                       |
| | Otra tarea...      | |                        |                       |
| +--------------------+ |                        |                       |
+------------------------+------------------------+-----------------------+
```

---

## 3. Estructura del Modal de Detalle / Edición

```
+-------------------------------------------------------------------------+
| Detalle de Tarea                                                    [X] |
+-------------------------------------------------------------------------+
| [ PRIORIDAD ]         | [ FECHA DE ENTREGA ]   | [ ESTADO ]             |
| [ Alta            ▼ ] | [ 24 Octubre, 2024 ▼ ] | [ En proceso       ▼ ] |
+-------------------------------------------------------------------------+
| Título de la tarea                                                      |
| [ Refactorizar endpoints de analítica y optimizar consultas SQL       ] |
+-------------------------------------------------------------------------+
| Descripción                                                             |
| [ Revisión exhaustiva de latencias en el endpoint GET /api/v2...      ] |
+-------------------------------------------------------------------------+
| Actividad y Comentarios (2)                                             |
| ----------------------------------------------------------------------- |
| [ Avatar ] Martín Morales - Lead Backend                     hace 2 hrs |
|            El profiling inicial arrojó que el cuello de botella...      |
|                                                                         |
| [ Avatar ] Elena Silva - Product Owner                      hace 45 min |
|            Excelente Martín. Asegúrate de coordinar...                  |
+-------------------------------------------------------------------------+
| [ Escribe un comentario...                                ] [ Publicar ]|
+-------------------------------------------------------------------------+
| [ 🗑️ Eliminar tarea ]            [ Cancelar ]       [ Guardar cambios ] |
+-------------------------------------------------------------------------+
```

---

## 4. Componentes y Zonas Clave
1. **Header Sticky:** Acceso rápido al menú hamburguesa, logotipo, buscador en tiempo real, botón de creación y perfil de usuario.
2. **Barra de Estadísticas:** Conteo automático de tareas agrupadas por estado (`todo`, `doing`, `done`).
3. **Columnas Kanban:** Contenedores verticales con soporte para Drag & Drop (SortableJS).
4. **Modal Interactivo:** Vista detallada para edición completa de propiedades y gestión de comentarios en tiempo real.
