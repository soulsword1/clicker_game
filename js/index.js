const formEl = document.querySelector("form");
const invalidEl = document.querySelector(".invalid");

let userDetails = {};

formEl.addEventListener("submit", changePage);

//Changing page for game page
function changePage(e) {
  e.preventDefault();
  if (
    formEl.elements.username.value.trim() !== "" &&
    formEl.elements.checkbox.checked
  ) {
    userDetails.username = formEl.elements.username.value;
    userDetails.email = formEl.elements.email.value;
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    console.log(userDetails);
    window.location.href = "game.html";
    return;
  }

  fieldsNotification();
}

//Notifying user that all the fields must be filled
function fieldsNotification() {
  invalidEl.classList.remove("hidden");
}
