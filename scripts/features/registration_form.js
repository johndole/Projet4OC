const form = document.querySelector("form[name='reserve']");

export function clearRegistrationForm() {
  form.reset();
  console.log("Form cleared");
}

export function registrationFormData() {
  // Create a FormData object from the form
  const formData = new FormData(form);

  // Create a user object to group the form data
  const user = {};
  formData.forEach((value, key) => {
    user[key] = value;
  });

  // Log the user object to the console
  console.log("Form submitted with data:", user);
}