// DOM Elements
const formData = document.querySelectorAll(".formData");
const formSubmit = document.querySelector(".btn-submit");
const bodyForm = document.querySelector(".content");

function editNav() {
  let x = document.getElementById("myTopnav");
  x.className = x.className === "topnav" ? "topnav responsive" : "topnav";
}

function validateForm() {
  let firstName = getInputValue("first");
  let lastName = getInputValue("last");
  let email = getInputValue("email");
  let quantity = document.getElementById("quantity").value;
  let locationInputs = document.getElementsByName("location");
  let isLocationSelected = Array.from(locationInputs).some(
    (input) => input.checked
  );
  let termsCheckbox = document.getElementById("checkbox1");
  let isValid = true;

  function showError(id, message) {
    let errorSpan = document.getElementById(id + ".error-message");
    errorSpan.textContent = message;
    
    isValid = false;
  }

  // Check first name
  if (firstName.length < 2) {
    showError('first', "Le prénom doit avoir au moins 2 caractères.");
  }

  // Check last name
  if (lastName.length < 2) {
    showError("last", "Le nom doit avoir au moins 2 caractères.");
  }

  // Check email
  if (!isValidEmail(email)) {
    showError("email", "L'adresse électronique n'est pas valide.");
  }

  // Check quantity
  if (isNaN(quantity) || quantity < 0) {
    showError(
      "quantity",
      "Veuillez saisir un nombre valide pour le nombre de tournois."
    );
  }

  // Check location
  if (!isLocationSelected) {
    showError(
      "location",
      "Vous devez choisir une option pour la ville du tournoi."
    );
  }

  // Check terms and conditions
  if (!termsCheckbox.checked) {
    showError("terms", "Veuillez accepter les conditions d'utilisation.");
  }

  if (isValid) {
    handleFormSubmission();
  }

  // Prevent the default form submission
  return false;
}

function handleFormSubmission() {
  let thankYouMessage = document.getElementById("thankYouMessage");
  let form = document.querySelector("form[name='reserve']");
  form.style.display = "none";
  thankYouMessage.style.display = "block";
  bodyForm.style.height = "100%";
  bodyForm.style.textAlign = "center";
  bodyForm.style.display = "flex";
  bodyForm.style.alignItems = "center";
}

function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getInputValue(id) {
  return document.getElementById(id).value.trim();
}