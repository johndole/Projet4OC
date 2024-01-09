const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeButton = modalbg.querySelector(".close");
const modalTopNav = document.getElementById("myTopnav");
const hamburger = document.getElementById("icon");
const closeButtonThanks = document.querySelector(".btn-close");


hamburger.addEventListener("click", editNav);


function editNav() {
  let x = document.getElementById("myTopnav");
  x.className = x.className === "topnav" ? "topnav responsive" : "topnav";
}

export function modal() {
  bindEvents();
}

// Launch modal form
export function openModal() {
  modalbg.style.display = "block";
  modalbg.style.backgroundColor = "white";
  modalbg.style.paddingTop = "50px";
  modalTopNav.style.position = "fixed";
  closeButtonThanks.style.display = "none";
}

// Function to close the modal
export function closeModal() {
  modalbg.style.display = "none";
  modalbg.style.paddingTop = "inherit";
  modalTopNav.style.position = "inherit";

}

function bindEvents() {
  // Launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", openModal));
  // Add click event listener to the close button
  closeButton.addEventListener("click", closeModal);
  closeButtonThanks.addEventListener("click", closeModal);
}

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target !== modalbg) return;
    closeModal();
  };

