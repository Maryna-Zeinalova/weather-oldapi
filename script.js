// Taking an input value of a city and sending a request
function search() {
  const key = "bc0f4a715b0f4da387a93332230204";
  const city = document.getElementById("input");
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city.value}&aqi=yes`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      showWeather(data);
    })
    .catch(() => {
      showError();
    });
}

// Prossessing data and rendering it
function showWeather(data) {
  const result = document.getElementById("result");
  result.innerHTML = `
    <h2>${data.location.name}</h2>
    <h4 class='weather'>${data.current.condition.text}</h4>
    <img src='${data.current.condition.icon}'>
    <h1>${Math.round(data.current.temp_c)} &#176</h1>
    <div class="details-container">
    <div>
    <h4 class="title">wind</h4>
    <h4 class="details-value">${data.current.wind_kph} kph</h4>
    </div>
    <div>
    <h4 class="title">humidity</h4>
    <h4 class="details-value">${data.current.humidity} %</h4>
    </div>
    <div>
    <h4 class="title">pressure</h4>
    <h4 class="details-value">${data.current.pressure_mb} hPa</h4>
    </div>
    </div>
    `;
}
function showError() {
  result.innerHTML = `<h2>City not found</h2>`;
}
// Getting geolocation to show start page
function showWeatherInCurrentPlace(position) {
  const latitude = position.coords.latitude;
  const longtitude = position.coords.longitude;
  const key = "bc0f4a715b0f4da387a93332230204";
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longtitude}&aqi=yes`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      showWeather(data);
    })
}
navigator.geolocation.getCurrentPosition(showWeatherInCurrentPlace);
