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