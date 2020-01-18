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
    $("#location-input").val("");
    $("#weather-view, .five-day").empty();
    // $("#five-day").empty();
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
    getFiveDay(area);
  });
  // call 5 day forecast api endpoint with a function
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

function getFiveDay(area) {
  console.log(area);
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    area +
    "&units=imperial&APPID=" +
    apiKey;
  // call api to get uv index with the url above
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var fiveDayArr = response.list.filter(function(weatherObj) {
      if (weatherObj.dt_txt.includes("06:00:00")) {
        return true;
      } else {
        return false;
      }
    });
    console.log(fiveDayArr);
    for (var i = 0; i < fiveDayArr.length; i++) {
      var temp = fiveDayArr[i].main.temp;
      var date = fiveDayArr[i].dt_txt;
      date = date.slice(0, 10);
      console.log(date);
      var MomentDate = moment(date).format("dddd MMMM Do YYYY");
      var hum = fiveDayArr[i].main.humidity;

      var columnDiv = $("<div>");

      columnDiv.addClass("col-12 col-md-2").appendTo(".five-day");

      var cardDiv = $("<div>");

      cardDiv.addClass("card five-card").appendTo(columnDiv);

      var cardBodyDiv = $("<div>");

      cardBodyDiv
        .addClass("card-body five-day-data")
        .append(`<p> date: ${MomentDate}</p>`)
        .append(`<p> temperature: ${temp}</p>`)
        .append(`<p>humidity: ${hum}</p>`)
        .appendTo(cardDiv);
    }
  });
}

$("#location-form").on("submit", displayWeatherInfo);
