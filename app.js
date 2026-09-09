const API = "http://localhost:3000";
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
        div.innerHTML = "<b>" + t.title + "</b><div><span>" + t.priority + "</span> | " + t.duedate + "</div>";
        if (t.status === "todo") document.getElementById("list-todo").appendChild(div);
        if (t.status === "doing") document.getElementById("list-doing").appendChild(div);
        if (t.status === "done") document.getElementById("list-done").appendChild(div);
    }
    document.getElementById("count-todo").textContent = document.getElementById("list-todo").children.length;
    document.getElementById("count-doing").textContent = document.getElementById("list-doing").children.length;
    document.getElementById("count-done").textContent = document.getElementById("list-done").children.length;
}
loadTasks();

let editingId = null;
document.getElementById("newBtn").onclick = () => {
    modal.classList.remove("hidden");
};
document.getElementById("tasksForm").onsubmit = async (e) => {
    e.preventDefault();
    const data = { title: fTitle.value, description: fDesc.value, priority: fPriority.value, duedate: fDate.value, status: "todo"};
    await fetch(API + "/tasks", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) });
    modal.classList.add("hidden");
    loadTasks();
};