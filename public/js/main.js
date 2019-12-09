
console.log("Javascript in the front end");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const title = document.getElementById("title");
const cityName = document.getElementById("city");
const currentTemp = document.getElementById("temp");
const weatherDescription = document.getElementById("description");
const wind = document.getElementById("wind");
const cloud = document.getElementById("cloud");
const tempRange = document.getElementById("tempRange");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;
    title.textContent = "Loading...";

    fetch("http://localhost:3000/api?city="+ city +"&country=uk").then( (response) => {
        response.json().then((data) => {
            console.log("data");
            console.log(data.allData);
            if (data.error) {
                console.log(data.error);
                title.textContent = data.error;
            } else {
                title.textContent = "Simon says the current forecast for";
                cityName.textContent = data.city.toUpperCase();
                currentTemp.textContent = "Current Temp: " + Math.round(data.temp) + "℃";
                weatherDescription.textContent = "Weather: " + data.weather;
                wind.textContent = "Wind Speed: " + data.windSpeed + " m/s";
                cloud.textContent = "Cloud Cover: " + data.cloudCover + "%";
                tempRange.textContent = "Temp Range: " + Math.round(data.tempMin) + "℃ - " + Math.round(data.allData.main.temp_max) + "℃";

                console.log("running");
            }
        })
    })
})





