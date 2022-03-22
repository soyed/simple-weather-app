const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join('__dirname', '../templates/views');
const partialsPath = path.join('__dirname', '../templates/partials');

// Setup view engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// => Setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Samuel Oyediran' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Samuel Oyediran',
    helpMessage: 'this page contains resources to answer common questions.',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Samuel Oyediran' });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    res.send({
      error: 'Provide an address for weather service',
    });
    return;
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, { forecast } = {}) => {
      if (error) return res.send({ error });

      res.send({ forecast, location, address });
    });
  });
});

app.get('/products', (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.send({
      error: 'Provide a search term',
    });
    return;
  }

  res.send({
    products: [],
  });

  console.log(req.query);
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found!',
    name: 'Samuel Oyediran',
  });
});

// Handling 404 errors
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Samuel Oyediran',
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
