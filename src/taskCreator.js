import { populateTodoList } from "./DOMtodo";

const dialog = document.getElementById("taskDialog");
const form = document.getElementById("taskForm");
const cancelBtn = document.getElementById("cancelTask");

cancelBtn.addEventListener('click', () => {
    dialog.close();
    form.reset();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('taskName').value.trim();
    createNewTask(name);

    dialog.close();
    form.reset();
});

function createNewTask (name) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const projectName = document.querySelector(".top h1").textContent;
    const proj = projects.find(p => p.name === projectName);
    const titleDialogTask = document.querySelector("#taskForm h3");
    const todo = proj.todo.find(m => m.name === titleDialogTask.id );

    todo.task.push(name);
    
    localStorage.removeItem("projects");
    localStorage.setItem("projects", JSON.stringify(projects));
    populateTodoList(projectName);
}