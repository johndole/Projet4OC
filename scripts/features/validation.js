import {clearRegistrationForm, registrationForm} from "./registration_form.js";
import {closeModal} from "./modal.js";

let onSubmitCallback = () => {};

// Input fields
const form = document.getElementsByName('reserve')[0];
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const condButtonRequired = document.getElementById('checkbox1');
const formContent = document.querySelector('.modal-body form');
const thankYouMessage = document.getElementById('thankYouMessage');
const closeButtonThanks = document.querySelector('.btn-close');



// Error spans
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const birthdateError = document.getElementById('birthdateError');
const condButtonError = document.getElementById('condButtonError');
const locationError = document.getElementById('locationError');

export function validation() {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
  })};

  export function showThankYouMessage() {
  
    formContent.style.display = 'none';
    thankYouMessage.style.display = 'flex';
    closeButtonThanks.style.display = 'flex';
    console.log('Thank You message displayed');
    formContent.style.display = "block";
    thankYouMessage.style.display = 'none';
    closeModal();
    
  }



// Add event listeners for input fields
addInputValidation(firstName, firstNameError, validateFirstName);
addInputValidation(lastName, lastNameError, validateLastName);
addInputValidation(email, emailError, validateEmail);
addInputValidation(birthdate, birthdateError, validateBirthdate);
addInputValidation(condButtonRequired, condButtonError, validateCondButton);

 // Add event listener for the 'location' radio buttons
 form.querySelectorAll('input[name="location"]').forEach((radioButton) => {
  radioButton.addEventListener('change', function () {
    hideLocationError();
  });
});

//Input event listeners
function addInputValidation(input, errorSpan, validationFunction) {
  input.addEventListener('input', function (event) {
    if (validationFunction) {
      validationFunction();
    } else {
      showError(errorSpan, 'Validation function is missing.');
    }
  });
}

  export function validateForm() {
    let isFormValid = true;

    validateFirstName();
    validateLastName();
    validateEmail();
    validateBirthdate();
    validateCondButton();

    const locationRadioButtons = form.querySelectorAll('input[name="location"]');
  if (!Array.from(locationRadioButtons).some((radioButton) => radioButton.checked)) {
    showLocationError();
    isFormValid = false;
  } else {
    hideLocationError();
  }

    if (!isFormValid) {
      return; // If any validation fails, exit early
    }
   // If validation succeeds, execute form submission logic
  onSubmitCallback();
  
//
  registrationForm();

   // Optionally, clear the registration form or hide it
  clearRegistrationForm();

  // Display the Thank You message
  showThankYouMessage();

 
  }

  


function showLocationError() {
  locationError.textContent = 'You have to choose one country.';
  locationError.className = 'error-message active';
}

function hideLocationError() {
  locationError.textContent = '';
  locationError.className = 'error-message';
}


function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  errorSpan.classList.add('active');
  input.classList.add('error-input');
}

function hideError(input, errorSpan) {
  errorSpan.textContent = '';
  errorSpan.classList.remove('active');
  input.classList.remove('error-input');
}

function validateFirstName() {
  const value = firstName.value.trim();
  if (value.length < 2) {
    showError(firstName, firstNameError, 'You have to enter at least 2 characters.');
    return false;
  } else {
    hideError(firstName, firstNameError);
  }
}

function validateLastName() {
  const value = lastName.value.trim();
  if (value.length < 2) {
    showError(lastName, lastNameError, 'You have to enter at least 2 characters.');
  } else {
    hideError(lastName, lastNameError);
  }
}

function validateEmail() {
  const value = email.value.trim();
  const emailRegex = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    showError(email, emailError, 'You have to enter a valid email address.');
  } else {
    hideError(email, emailError);
  }
}

function validateBirthdate() {
  const birthdateValue = new Date(birthdate.value);
  const today = new Date();
  const age = today.getFullYear() - birthdateValue.getFullYear();

  if (age < 10) {
    showError(birthdate, birthdateError, 'You have to enter a valid birthdate.');
  } else {
    hideError(birthdate, birthdateError);
  }
}

function validateCondButton() {
  if (!condButtonRequired.checked) {
    showError(condButtonRequired, condButtonError, 'You must agree to the terms and conditions.');
  } else {
    hideError(condButtonRequired, condButtonError);
  }
}

