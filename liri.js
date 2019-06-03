//++++++++++++++++++ Set up +++++++++++++++++++++++++++++++
// Installed 
// Spotify : node-spotify-api, [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
// Axios : [Axios](https://www.npmjs.com/package/axios)
// Moment: (https://www.npmjs.com/package/monpmment)
// DotEnv: (https://www.npmjs.com/package/dotenv)
// FS : 


// NO Install needed 
// OMDB API : (http://www.omdbapi.com)
// Bands In Town API : (http://www.artists.bandsintown.com/bandsintown-api)

// Axios 
let axios = require("axios")


// Spotify API Set up ===============================

// read and set any environment variables with the dotenv package
require("dotenv").config();

//import the `keys.js` file and store it in a variable.
let keys = require("./keys.js");

// Access the spotify keys from the keys.js file
let keysOfSpotify = keys.spotify

//console.log("Why won't you run" + keysOfSpotify)
//console.log(JSON.stringify(keysOfSpotify))
//console.log(keysOfSpotify.id)
//console.log(keysOfSpotify.secret)
// ===================================================



// Retrieve data via Axios from Bands in Town

// Retrieve data via Axios from OMDB



// Switch statement to control which function gets run 
let command = process.argv[2];
// 
let userInput = process.argv[3];

switch (command) {
  case 'concert-this':
  // API call to Bands In Town 
  concert()
  break;
  case 'spotify-this-song':
  // API call to spotify 
  spotifyapi()
  break;
  case 'movie-this':
  // API call to OMBD 
  movie()
  break;
  case 'do-what-it-says':
  // 
  break;
  default : 
  // 
  console.log("Default of the switch statement")
}

// Retrieve data via Axios from Spotify 
let Spotify = require('node-spotify-api');

let spotify = new Spotify({
  id: '86e3d346227645a3bedc489eaeec29ee',
  secret: 'e90dae2b5fe143b6950baeb5aa2d19bf'
});

// Spotify API call 
function spotifyapi() {
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
    console.log("Title: " + JSON.stringify(response.data.Title) + "/n" +
                 "Title: " + JSON.stringify(response.data.Title))
    console.log("Year: " + JSON.stringify(response.data.Year));
    console.log("IMDB Rating: " + JSON.stringify(response.data.imdbRating));
    console.log("Rotton Tomatoes Rating: " + JSON.stringify(response.data.Ratings[2].Value));
    console.log("Location: " + JSON.stringify(response.data.Country));
    console.log("Location: " + JSON.stringify(response.data.Language));
    console.log("Plot: " + JSON.stringify(response.data.Plot));
    console.log("Actors: " + JSON.stringify(response.data.Actors));

    
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

// Using FS with an external text file to control LIRI
// Core node package for reading and writing files
let fs = require("fs");

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
