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
  var key = 'ce707d6adce6460ebfb124540250407';
  var url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var city = data.location.name;
      var temp = data.current.temp_c + "°C";
      var cond = data.current.condition.text;
      document.getElementById('result').innerHTML = city + "<br>" + temp + "<br>" + cond;
    })
    .catch(function () {
      document.getElementById('result').textContent = "Failed to fetch weather.";
    });
}
function showError(error) {
  document.getElementById('result').textContent = "Location access denied.";
}