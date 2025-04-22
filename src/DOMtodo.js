import { isBefore, formatDistanceToNow } from 'date-fns';
import { removeTodo } from './todoCreator';


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
    console.log(todo);
    todo.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    todo.forEach(todo => {
        const div = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = todo.name;
        title.setAttribute("id", todo.name);
        div.appendChild(title);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", todo.name+"delete");
        deleteBtn.textContent="X"
        deleteBtn.addEventListener("click", () => {
            removeTodo(title.id);
            div.remove();
        })
        div.appendChild(deleteBtn);

        const now = new Date();
        let dueText;
        if (isBefore(todo.dueDate, now)) {
            dueText = '⚠️ Overdue!';
        } 
        else {
            const timeLeft = formatDistanceToNow(todo.dueDate);
            dueText = `Due in: ${timeLeft}`;
        }

        const listTask = document.createElement("ul");
        todo.task.forEach (task => {
            const taskDiv = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = task+"check";
            const labelCB = document.createElement("label");
            labelCB.htmlFor = checkbox.id;
            labelCB.textContent = task;

            labelCB.appendChild(checkbox);
            taskDiv.appendChild(labelCB);
            listTask.appendChild(taskDiv);
        })

        div.appendChild(listTask);

        const date = document.createElement("h4");
        date.textContent = dueText;
        div.appendChild(date);

        const dialogTask = document.getElementById("taskDialog");
        const addTaskBtn = document.createElement("button");
        const titleDialogTask = document.querySelector("#taskForm h3")
        addTaskBtn.setAttribute("id", todo.name+"addTask");
        addTaskBtn.textContent= "+"
        addTaskBtn.addEventListener("click", () =>{
            titleDialogTask.setAttribute("id", todo.name);
            titleDialogTask.textContent = "Add task for " + todo.name + ":";
            dialogTask.showModal();
        })
        div.appendChild(addTaskBtn);


        listTodo.appendChild(div);
    }); 
}

export {populateTodoList};