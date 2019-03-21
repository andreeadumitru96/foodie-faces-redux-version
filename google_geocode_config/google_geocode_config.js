let NodeGeocoder = require('node-geocoder');

let options = {
  provider: 'google',
 
  httpAdapter: 'https', 
  apiKey: 'AIzaSyD7oshv5NM8XjK0atV7BCRtqzZ3on6Wslo', 
  formatter: null
};

module.exports = { options: options, nodeGeocoder: NodeGeocoder };

// export const geocoder = new NodeGeocoder(options);
 
