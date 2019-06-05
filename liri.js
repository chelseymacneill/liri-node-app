//++++++++++++++++++ Set up +++++++++++++++++++++++++++++++
// Installed 
// Spotify : node-spotify-api, [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
let spotifyPackage = require('node-spotify-api');
// Axios : [Axios](https://www.npmjs.com/package/axios)
let axios = require("axios")
// Moment: (https://www.npmjs.com/package/monpmment)
let moment = require("moment")
// DotEnv: (https://www.npmjs.com/package/dotenv)
require("dotenv").config();
// FS : 
let fs = require("fs");

// No Install needed:
// OMDB API : (http://www.omdbapi.com)
// Bands In Town API : (http://www.artists.bandsintown.com/bandsintown-api)


//import the `keys.js` file and store it in a variable.
let keys = require("./keys.js");


// Access the Spotify keys
let spotify = new spotifyPackage(keys.spotify);

//console.log(JSON.stringify(keysOfSpotify))
//console.log(keysOfSpotify.id)
//console.log(keysOfSpotify.secret)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Gathering input from the CLI 
let command = process.argv[2];
let userInput = process.argv[3];

// If the user does not put in a song have the userInput default to "The Sign by Ace of Base"


// Switch statement to control which function gets run 
switch (command) {
  case 'concert-this':
  // API call to Bands In Town 
  concert()
  // Call the function that console logs the result
  break;
  case 'spotify-this-song':
  // API call to spotify 
  spotifyAPI()
  break;
  case 'movie-this':
  // API call to OMBD 
  movie()
  break;
  case 'do-what-it-says':
  other()
  break;
  default : 
  // 
  console.log("Default of the switch statement")
}

// Spotify API call 
function spotifyAPI() {
  // Takes input from the CLI for the Spotify API call and returns 1 result
  spotify.search({ type: 'track', query: userInput, limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    // Result
    let result = 
    
    "\nMode: " + command +
    "\nInput: " + userInput +
    "\n-----------------------------------------------------------" +
    "\nArtists: " + JSON.stringify(data.tracks.items[0].artists[0].name) +
    "\nSong Name: " + JSON.stringify(data.tracks.items[0].name) +
    "\nAlbum: " + JSON.stringify(data.tracks.items[0].album.name) +
    "\nPreview Link from Spotify: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify) +
    "\n---------------------------------------------------------------------"
    
    // Log the result
    console.log(result)
    
    // Writing the results of Spotify API Call to log.txt 
    fs.appendFile("log.txt", result , function(err) {
      
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
      
      // Otherwise, print
      console.log("log updated");
    });
  });
};

// OMDB API Call 
function movie() {
  axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy").then(
  function(response) {
    // For testing
    //console.log(response)
    
    let result =
    "\nMode: " + command +
    "\nInput: " + userInput +
    "\n-----------------------------------" +
    "\nTitle: " + JSON.stringify(response.data.Title) +
    "\nYear: " + JSON.stringify(response.data.Year) +
    "\nIMDB Rating: " + JSON.stringify(response.data.imdbRating) +
    "\nRotton Tomatoes Rating: " + JSON.stringify(response.data.Ratings[2].Value) +
    "\nLocation: " + JSON.stringify(response.data.Country) +
    "\nLanguage: " + JSON.stringify(response.data.Language) +
    "\nPlot: " + JSON.stringify(response.data.Plot) +
    "\nActors: " + JSON.stringify(response.data.Actors) +
    "\n---------------------------------------------------"
    
    // console logging 
    console.log(result)
    
    // Write the response to the log.txt file
    fs.appendFile("log.txt", result, function(err) {
      
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
      // Otherwise, it will print: "movies.txt was updated!"
      console.log("updated");
    });
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
};

// Bands in Town API CALL 
function concert() {
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
  function(response) {
    
    // For trouble shooting error messages
    // console.log(response)
    // console.log(response.data[1].venue.name)
    // console.log(response.data[1].venue.city)
    // console.log(response.data[1].venue.region)
    
    
    // Holds the response in a variable to be used for console logging and writing to a log file
    result = 
    "\nMode: " + command +
    "\nInput: " + userInput +
    "\n" + userInput + " is playing at the following times and locations: " +
    "\n" + "-------------------------------------" + "\n" +
    response.data[0].venue.name + "\n" + response.data[0].venue.city + " " + response.data[0].venue.region + "\n" + moment(response.data[0].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY')
    + "\n" + "-------------------------------------" + "\n" +
    response.data[1].venue.name + "\n" + response.data[1].venue.city + " " + response.data[1].venue.region + "\n" + moment(response.data[0].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY')
    + "\n" + "-------------------------------------" + "\n" +
    response.data[2].venue.name + "\n" + response.data[2].venue.city + " " + response.data[2].venue.region + "\n" + moment(response.data[0].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY')
    + "\n" + "-------------------------------------" + "\n" +
    response.data[3].venue.name + "\n" + response.data[3].venue.city + " " + response.data[3].venue.region + "\n" + moment(response.data[0].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY')
    + "\n" + "-------------------------------------"
    
    
    // Console log the result
    console.log(result);
    
    fs.appendFile("log.txt", result, function(err) {
      
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
      
      // Otherwise, it will print: "movies.txt was updated!"
      console.log("");
    });
    
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log("Error Request: " + error.request);
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      
      console.log("Sorry this artist has no upcoming events.");
    }
    console.log(error.config);
  });
};

function other() {
  // Using FS with an external text file to control LIRI
  
  // This block of code will read what is in
  // Core node package for reading and writing files
  fs.readFile("random.txt", "utf8", function(error, data) {
    
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    
    // We will then print the contents of data
    //console.log(data);
    
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    
    console.log(dataArr[0]);
    console.log(dataArr[1])
    // We will then re-display the content as an array for later use.
    command = dataArr[0];
    userInput = dataArr[1];
    
    switch (command) {
      case "concert-this":
      concert();
      break;
      
      case "spotify-this-song":
      spotifyAPI();
      break;
      
      case "movie-this":
      movie();
      break;
      
    }
    
    
  });
};

