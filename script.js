// Initial array of cities
var cities = ["Louisville", "Newark", "New Haven"];

// Function for displaying movie data
function renderButtons() {
  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {
    // Then dynamicaly generating buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of city-btn to our button
    a.addClass("city-btn");
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a city button is clicked
$("#add-location").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var newLocation = $("#location-input")
    .val()
    .trim();

  // Adding movie from the textbox to our array
  cities.push(newLocation);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

$(document).on("click", ".city-btn", function(event) {
  var city = $(this).text();
  var queryURL = buildQueryURL(city);
  console.log(queryURL);
});

/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for WEATHER API based on form inputs
 */

function buildQueryURL(city) {
  console.log(city);
  // queryURL is the url we'll use to query the API
  var queryURL = "api.openweathermap.org";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "api-key": "327fd5e4c25354dfdd72fbe1fb823d1d" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = city;
  console.log(queryParams);

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + "?" + $.param(queryParams);
}

// FOR LATERS
// Adding a click event listener to all elements with a class of "city-btn" this is what it said in movies: $(document).on("click", ".city-btn", displayDataInfo);
$(document).on("click", ".city-btn");

// Calling the renderButtons function to display the initial buttons
renderButtons();

// OTHER STUFF FROM MOVIE HW
// displayDataInfo function re-renders the HTML to display the appropriate content
// function displayDataInfo() {
//   var movie = $(this).attr("data-name");
//   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

//   // Creating an AJAX call for the specific movie button being clicked
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     // Creating a div to hold the movie
//     var movieDiv = $("<div class='movie'>");

//     // Storing the rating data
//     var rating = response.Rated;

//     // Creating an element to have the rating displayed
//     var pOne = $("<p>").text("Rating: " + rating);

//     // Displaying the rating
//     movieDiv.append(pOne);

//     // Storing the release year
//     var released = response.Released;

//     // Creating an element to hold the release year
//     var pTwo = $("<p>").text("Released: " + released);

//     // Displaying the release year
//     movieDiv.append(pTwo);

//     // Storing the plot
//     var plot = response.Plot;

//     // Creating an element to hold the plot
//     var pThree = $("<p>").text("Plot: " + plot);

//     // Appending the plot
//     movieDiv.append(pThree);

//     // Retrieving the URL for the image
//     var imgURL = response.Poster;

//     // Creating an element to hold the image
//     var image = $("<img>").attr("src", imgURL);

//     // Appending the image
//     movieDiv.append(image);

//     // Putting the entire movie above the previous movies
//     $("#locations-view").prepend(movieDiv);
//   });
// }
