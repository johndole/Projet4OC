import {clearRegistrationForm, registrationFormData} from "./registration_form.js";


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
const locationRadioButtons = form.querySelectorAll('input[name="location"]');
const quantity = document.getElementById('quantity');



// Error spans
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const birthdateError = document.getElementById('birthdateError');
const condButtonError = document.getElementById('condButtonError');
const locationError = document.getElementById('locationError');
const quantityError = document.getElementById('quantityError');

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
    }
    



// Add event listeners for input fields
addInputValidation(firstName, firstNameError, validateFirstName);
addInputValidation(lastName, lastNameError, validateLastName);
addInputValidation(email, emailError, validateEmail);
addInputValidation(birthdate, birthdateError, validateBirthdate);
addInputValidation(condButtonRequired, condButtonError, validateCondButton);
addInputValidation(quantity, quantityError, validateQuantity);


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

// Add event listener for location radio buttons
locationRadioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
    locationValidation();
  });
});

export function validateForm() {
  let isFormValid = true;

  isFormValid = validateFirstName() && isFormValid;
  isFormValid = validateLastName() && isFormValid;
  isFormValid = validateEmail() && isFormValid;
  isFormValid = validateBirthdate() && isFormValid;
  isFormValid = validateCondButton() && isFormValid;
  isFormValid = locationValidation() && isFormValid;
  isFormValid = validateQuantity() && isFormValid;

  if (isFormValid) {
    // If form is valid, send data.
    registrationFormData();
    // Optionally, clear the registration form or hide it
    clearRegistrationForm();

    // Display the Thank You message
    showThankYouMessage();
  } else {
    return alert('Form is not valid');
  }
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
  if (!/^[a-zA-Z]+$/.test(value) || value.length < 2) {
    showError(firstName, firstNameError, 'Please enter at least 2 characters.');
    return false;
  } else {
    hideError(firstName, firstNameError);
    return true;
  }
}

function validateLastName() {
  const value = lastName.value.trim();
  if (!/^[a-zA-Z]+$/.test(value) || value.length < 2) {
    showError(lastName, lastNameError, 'Please enter at least 2 characters.');
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
    showError(email, emailError, 'You have to enter a valid email address.');
    return false;
  } else {
    hideError(email, emailError);
    return true;
  }
}

function validateBirthdate() {
  const birthdateValue = new Date(birthdate.value);
  const today = new Date();
  const age = today.getFullYear() - birthdateValue.getFullYear();

  if (age < 10) {
    showError(birthdate, birthdateError, 'You have to enter a valid birthdate.');
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
    showError(quantity, quantityError, 'Please enter a valid quantity (up to 99).');
    return false;
  } else {
    hideError(quantity, quantityError);
    return true;
  }
}

function locationValidation() {
  if (!Array.from(locationRadioButtons).some((radioButton) => radioButton.checked)) {
    showLocationError();
    return false;
  } else {
    hideLocationError();
    return true;
  }
}

function validateCondButton() {
  if (!condButtonRequired.checked) {
    showError(condButtonRequired, condButtonError, 'You must agree to the terms and conditions.');
    return false;
  } else {
    hideError(condButtonRequired, condButtonError);
    return true;
  }
}