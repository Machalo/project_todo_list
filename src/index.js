import "./styles.css"


function Todo (name, dueDate, priority, note) {
  this.name = name;
  this.dueDate = dueDate;
  this.priority = priority;
  this.note = note;
}
function Project(name, priority, todo) {
  this.name = name;
  this.priority = priority;
  this.todo = todo;
}

let projects = [];


function checkLocalStorage () {
  if (localStorage.getItem("projects") != null) {
    projects.push(JSON.parse(localStorage.getItem("projects")));
  } 
  else {
    projects.push(
      new Project("test",6,[]),
      new Project("test2",5,[new Todo("testTodo2", "somedate", 5, "blabla"),new Todo("testTodo3", "somedate", 1, "blabla")]),
      new Project("test3",1,[new Todo("testTodo4", "somedate", 2, "blabla")])
    );
  }
  projects.sort((a,b) => a.priority - b.priority);
}


function populateProjectList () {
  const container = document.querySelectorAll("#listProjects");

  container.forEach(function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
  });

  const listProjects = document.querySelector("#listProjects");
  
  projects.forEach(element => {
    element.todo.sort((a,b) => a.priority - b.priority);
    const title = document.createElement("li");
    title.setAttribute("id", element.name);
    title.textContent = element.name;
    listProjects.appendChild(title);
  });

  console.log(projects);
}


const newProjectButton = document.getElementById("newProject");
const cancelProjectButton = document.getElementById("cancelBtn");
const cconfirmProjectButton = document.getElementById("confirmBtn");
const dialogProject = document.getElementById("projectDialog");
const projectInput = document.getElementById("projectName");

newProjectButton.addEventListener("click", () => {
  dialogProject.showModal();
});

cancelProjectButton.addEventListener("click", () => {
  dialogProject.close();
});

cconfirmProjectButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialogProject.close(createNewProject(projectInput.value));
  
});

function createNewProject (name) {
    projects.push(new Project(name,1,[]));
    projects.sort((a,b) => a.priority - b.priority);
    populateProjectList()
}





checkLocalStorage();
populateProjectList();




/*localStorage.setItem("projects" , JSON.stringify(projects));*/


/* Module création projects */

/* module création todo */

/* module de récupération donnée stored */

/* DOM modif */