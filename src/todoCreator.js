import { Todo } from "./DOMproject";
import { populateTodoList } from "./DOMtodo";

const dialog = document.getElementById("todoDialog");
const form = document.getElementById("todoForm");
const cancelBtn = document.getElementById("cancelTodo");

const dueDateInput = document.getElementById('todoDueDate');
const today = new Date().toISOString().split("T")[0];
dueDateInput.min = today;

  
cancelBtn.addEventListener('click', () => {
    dialog.close();
    form.reset();
});
  
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('todoName').value.trim();
    const dueDate = new Date(dueDateInput.value);
    const note = document.getElementById('todoNote').value.trim();
    createNewTodo(name,dueDate,note);

    dialog.close();
    form.reset();
});  


function createNewTodo (name,date,note) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const projectName = document.querySelector(".top h1").textContent;
    const proj = projects.find(p => p.name === projectName);

    proj.todo.push(new Todo(name, date, note, []));
    proj.todo.sort((a,b) => a.dueDate - b.dueDate);
    localStorage.removeItem("projects");
    localStorage.setItem("projects", JSON.stringify(projects));
    populateTodoList(projectName);
}

function removeTodo (name) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const projectName = document.querySelector(".top h1").textContent;
    const proj = projects.find(p => p.name === projectName);

    proj.todo = proj.todo.filter(obj => obj.name !== name);

    localStorage.setItem("projects", JSON.stringify(projects));
}

export {removeTodo};