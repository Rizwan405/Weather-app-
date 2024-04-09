// connectin the whether components to js
//taking out the search value and save it to variables
//makin global variable that is used for saving later value in it
let city = "";
const apiKey = "a755ac3abeb73906af6ee0ce8d84b1ea";
const serachText = document.querySelector("#search-text");
const btnSearch = document.querySelector(".btn-search");
const btnLocation = document.querySelector(".btn-location");
const img = document.querySelector(".main-img");
const country = document.querySelector(".country-name");
const temp = document.querySelector(".temp-span");
const humidity = document.querySelector(".humidity-span");
const wind = document.querySelector(".wind-span");
const mainContent = document.querySelector(".main");
const errorMessage = document.querySelector(".error-message");
//making functionality
btnSearch.addEventListener("click", function () {
  city = serachText.value;
  fetchData(city);
});
function updateUi(data) {
  country.textContent = data.name;
  img.src = `images/${data.weather[0].main}.png`;
  temp.textContent = `${Math.round(data.main.temp - 273.15)}`;
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
  serachText.value = "";
  mainContent.style.height = `${310}px`;
  mainContent.style.opacity = `${100}`;
  errorMessage.style.opacity = 0;
  errorMessage.style.height = `${0}px`;
}
function fetchData(city) {
  const res = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  res
    .then((responce) => {
      if (responce.status !== 200) {
        errorMessage.style.opacity = 1;
        errorMessage.style.height = `${20}px`;
      } else {
        return responce.json();
      }
    })
    .then((data) => {
      updateUi(data);
    });
}
function fetchLocation(lon, lat) {
  const res = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  res
    .then((responce) => {
      if (responce.status !== 200) {
        console.log("Error while fetching");
      } else {
        return responce.json();
      }
    })
    .then((data) => {
      updateUi(data);
    });
}
//getting user location
//we use geolocation api to perform this task
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      fetchLocation(longitude, latitude);
    });
  } else {
    console.log("location not found");
  }
}

//adding functionality to our current position location button
btnLocation.addEventListener("click", function () {
  getLocation();
});
