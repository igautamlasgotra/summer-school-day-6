document.getElementById('getWeather').addEventListener('click', function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError);
  } else {
    document.getElementById('result').textContent = "Geolocation not supported.";
  }
});
function showWeather(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var weatherKey = 'a8cd8687382eb869527eba48d9780009';
  var openCageKey = '1756c96049d943f9a1c598c8f5728423';
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      var temp = data.main.temp + "°C";
      var cond = data.weather[0].description;
      document.getElementById('result').innerHTML = temp + "<br>" + cond;
    })
    .catch(error => {
      console.log("Weather fetch error:", error);
      document.getElementById('result').textContent = "Failed to fetch weather.";
    });
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${openCageKey}`)
    .then(response => response.json())
    .then(data => {
      const cityName =
        data.results[0].components.town ||
        data.results[0].components.village ||
        data.results[0].components.city ||
        data.results[0].components.county;
      document.getElementById('location').textContent = "You are in: " + cityName;
    })
    .catch(error => {
      console.log("City fetch error:", error);
      document.getElementById('location').textContent = "City not found";
    });
}
function showError(error) {
  console.log("Geolocation error:", error);
  document.getElementById('result').textContent = "Location access denied.";
}
