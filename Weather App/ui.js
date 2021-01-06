/*jshint esversion: 6 */
class UI {
    constructor() {
        this.cityName = document.getElementById('city-name');
        this.description = document.getElementById('description');
        this.temp = document.getElementById('temp');
        this.icon = document.getElementById('icon');
        this.hum = document.getElementById('humidity');
        this.feelLike = document.getElementById('feel-like');
        this.wind = document.getElementById('wind');
        
    }

    // Display weather details
    showData(weather) {
        this.cityName.textContent = weather.name;
        this.description.textContent = weather.weather[0].description;
        this.description.style.textTransform = 'capitalize';
        this.temp.textContent = weather.main.temp + ' C';
        this.hum.textContent = `Relative Humidity: ${weather.main.humidity}%`;
        this.feelLike.textContent = `Feels Like: ${weather.main.feels_like} C`;
        this.wind.textContent = `Wind Speed: ${weather.wind.speed}m/s`;
    }
}
