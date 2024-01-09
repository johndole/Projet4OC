import { modal,} from "./features/modal.js";
import { validation } from "./features/validation.js";




function start() {
    modal();
    validation();
}





document.addEventListener("DOMContentLoaded", start);