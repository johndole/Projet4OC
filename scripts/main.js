import { modal,} from "./features/modal.js";
import { registrationForm } from "./features/registration_form.js";
import { validation } from "./features/validation.js";




function start() {
    modal();
    registrationForm();
    validation();
}





document.addEventListener("DOMContentLoaded", start);