/*jshint esversion: 6 */

/* Game Function:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remainung
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game value
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * 10) + 1,
  guessesLeft = 3;

// UI Elements
const game = document.querySelector('.game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess'),
  guessBtn = document.querySelector('#play'),
  massege = document.querySelector('.massege');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Reset game Listener
guessBtn.addEventListener('mousedown', function (e) {
  if (e.target.classList.contains('try-again')) {
    window.location.reload();
  }
});

// Game Listener
guessBtn.addEventListener('click', function () {
  // To remove NaN
  if (guessInput.value === '') {
    guessInput.value = '0';
  }

  // Convert input value from string to number
  let guess = parseInt(guessInput.value);

  // Validation
  if (guess > max || guess < min) {
    setMassege(`please put a correct nnumber between ${min} and ${max}`, 'red');
    guessInput.style.borderColor = 'red';
  } else {
    // Check Number
    if (guess === winningNum) {
      tryAgain(true, `${winningNum} is the correct number`);
    } else {
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        tryAgain(false, `Game over, the number was ${winningNum}`);
      } else {
        guessInput.value = '';
        setMassege(`${guess} is not correct, guesses left ${guessesLeft}`, 'red');
      }
    }
  }

});

// Try Again
function tryAgain(wonStat, msg) {
  let color;
  wonStat === true ? color = 'green' : color = 'red';

  guessInput.disabled = true;
  guessBtn.textContent = 'Try again';
  guessBtn.classList += ' try-again';
  guessBtn.style.backgroundColor = color;
  guessInput.style.borderColor = color;
  massege.style.color = color;
  setMassege(msg);
}

// Guessing Massege
function setMassege(msg) {
  massege.textContent = msg;
}