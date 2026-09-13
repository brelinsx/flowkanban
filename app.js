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
    let dateHtml = t.duedate ? ` | <span style="color:#64748B;"><i class="fa-solid fa-calendar-days" style="color:#64748B; margin-right:6px;"></i>${t.duedate}</span>` : "";
    let assigneeHtml = t.assignee ? `<div style="margin-top:8px;"><span style="font-size:0.75rem; background:#F1F5F9; padding:3px 10px; border-radius:12px; color:#475569; font-weight:600; display:inline-flex; align-items:center;"><i class="fa-solid fa-user" style="color:#2563EB; margin-right:6px;"></i>${t.assignee}</span></div>` : "";
    div.innerHTML = "<b style='font-size:0.95rem; color:#0F172A;'>" + t.title + "</b><div style='margin-top:4px; font-size:0.82rem;'><span class='badge badge-" + t.priority + "'>" + t.priority + "</span>" + dateHtml + "</div><p style='font-size:0.85rem; color:#475569; margin:6px 0 0;'>" + (t.description || "") + "</p>" + assigneeHtml;
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
  editingId = null; editingStatus = "todo";
  document.getElementById("tasksForm").reset();
  document.getElementById("fStatus").value = "todo";
  document.getElementById("fAssignee").value = "";
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
    assignee: document.getElementById("fAssignee").value,
    priority: document.getElementById("fPriority").value,
    duedate: document.getElementById("fDate").value
  };
  if (editingId) {
    await fetch(API + "/tasks/" + editingId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, status: editingStatus })
    });
  } else {
    data.status = editingStatus;
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
  document.getElementById("fStatus").value = t.status;
  document.getElementById("modalTitle").textContent = "Detalle";
  document.getElementById("fTitle").value = t.title;
  document.getElementById("fDesc").value = t.description || "";
  document.getElementById("fAssignee").value = t.assignee || "";
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
    box.innerHTML += '<div class="comment-item"><div class="comment-meta"><span>' + c.author + '</span><span class="comment-time">' + new Date(c.createdat).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + '</span></div><div>' + c.text + '</div></div>';
  }
  box.innerHTML += '<div class="comment-form-group"><input id="cAuthor" placeholder="Tu nombre"><input id="cText" placeholder="Escribe un comentario..."><button id="cSend" type="button">Publicar</button></div>';
  
  document.getElementById("cSend").onclick = async () => {
    const author = document.getElementById("cAuthor").value.trim();
    const text = document.getElementById("cText").value.trim();
    if (!author || !text) {
      alert("Por favor, ingresa tu nombre y un comentario válido.");
      return;
    }
    await fetch(API + "/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: String(taskId),
        author: author,
        text: text,
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

document.getElementById("filterPriority").onchange = (e) => {
  const val = e.target.value;
  for (let card of document.querySelectorAll(".card")) {
    const badge = card.querySelector(".badge");
    const priority = badge ? badge.textContent.trim() : "";
    if (!val || priority === val) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
};

document.getElementById("menuBtn").onclick = () => {
  document.getElementById("stats").classList.toggle("hidden");
};

loadTasks();

for (let btn of document.querySelectorAll(".addCol")) {
  btn.onclick = () => {
    editingId = null;
    editingStatus = btn.dataset.status;
    document.getElementById("modalTitle").textContent = "Nueva tarea";
    document.getElementById("tasksForm").reset();
    document.getElementById("fStatus").value = btn.dataset.status;
    document.getElementById("fAssignee").value = "";
    document.getElementById("deleteBtn").classList.add("hidden");
    document.getElementById("comments").innerHTML = "";
    modal.classList.remove("hidden");
  };
}
document.getElementById("fStatus").onchange = (e) => { editingStatus = e.target.value; };
