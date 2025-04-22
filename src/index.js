import "./styles.css"
import { populateProjectList, checkLocalStorage } from "./DOMproject";
import "./projectCreator";
import "./todoCreator";
import "./DOMtodo";
import "./taskCreator"


checkLocalStorage();
populateProjectList();


//localStorage.removeItem("projects");
// module création todo 


