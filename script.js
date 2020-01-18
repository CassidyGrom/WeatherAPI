// Initial array of cities
var cities = ["Louisville", "Newark", "New Haven"];
var apiKey = "327fd5e4c25354dfdd72fbe1fb823d1d";

// displayWeatherInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo(event) {
  event.preventDefault();
  var area = $("#location-input").val();
  console.log(area);
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    area +
    "&units=imperial&APPID=" +
    apiKey;
  // Creating an AJAX call for the specific area button being clicked
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // find temp and store it in a variable
    var temp = response.main.temp;
    var name = response.name;
    var wind = response.wind.speed;
    var humidity = response.main.humidity;
    // wind speed

    // humidity

    // print to page

    $("#weather-view").append(`
    <p>Location: ${name}</p>
    <p>Temp: ${temp}F</p>
    <p>Wind speed: ${wind} mph</p>
    <p>Humidity: ${humidity} mph</p>
    `);

    // find latitude and longitude in api response and create variables
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    // pass both variable into the getUVIndex function
    getUVIndex(lat, lon);
    // call 5 day forecast api endpoint with a function
  });
}

function getUVIndex(latitude, longitude) {
  console.log(latitude, longitude);
  var url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${latitude}&lon=${longitude}`;
  // call api to get uv index with the url above
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var uv = response.value;
    console.log(uv);
    $("#weather-view").append(`<p> UV index: ${uv}</p>`);
  });
}

$("#location-form").on("submit", displayWeatherInfo);
