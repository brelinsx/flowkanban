# FlowKanban - Tablero de Gestión de Proyectos (Kanban)

Aplicación web profesional tipo Trello / Kanban desarrollada con HTML5, CSS3, JavaScript Vanilla (ES6+), SortableJS y simulación de API REST con `json-server`. Diseñada bajo principios de **Atomic Design** y maquetación adaptativa (Responsive UI).

---

## 🚀 Características Principales y Extras Implementados

* **Estructura en 3 Columnas Fijas:** Tablero interactivo con soporte para *Por hacer* (`todo`), *En proceso* (`doing`) y *Finalizado* (`done`).
* **Operaciones CRUD Completas:** 
  * Obtención (`GET`), creación (`POST`), actualización parcial de estados y propiedades (`PATCH`), y borrado permanente (`DELETE`).
* **Drag & Drop Avanzado:** Integración con **SortableJS** para arrastrar tarjetas entre columnas con actualización automática e inmediata en el servidor mediante `PATCH`.
* **Modal de Detalle y Sistema de Comentarios:** 
  * Vista detallada de tareas, edición de campos y sistema completo de comentarios asociados por ID de tarea.
* **Extras de Puntuación Máxima:**
  * 👤 **Gestión de Asignación de Usuarios:** Selector de responsables en el formulario de tareas renderizado con avatares en las tarjetas.
  * 🏷️ **Filtro Avanzado de Prioridades:** Selector dinámico en la barra superior para filtrar instantáneamente el tablero por prioridad (*Alta*, *Media*, *Baja*).
* **Diseño UI/UX (Figma / Stitch):** Paleta de colores corporativa (`#2563EB`), tipografía *Inter*, badges de prioridad, sombras de elevación y diseño responsive optimizado con soporte para scroll vertical en dispositivos móviles.

---

## 🛠️ Tecnologías y Herramientas
* **Frontend:** HTML5 Semántico, CSS3 (Flexbox, Grid, Custom Media Queries), JavaScript Vanilla (ES6+), SortableJS.
* **Iconografía:** FontAwesome 6.4.0.
* **Backend Simulado:** `json-server` (`db.json`).
* **Control de Versiones y Diseño:** Git, GitHub, Figma / Stitch.

---

## 📦 Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar y poner en marcha el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd kanban-final
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado en tu equipo y ejecuta:
```bash
npm install
```

### 3. Ejecutar la API REST simulada (`json-server`)
Inicia el servidor local en el puerto `3000`:
```bash
npm run api
```
*(Esto levantará la API en `http://localhost:3000` con las colecciones de `tasks` y `comments`).*

### 4. Ejecutar el Frontend
Abre el archivo `index.html` en tu navegador utilizando la extensión **Live Server** de Visual Studio Code para disfrutar de la recarga en vivo y evitar restricciones CORS del protocolo `file://`.

---

## 🔌 Documentación de Endpoints (`json-server`)

La comunicación con el servidor simula un backend REST robusto:

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/tasks` | Obtiene el listado completo de tarjetas del tablero. |
| **POST** | `/tasks` | Crea una nueva tarea (asignando por defecto el estado `todo`). |
| **PATCH** | `/tasks/:id` | Actualiza de forma parcial las propiedades de la tarea (título, descripción, prioridad, fecha, responsable o estado) garantizando la integridad de los datos. |
| **DELETE** | `/tasks/:id` | Elimina permanentemente una tarea del servidor. |
| **GET** | `/comments?taskId=:id` | Obtiene los comentarios asociados a una tarjeta específica. |
| **POST** | `/comments` | Añade un nuevo comentario con marca de tiempo (`createdat`). |

---

## 📂 Estructura de Documentación (`docs/`)
Los entregables de diseño y flujos se encuentran organizados en la carpeta `/docs`:
* `docs/wireframe_baja.md`: Wireframes estructurales de baja fidelidad.
* `docs/mockup_definicion.md`: Guía de estilos, paleta de colores y especificaciones visuales.
* `docs/flujo_usuario.md`: Diagrama y descripción detallada de los flujos de usuario y consumo de API.
