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

        const date = document.createElement("h4");
        date.textContent = dueText;
        div.appendChild(date);


        listTodo.appendChild(div);
    }); 
}

export {populateTodoList};