import { API_KEY } from "./config.js";
const inptutBox = document.querySelector(".input-box");
// console.log(inptutBox);
const searchBtn = document.getElementById("searchBtn");
// console.log(searchBtn);
const weatherImg = document.querySelector(".weather-image");
// console.log(weatherImg);
const temperature = document.querySelector(".temperature");
// console.log(temperature);
const description = document.querySelector(".description");
// console.log(description);
const humidity = document.getElementById("humidity");
// console.log(huumidity);
const windSpeed = document.getElementById("wind-speed");
// console.log(windSpeed);
const cityName = document.querySelector(".city-name");
const weatherImage = document.querySelector(".weather-image");
const errorMessage = document.querySelector(".error-message");
const weatherDetails = document.querySelector(".weather-details");
const weatherBody = document.querySelector(".weather-body");

const checkWeather = async (city) => {
  const apiKey = API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const weatherData = await fetch(`${url}`).then((response) => response.json());
  console.log(weatherData);
  // weatherBody.style.display = "none";
  if (weatherData.cod === "404" && weatherData.message === "city not found") {
    errorMessage.style.display = "block";
    weatherImage.src = "assets/404.png";
    errorMessage.innerHTML = "City not found, please try again!";
    temperature.style.display = "none";
    description.style.display = "none";
    humidity.style.display = "none";
    windSpeed.style.display = "none";
    cityName.style.display = "none";
    inptutBox.value = "";
    weatherDetails.style.display = "none";
  } else {
    weatherBody.style.display = "flex";
    temperature.style.display = "block";
    description.style.display = "block";
    humidity.style.display = "block";
    windSpeed.style.display = "block";
    cityName.style.display = "block";
    weatherDetails.style.display = "flex";
    errorMessage.style.display = "none";
    temperature.innerHTML = `${Math.round(weatherData.main.temp) - 273} &deg;C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;
    cityName.innerHTML = `City: ${weatherData.name},${weatherData.sys.country}`;
    // console.log(`${weatherData.name},${weatherData.sys.country}`);
    inptutBox.value = "";

    switch (weatherData.weather[0].main) {
      case "Clouds":
        weatherImage.src = "assets/cloud.png";
        break;
      case "Clear":
        weatherImage.src = "assets/clear.png";
        break;
      case "Mist":
        weatherImage.src = "assets/mist.png";
        break;
      case "Rain":
        weatherImage.src = "assets/rain.png";
        break;
      default:
        weatherImage.src = "assets/cloud.png";
        break;
    }
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(inptutBox.value);
});

inptutBox.addEventListener("keydown", (e) => {
  // console.log(e.key === "Enter");
  if (e.key === "Enter") {
    checkWeather(inptutBox.value);
  }
});
