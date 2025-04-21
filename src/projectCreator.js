import { populateProjectList, Project } from "./populateDOM";

const newProjectButton = document.getElementById("newProject");
const cancelProjectButton = document.getElementById("cancelBtn");
const cconfirmProjectButton = document.getElementById("confirmBtn");
const dialogProject = document.getElementById("projectDialog");
const projectInput = document.getElementById("projectName");
const projectPriority = document.getElementById("projectPriority")

newProjectButton.addEventListener("click", () => {
  dialogProject.showModal();
});

cancelProjectButton.addEventListener("click", () => {
  dialogProject.close();
});

cconfirmProjectButton.addEventListener("click", () => {
  if(projectInput.value == 0) {
    dialogProject.close();
  }
  else {
    dialogProject.close(createNewProject(projectInput.value, projectPriority.value));
  }
});

function createNewProject (name,priority) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    if (!projects.some(el => el.name === name)) {
        projects.push(new Project(name,parseInt(priority),[]));
        projects.sort((a,b) => a.priority - b.priority);
        localStorage.removeItem("projects");
        localStorage.setItem("projects", JSON.stringify(projects));
        populateProjectList()
    }
    else {console.error("Project already exists")}
}

function removeProject (name) {
    let projects = JSON.parse(localStorage.getItem("projects"));

    projects = projects.filter(obj => obj.name !== name);

    localStorage.setItem("projects", JSON.stringify(projects));
}

export {removeProject}