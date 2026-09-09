const API = "http://localhost:3000";
let editingId = null;
let editingStatus = "todo";

async function loadTasks() {
  const res = await fetch(API + "/tasks");
  const tasks = await res.json();
  document.getElementById("list-todo").innerHTML = "";
  document.getElementById("list-doing").innerHTML = "";
  document.getElementById("list-done").innerHTML = "";
  for (let t of tasks) {
    const div = document.createElement("div");
    div.className = "card";
    div.dataset.id = t.id;
    div.innerHTML = "<b>" + t.title + "</b><div><span class='badge badge-" + t.priority + "'>" + t.priority + "</span> | " + (t.duedate || "") + "</div><p>" + (t.description || "") + "</p>";
    if (t.status === "todo") document.getElementById("list-todo").appendChild(div);
    if (t.status === "doing") document.getElementById("list-doing").appendChild(div);
    if (t.status === "done") document.getElementById("list-done").appendChild(div);
  }
  document.getElementById("count-todo").textContent = document.getElementById("list-todo").children.length;
  document.getElementById("count-doing").textContent = document.getElementById("list-doing").children.length;
  document.getElementById("count-done").textContent = document.getElementById("list-done").children.length;
}

const modal = document.getElementById("modal");

document.getElementById("newBtn").onclick = () => {
  editingId = null;
  editingStatus = "todo";
  document.getElementById("modalTitle").textContent = "Nueva tarea";
  document.getElementById("tasksForm").reset();
  document.getElementById("deleteBtn").classList.add("hidden");
  document.getElementById("comments").innerHTML = "";
  modal.classList.remove("hidden");
};

document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

document.getElementById("tasksForm").onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById("fTitle").value,
    description: document.getElementById("fDesc").value,
    priority: document.getElementById("fPriority").value,
    duedate: document.getElementById("fDate").value
  };
  if (editingId) {
    await fetch(API + "/tasks/" + editingId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, status: editingStatus })
    });
  } else {
    data.status = "todo";
    await fetch(API + "/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
  modal.classList.add("hidden");
  loadTasks();
};

document.getElementById("board").onclick = async (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  editingId = card.dataset.id;
  const res = await fetch(API + "/tasks/" + editingId);
  const t = await res.json();
  editingStatus = t.status;
  document.getElementById("modalTitle").textContent = "Detalle";
  document.getElementById("fTitle").value = t.title;
  document.getElementById("fDesc").value = t.description || "";
  document.getElementById("fPriority").value = t.priority;
  document.getElementById("fDate").value = t.duedate || "";
  document.getElementById("deleteBtn").classList.remove("hidden");
  modal.classList.remove("hidden");
  loadComments(editingId);
};

document.getElementById("deleteBtn").onclick = async () => {
  if (!confirm("¿Borrar tarea?")) return;
  await fetch(API + "/tasks/" + editingId, { method: "DELETE" });
  modal.classList.add("hidden");
  loadTasks();
};

async function loadComments(taskId) {
  const res = await fetch(API + "/comments?taskId=" + taskId);
  const list = await res.json();
  const box = document.getElementById("comments");
  box.innerHTML = "<h4>Comentarios (" + list.length + ")</h4>";
  for (let c of list) {
    box.innerHTML += "<p><b>" + c.author + ":</b> " + c.text + "</p>";
  }
  box.innerHTML += '<input id="cAuthor" placeholder="Tu nombre"><input id="cText" placeholder="Comentario..."><button id="cSend" type="button">Añadir</button>';
  document.getElementById("cSend").onclick = async () => {
    await fetch(API + "/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: String(taskId),
        author: document.getElementById("cAuthor").value,
        text: document.getElementById("cText").value,
        createdat: new Date().toISOString()
      })
    });
    loadComments(taskId);
  };
}

for (let status of ["todo", "doing", "done"]) {
  new Sortable(document.getElementById("list-" + status), {
    group: "kanban",
    ghostClass: "drag-ghost",
    onEnd: async (e) => {
      const id = e.item.dataset.id;
      const newStatus = e.to.id.replace("list-", "");
      await fetch(API + "/tasks/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      loadTasks();
    }
  });
}

document.getElementById("search").oninput = (e) => {
  const q = e.target.value.toLowerCase();
  for (let card of document.querySelectorAll(".card")) {
    card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
  }
};

document.getElementById("menuBtn").onclick = () => {
  document.getElementById("stats").classList.toggle("hidden");
};

loadTasks();