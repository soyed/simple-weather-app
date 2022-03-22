const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.API_KEY_MAPBOX}&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (!response.body.features.length) {
      callback('Location undefined. Try another location!', undefined);
    } else {
      const {
        center: [lat, lng],
        place_name,
      } = response.body.features[0];

      callback(undefined, {
        latitude: lat,
        longitude: lng,
        location: place_name,
      });
    }
  });
};

module.exports = geoCode;
