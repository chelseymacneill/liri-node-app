
//++++++++++++++++++ Set up +++++++++++++++++++++++++++++++
// Installed 
// Spotify : node-spotify-api, [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
// Axios : [Axios](https://www.npmjs.com/package/axios)
// Moment: (https://www.npmjs.com/package/monpmment)
// DotEnv: (https://www.npmjs.com/package/dotenv)


// NO Install needed 
// OMDB API : (http://www.omdbapi.com)
// Bands In Town API : (http://www.artists.bandsintown.com/bandsintown-api)


// Retrieve data via Axios from Spotify 
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '86e3d346227645a3bedc489eaeec29ee',
  secret: 'e90dae2b5fe143b6950baeb5aa2d19bf'
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

// Retrieve data via Axios from Bands in Town


// Retrieve data via Axios from OMDB

