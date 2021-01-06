/*jshint esversion: 6 */

// Init instances
const weather = new Weather();
const ui = new UI();

// Change location UI
const btn = document.getElementById('change');
const locationInput = document.getElementById('city-input');

// load Event listener
loadAllListeners();

// load Event listener
function loadAllListeners() {
  // Display current user location and weather
  document.addEventListener('DOMContentLoaded', getWeather);

  // Change location button
  btn.addEventListener('click', changeLocation);
}

// Get user location and weather
function getWeather() {
  // Get current location
  weather.getLocation().then(data => {
    // Save location in weather class
    weather.changeLocation(data.location.city);

    // Get weather details
    weather.getWeather().then(data => {
      // Display weather details
      ui.showData(data.weather);
    }).catch(err => console.log(err));
  });
}

// Change user location
function changeLocation() {
  // Validation
  if (locationInput.value === '') {
    document.getElementById('msg').textContent = 'Please put your location';
  } else {
    // Save location in weather class
    weather.changeLocation(locationInput.value);
    // Get weather details
    weather.getWeather().then(data => {
        // Display weather details
        ui.showData(data.weather);
      })
      .catch(err => console.log(err));
    $('#location-modal').modal('hide');
  }
}