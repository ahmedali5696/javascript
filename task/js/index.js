/*jshint esversion: 6 */

// Init Validation patterns
const username = /^[A-Za-z]{1,}[0-9]{1,}[A-Za-z]{1,}$/,
  email = /\w@\w+\.\w{2,5}$/i,
  password = /[A-Za-z0-9]{8}/;


// UI defins
const form = document.getElementById('my-form'),
  usernameInput = document.getElementById('username'),
  emailInput = document.getElementById('email'),
  passwordInput = document.getElementById('password'),
  confirmInput = document.getElementById('confirm-password'),
  btn = document.getElementById('submit');

// Inputs listener
function addAllEventsListener() {
  usernameInput.addEventListener('input', validateUsername);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  confirmInput.addEventListener('input', validateConfirm);
  form.addEventListener('submit', validateForm)
}

function validateUsername() {
  const errMsg = document.getElementById('user-error')

  // Check first case
  if (!username.test(usernameInput.value)) {
    // Display Invalid message
    usernameInput.parentElement.classList.add('invalid');
    errMsg.style.display = 'block'
    // Disable Submit button
    btnDisabled();
  } else {
    // Hide Invalid message
    usernameInput.parentElement.classList.remove('invalid');
    errMsg.style.display = 'none'
    // Enable Submit button
    removeBtnDisabled();
  }
}

function validateEmail() {
  const errMsg = document.getElementById('email-error')

  if (!email.test(emailInput.value)) {
    emailInput.parentElement.classList.add('invalid');
    errMsg.style.display = 'block'
    btnDisabled();
  } else {
    emailInput.parentElement.classList.remove('invalid');
    errMsg.style.display = 'none'
    removeBtnDisabled();
  }
}


function validatePassword() {
  const errMsg = document.getElementById('password-error')

  if (!password.test(passwordInput.value)) {
    passwordInput.parentElement.classList.add('invalid');
    errMsg.style.display = 'block'
    btnDisabled();
  } else {
    passwordInput.parentElement.classList.remove('invalid');
    errMsg.style.display = 'none'
    removeBtnDisabled();
  }
}

function validateConfirm() {
  const errMsg = document.getElementById('cpass-error')

  if (confirmInput.value !== passwordInput.value) {
    confirmInput.parentElement.classList.add('invalid');
    errMsg.style.display = 'block'
    btnDisabled();
  } else {
    confirmInput.parentElement.classList.remove('invalid');
    errMsg.style.display = 'none'
    removeBtnDisabled();
  }
}

function validateForm(e) {
  e.preventDefault()
 const emptyField = []

  for (const input of e.target) {
    if (input.value === '' && input.id !== 'submit') {
      emptyField.push(input)
    }
  }

  if (emptyField.length === 0) {
    window.location.href = `/success.html`
  }
}


function btnDisabled() {
  btn.setAttribute('disabled', 'disabled');
}

function removeBtnDisabled() {
  btn.removeAttribute('disabled');
}

addAllEventsListener()