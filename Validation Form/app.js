/*jshint esversion: 6 */

// Init Validation patterns
const name = /^[A-Z][a-z]{1,}\s[A-Za-z]{1,}/,
  name1 = /^[a-z]{1,}\s[A-Za-z]{1,}/,
  name2 = /^[A-Z][a-z]{1,}[A-Za-z]{1,}/,
  email = /\w@\w+\.\w{2,5}$/i,
  zip = /^\d{5,6}$/,
  phone = /\+2\d{11}$/;


// UI defins
const nameInput = document.getElementById('name'),
  emailInput = document.getElementById('email'),
  zipInput = document.getElementById('zip'),
  numberInput = document.getElementById('number'),
  btn = document.getElementById('btn');

// Inputs listener
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
zipInput.addEventListener('blur', validateZip);
numberInput.addEventListener('blur', validatePhone);

function validateName() {
  // Check first case
  if (!name.test(nameInput.value)) {
    // Display Invalid message
    nameInput.classList.add('is-invalid');
    // Disable Submit button
    btnDisabled();
    // Check second case
    if (name1.test(nameInput.value)) {
      message('name-feedback', '1st char must be uppercase');
      // Check third case
    } else if (name2.test(nameInput.value)) {
      message('name-feedback', 'Pls put ur fullname');
    }
  } else {
    // Hide Invalid message
    nameInput.classList.remove('is-invalid');
    // Enable Submit button
    removeBtnDisabled();
  }
}

function validateEmail() {
  if (!email.test(emailInput.value)) {
    emailInput.classList.add('is-invalid');
    btnDisabled();
  } else {
    emailInput.classList.remove('is-invalid');
    removeBtnDisabled();
  }
}

function validateZip() {
  if (!zip.test(zipInput.value)) {
    zipInput.classList.add('is-invalid');
    btnDisabled();
  } else {
    zipInput.classList.remove('is-invalid');
    removeBtnDisabled();
  }
}

function validatePhone() {
  if (!phone.test(numberInput.value)) {
    numberInput.classList.add('is-invalid');
    btnDisabled();
  } else {
    numberInput.classList.remove('is-invalid');
    removeBtnDisabled();
  }
}

function message(className, msg) {
  document.getElementById(className).textContent = msg;
}

function removeBtnDisabled() {
  btn.removeAttribute('disabled');
}

function btnDisabled() {
  btn.setAttribute('disabled', 'disabled');
}

