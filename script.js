const searchInput = document.getElementById("city-search");
const searchButton = document.getElementById("search-button");
const apiKey = "b4e93fcce0df6a5969660b5f52aed994";

searchButton.addEventListener("click", function () {
  const city = searchInput.value;
  const geocodeApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  fetch(geocodeApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var lat = data[0].lat;
      var long = data[0].lon;
      const forecast_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

      fetch(forecast_URL)
        .then((response) => response.json())
        .then((data) => {
          // Parse the JSON response data to extract the relevant information.
          const forecastData = data.list.map((forecast) => ({
            dateTime: forecast.dt_txt,
            temperature: forecast.main.temp,
            weatherCondition: forecast.weather[0].main,
            weatherIcon: `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`,
          }));

          // Create a container element to hold the weather information.
          const container = document.createElement("div");
          container.classList.add("weather-forecast");

          // Inside the container element, create and append individual HTML boxes to display the weather information.
          forecastData.forEach((forecast) => {
            const box = document.createElement("div");
            box.classList.add("weather-forecast-box");

            const dateTimeElement = document.createElement("div");
            dateTimeElement.classList.add("weather-forecast-date-time");
            dateTimeElement.textContent = forecast.dateTime;
            box.appendChild(dateTimeElement);

            const temperatureElement = document.createElement("div");
            temperatureElement.classList.add("weather-forecast-temperature");
            temperatureElement.textContent = `${forecast.temperature}°F`;
            box.appendChild(temperatureElement);

            const weatherConditionElement = document.createElement("div");
            weatherConditionElement.classList.add(
              "weather-forecast-weather-condition"
            );
            weatherConditionElement.textContent = forecast.weatherCondition;
            box.appendChild(weatherConditionElement);

            const weatherIconElement = document.createElement("img");
            weatherIconElement.classList.add("weather-forecast-weather-icon");
            weatherIconElement.setAttribute("src", forecast.weatherIcon);
            weatherIconElement.setAttribute("alt", forecast.weatherCondition);
            box.appendChild(weatherIconElement);

            container.appendChild(box);
          });

          document.body.appendChild(container);
        });
    });
});
