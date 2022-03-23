const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/forecast?access_key=${process.env.API_KEY_WEATHERSTACK}&query=${longitude},${latitude}&units=f`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location. Try another location!', undefined);
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } =
        response.body.current;

      callback(undefined, {
        forecast: `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%`,
      });
    }
  });
};

module.exports = forecast;
