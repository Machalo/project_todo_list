import "./styles.css"
import { populateProjectList, checkLocalStorage } from "./DOMproject";
import "./projectCreator";
import "./todoCreator";
import "./DOMtodo";


checkLocalStorage();
populateProjectList();


//localStorage.removeItem("projects");
// module création todo 


