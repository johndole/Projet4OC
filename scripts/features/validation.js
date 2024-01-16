// Imports des fonctionnalités liées au formulaire d'inscription depuis un autre fichier
import {
  clearRegistrationForm,
  registrationFormData,
} from "./registration_form.js";

// Sélection des éléments HTML du formulaire
const form = document.getElementsByName("reserve")[0];
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const condButtonRequired = document.getElementById("checkbox1");
const formContent = document.querySelector(".modal-body form");
const thankYouMessage = document.getElementById("thankYouMessage");
const closeButtonThanks = document.querySelector(".btn-close");
const locationRadioButtons = form.querySelectorAll('input[name="location"]');
const quantity = document.getElementById("quantity");

// Sélection des éléments pour afficher les messages d'erreur associés à chaque champ
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const birthdateError = document.getElementById("birthdateError");
const condButtonError = document.getElementById("condButtonError");
const locationError = document.getElementById("locationError");
const quantityError = document.getElementById("quantityError");

/// Fonction d'écoute d'événement pour la validation lors de la soumission du formulaire
export function validation() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();// Empêche la soumission du formulaire par défaut
    validateForm(); // Appelle la fonction de validation globale
  });
}
// Fonction pour afficher un message de remerciement après la validation réussie
export function showThankYouMessage() {
  formContent.style.display = "none";
  thankYouMessage.style.display = "flex";
  closeButtonThanks.style.display = "flex";
  console.log("Thank You message displayed");
}

// Ajout des écouteurs d'événements pour la validation en temps réel des champs d'entrée
addInputValidation(firstName, firstNameError, validateFirstName);
addInputValidation(lastName, lastNameError, validateLastName);
addInputValidation(email, emailError, validateEmail);
addInputValidation(birthdate, birthdateError, validateBirthdate);
addInputValidation(condButtonRequired, condButtonError, validateCondButton);
addInputValidation(quantity, quantityError, validateQuantity);

// Fonction générique pour ajouter des écouteurs d'événements pour la validation en temps réel
function addInputValidation(input, errorSpan, validationFunction) {
  input.addEventListener("input", function (event) {
    if (validationFunction) {
      validationFunction();
    } else {
      showError(errorSpan, "Validation function is missing.");
    }
  });
}

// Ajout d'un écouteur d'événement pour les boutons radio de l'emplacement
locationRadioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    locationValidation();
  });
});

// Fonction globale de validation du formulaire
export function validateForm() {
  let isFormValid = true;
// Appelle chaque fonction de validation individuelle et met à jour isFormValid
  isFormValid = validateFirstName() && isFormValid;
  isFormValid = validateLastName() && isFormValid;
  isFormValid = validateEmail() && isFormValid;
  isFormValid = validateBirthdate() && isFormValid;
  isFormValid = validateCondButton() && isFormValid;
  isFormValid = locationValidation() && isFormValid;
  isFormValid = validateQuantity() && isFormValid;

    // Si le formulaire est valide, envoie les données, efface le formulaire et affiche un message de remerciement
  if (isFormValid) {
    registrationFormData();
    clearRegistrationForm();
    showThankYouMessage();
  } else {
    return alert("Form is not valid"); // Affiche une alerte si le formulaire n'est pas valide
  }
}
// Fonction spécifique pour afficher une erreur liée à la sélection de l'emplacement
function showLocationError() {
  locationError.textContent = "You have to choose one country.";
  locationError.className = "error-message active";
}
// Fonction spécifique pour masquer l'erreur liée à la sélection de l'emplacement
function hideLocationError() {
  locationError.textContent = "";
  locationError.className = "error-message";
}

// Fonction générique pour afficher une erreur associée à un champ d'entrée
function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  errorSpan.classList.add("active");
  input.classList.add("error-input");
}
// Fonction générique pour masquer l'erreur associée à un champ d'entrée
function hideError(input, errorSpan) {
  errorSpan.textContent = "";
  errorSpan.classList.remove("active");
  input.classList.remove("error-input");
}


// Fonctions de validation individuelle pour chaque champ du formulaire
function validateFirstName() {
  const value = firstName.value.trim();
  if (!/^[a-zA-Z]+$/.test(value) || value.length < 2) {
    showError(firstName, firstNameError, "Please enter at least 2 characters.");
    return false;
  } else {
    hideError(firstName, firstNameError);
    return true;
  }
}

function validateLastName() {
  const value = lastName.value.trim();
  if (!/^[a-zA-Z]+$/.test(value) || value.length < 2) {
    showError(lastName, lastNameError, "Please enter at least 2 characters.");
    return false;
  } else {
    hideError(lastName, lastNameError);
    return true;
  }
}

function validateEmail() {
  const value = email.value.trim();
  const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    showError(email, emailError, "You have to enter a valid email address.");
    return false;
  } else {
    hideError(email, emailError);
    return true;
  }
}

function validateBirthdate() {
  const birthdateValue = new Date(birthdate.value);

  // Check if the birthdate is unset or invalid
  if (isNaN(birthdateValue.getTime())) {
    showError(birthdate, birthdateError, "Please enter a valid birthdate.");
    return false;
  }

  const today = new Date();
  const minAge = 10;
  const age = today.getFullYear() - birthdateValue.getFullYear();

  if (age < minAge) {
    const errorMessage = `You must be at least ${minAge} years old.`;
    showError(birthdate, birthdateError, errorMessage);
    return false;
  } else {
    hideError(birthdate, birthdateError);
    return true;
  }
}

function validateQuantity() {
  const value = quantity.value.trim();
  const quantityRegex = /^\d+$/; // Only allow positive integers

  if (!quantityRegex.test(value) || parseInt(value) > 99) {
    showError(
      quantity,
      quantityError,
      "Please enter a valid quantity (up to 99)."
    );
    return false;
  } else {
    hideError(quantity, quantityError);
    return true;
  }
}

function locationValidation() {
  if (
    !Array.from(locationRadioButtons).some((radioButton) => radioButton.checked)
  ) {
    showLocationError();
    return false;
  } else {
    hideLocationError();
    return true;
  }
}

function validateCondButton() {
  if (!condButtonRequired.checked) {
    showError(
      condButtonRequired,
      condButtonError,
      "You must agree to the terms and conditions."
    );
    return false;
  } else {
    hideError(condButtonRequired, condButtonError);
    return true;
  }
}
