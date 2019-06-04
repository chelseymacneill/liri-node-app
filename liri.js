//++++++++++++++++++ Set up +++++++++++++++++++++++++++++++
// Installed 
// Spotify : node-spotify-api, [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
// Axios : [Axios](https://www.npmjs.com/package/axios)
// Moment: (https://www.npmjs.com/package/monpmment)
// DotEnv: (https://www.npmjs.com/package/dotenv)
// FS : 

// No Install needed:
// OMDB API : (http://www.omdbapi.com)
// Bands In Town API : (http://www.artists.bandsintown.com/bandsintown-api)

// Axios 
let axios = require("axios")
// Core node package for reading and writing files
let fs = require("fs");


// Spotify API Set up ===============================
// Read and set any environment variables with the dotenv package
require("dotenv").config();

//import the `keys.js` file and store it in a variable.
let keys = require("./keys.js");

var Spotify = require('node-spotify-api');

// Retrieve data via Axios from Spotify
let spotify = new Spotify(keys.spotify);

//console.log(JSON.stringify(keysOfSpotify))
//console.log(keysOfSpotify.id)
//console.log(keysOfSpotify.secret)
// ===================================================

// Gathering input from the CLI 
let command = process.argv[2];
let userInput = process.argv[3];

// Switch statement to control which function gets run 
switch (command) {
  case 'concert-this':
  // API call to Bands In Town 
  concert()
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
  doWhatItSays()
  break;
  default : 
  // 
  console.log("Default of the switch statement")
}

// Spotify API call 
function spotifyAPI() {
  spotify.search({ type: 'track', query: 'All the Small Things', limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    //console.log(data)
    console.log(JSON.stringify("Name :" +  data.tracks.items[0].artists[0].name));
  });
  
  // Writing the results of Spotify API Call to log.txt 
  //   fs.writeFile("log.txt", [variable holding the response] , function(err) {
  
  //     // If the code experiences any errors it will log the error to the console.
  //     if (err) {
  //       return console.log(err);
  //     }
  
  //     // Otherwise, it will print: "movies.txt was updated!"
  //     console.log("log updated");
};

// OMDB API Call 
function movie() {
  axios.get("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy").then(
  function(response) {
    
    let result = "\n-----------------------------------" +
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
    console.log("")
    console.log("SEE BELOW FOR UPCOMING CONCERTS. BAND: " + userInput)
    console.log("-------------------------------------")
    console.log(response.data[0].venue.name);
    console.log(response.data[0].venue.city + " " + response.data[0].venue.region);
    console.log(moment(response.data[0].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY'));
    console.log("-------------------------------------")
    console.log(response.data[1].venue.name);
    console.log(response.data[1].venue.city + " " + response.data[1].venue.region);
    console.log(moment(response.data[1].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY'));
    console.log("-------------------------------------")
    console.log(response.data[2].venue.name);
    console.log(response.data[2].venue.city + " " + response.data[2].venue.region);
    console.log(moment(response.data[2].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY'));
    console.log("-------------------------------------")
    console.log(response.data[3].venue.name);
    console.log(response.data[3].venue.city + " " + response.data[3].venue.region);
    console.log(moment(response.data[3].datetime.substring(0,10), 'YYYY MM DD').format('MM/DD/YY'));
    console.log("-------------------------------------")
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

// Do what it says functionality
function doWhatItSays() {
  // This block of code will read what is in 
  fs.readFile("random.txt", "utf8", function(error, data) {
    
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    
    // We will then print the contents of data
    console.log(data);
    
    // Then split it by commas (to make it more readable)
    let dataArr = data.split(",");
    
    
    command = dataArr[0];
    input = dataArr[1];
    
    // We will then re-display the content as an array for later use.
    console.log(dataArr);
    
  });
};
