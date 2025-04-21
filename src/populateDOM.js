import { removeProject } from "./projectCreator";

function Todo (name, dueDate, note, task) {
    this.name = name;
    this.dueDate = dueDate;
    this.note = note;
    this.task = task;
}
function Project(name, priority, todo) {
    this.name = name;
    this.priority = priority;
    this.todo = todo;
}


function checkLocalStorage () {
    let projects = [];
    if (localStorage.getItem("projects") != null) {
        projects.push(JSON.parse(localStorage.getItem("projects")));
    } 
    else {
        projects.push(
        new Project("test",6,[]),
        new Project("test2",5,[new Todo("testTodo2", "somedate", 5, "blabla",["task1","task2"]),new Todo("testTodo3", "somedate", 1, "blabla",["task1","task2","task3","task4"])]),
        new Project("test3",1,[new Todo("testTodo4", "somedate", 2, "blabla",["task1","task2"])])
        );
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    projects.sort((a,b) => a.priority - b.priority);   
}


function populateProjectList () {
    const container = document.querySelectorAll("#listProjects");
    let projects = JSON.parse(localStorage.getItem("projects"));

    container.forEach(function(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    });

    const listProjects = document.querySelector("#listProjects");

    projects.forEach(element => {
        const title = document.createElement("li");
        title.setAttribute("id", element.name);
        title.textContent = element.name;
        title.addEventListener("click", () => {
            populateTodoList(element.name);
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", element.name+"delete");
        deleteBtn.textContent="X"
        deleteBtn.addEventListener("click", () => {
            removeProject(title.id);
            title.remove();
        })
        title.appendChild(deleteBtn);
        listProjects.appendChild(title);
    });

    console.log(projects);
}

function populateTodoList (projectName) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const container = document.querySelectorAll(".main");

    container.forEach(function(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    });

    const header = document.querySelector(".top h1");
    header.textContent = projectName;

    const dialog = document.getElementById("todoDialog");   
    const newTodoBtn = document.querySelector(".newTodo");
    newTodoBtn.setAttribute("id", "newTodo"+projectName)
    newTodoBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    const listTodo = document.querySelector(".main");
    const proj = projects.find(p => p.name === projectName);
    
    const todo = proj.todo;
    todo.sort((a,b) => a.priority - b.priority);
    todo.forEach(todo => {
        const div = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = todo.name;
        div.appendChild(title);
        const date = document.createElement("h4");

        listTodo.appendChild(div);
    }); 
}



export {checkLocalStorage, populateProjectList, populateTodoList, Project, Todo};