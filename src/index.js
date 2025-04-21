import "./styles.css"
import { populateProjectList, checkLocalStorage } from "./populateDOM";
import "./projectCreator";
import "./todoCreator";


checkLocalStorage();
populateProjectList();


//localStorage.removeItem("projects");
// module création todo 


