console.log('Client side javascript');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const firstText = document.querySelector('.text1');
const secondText = document.querySelector('.text2');

const fetchWeather = (location, callback) => {
  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => callback(data));
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = searchElement.value;
  firstText.textContent = 'loading...';

  fetchWeather(location, (data = {}) => {
    if (data.error) {
      const { error } = data;
      firstText.textContent = error;
      secondText.textContent = '';
    } else {
      const { location, forecast } = data;
      firstText.textContent = location;
      secondText.textContent = forecast;
    }
  });
});
