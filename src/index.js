import "./styles.css"
import { populateProjectList, checkLocalStorage, populateTodoList } from "./populateDOM";
import "./projectCreator";


checkLocalStorage();
populateProjectList();
populateTodoList();

//localStorage.removeItem("projects");
// module création todo 


