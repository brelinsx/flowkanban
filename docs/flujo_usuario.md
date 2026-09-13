# Flujo de Usuario (User Flow) - FlowKanban

## 1. Diagrama de Navegación e Interacción

```
[ Inicio / Carga de la App ]
           │
           ├─► 1. GET /tasks y /comments (Carga inicial desde json-server)
           │
           ├─► 2. Renderizado dinámico en el DOM por columnas (todo, doing, done)
           │
           ▼
   [ Interacciones del Usuario ]
           │
           ├─► A. Búsqueda en Tiempo Real
           │     └─► Filtra tarjetas instantáneamente en el DOM según el texto ingresado.
           │
           ├─► B. Crear Nueva Tarea (+ Nueva tarjeta)
           │     └─► Abre Modal ──► Rellena formulario ──► POST /tasks (por defecto "todo") ──► Actualiza DOM.
           │
           ├─► C. Mover Tarjetas (Drag & Drop con SortableJS)
           │     └─► Arrastrar tarjeta de columna A a B ──► PATCH /tasks/:id { status } ──► Actualiza contadores y servidor.
           │
           ├─► D. Ver / Editar Detalle de Tarjeta (Clic en tarjeta)
           │     └─► Abre Modal con datos ──► PUT/PATCH /tasks/:id ──► Actualiza tarjeta en el DOM.
           │
           ├─► E. Sistema de Comentarios
           │     └─► Visualiza GET comentarios filtrados por taskId ──► Escribe comentario ──► POST /comments ──► Actualiza lista.
           │
           └─► F. Eliminar Tarjeta
                 └─► Clic en Botón Borrar ──► DELETE /tasks/:id (y sus comentarios asociados) ──► Remueve del DOM.
```

---

## 2. Descripción Detallada de los Flujos Principales

### Flujo 1: Inicio y Sincronización con API
1. Al cargar la página (`DOMContentLoaded`), la aplicación ejecuta solicitudes `fetch` simultáneas a `json-server` (`/tasks` y `/comments`).
2. Los datos obtenidos se almacenan en el estado global de la aplicación en JavaScript.
3. Se renderizan las tarjetas en su respectiva columna según su propiedad `status` y se actualizan los contadores del `#stats`.

### Flujo 2: Creación de Tareas (`POST`)
1. El usuario hace clic en `+ Nueva tarjeta`.
2. Se despliega el modal interactivo con el formulario limpio.
3. El usuario completa Título, Descripción, Prioridad y Fecha.
4. Al enviar (`submit`), se realiza un `POST` a `http://localhost:3000/tasks` asignando el estado inicial `todo`.
5. La respuesta exitosa actualiza el estado local, renderiza la nueva tarjeta en la columna "Por hacer" y recalcula estadísticas.

### Flujo 3: Drag & Drop e Intercambio de Estados (`PATCH`)
1. El usuario arrastra una tarjeta desde "Por hacer" hacia "En proceso".
2. SortableJS detecta la soltura (`onEnd`) y captura el ID de la tarjeta y el `data-status` de la nueva columna receptora.
3. Se emite una petición `PATCH` a `/tasks/:id` con `{ status: "doing" }`.
4. El servidor persiste el cambio y la interfaz actualiza los contadores de estadísticas en tiempo real.

### Flujo 4: Detalle, Edición y Comentarios (`GET`, `PUT`/`PATCH`, `POST`, `DELETE`)
1. Al hacer clic sobre cualquier tarjeta, se abre el modal cargando los datos correspondientes.
2. El usuario puede modificar el título, descripción, prioridad, fecha o estado (petición `PUT`/`PATCH`).
3. En la sección inferior, se consultan y muestran los comentarios vinculados a esa tarea.
4. El usuario puede redactar un comentario y pulsar "Publicar" (`POST /comments`).
5. Si decide eliminar la tarea, pulsa "Eliminar tarea", lo que dispara un `DELETE /tasks/:id` tras confirmación, removiendo la tarjeta de la interfaz permanentemente.
