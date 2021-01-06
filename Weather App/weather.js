/*jshint esversion: 8 */
class Weather {
  constructor() {
    this.apiKey = '95bacfa96c7d56130c8f0461cc6923dc';
    this.city = '';
  }

  // Fetch weather from api
  async getWeather() {
    const weatherRespone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);
    const weather = await weatherRespone.json();

    return {
      weather
    };

  }

  // Get current location from api
  async getLocation() {
    const locationResp = await fetch('https://extreme-ip-lookup.com/json/');
    const location = await locationResp.json();

    return {
      location
    };
  }

  // Change location
  changeLocation(city) {
    this.city = city;
  }
}
