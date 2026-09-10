# FlowKanban - Tablero tipo Trello
Tablero Kanban con 3 columnas (Por hacer todo, En proceso doing, Finalizado done). Crea, edita, mueve con drag, comenta y borra. API con json-server.

# Diseño
docs/wireframe.png baja fidelidad
docs/board.png + docs/detalle.png mockup Stitch azul #2563EB + pizarra
Badges Alta/Media/Baja, responsive 3 a 1 columna.

# Instalar
npm install
Ejecutar API
npm run api
Abre http://localhost:3000/tasks

# Ejecutar frontend
Abre index.html con Live Server.

# Endpoints
GET /tasks lista
POST /tasks crea status todo
PUT /tasks/:id edita conservando status
PATCH /tasks/:id cambia status al arrastrar
DELETE /tasks/:id borra
GET /comments?taskId= comentarios
POST /comments añade con createdat

# Estructura
index.html, styles.css, app.js, db.json con duedate y createdat en minusculas spec.