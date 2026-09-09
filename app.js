const API = "http://localhost:3000";
async function loadTasks() {
    const res = await fetch(API + "/tasks");
    const tasks = await res.json();
    document.getElementById("list-todo").innerHTML = "";
    for (let t of tasks) {
        const div = document.createElement("div");
        div.className = "card";
        div.dataset.id = t.id;
        div.innerHTML = "<b>" + t.title + "</b><div><span>" + t.priority + "</span> | " + t.duedate + "</div>";
        if (t.status === "todo") document.getElementById("list-todo").appendChild(div);
    }
}
loadTasks();