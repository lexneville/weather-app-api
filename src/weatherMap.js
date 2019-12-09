const request = require("request");


const forecast = (city, country, units, callback) => {
    const encodedCityName = encodeURIComponent(city);
    const encodedCountryName = encodeURIComponent(country);

    const weatherMapUrl = `http://api.openweathermap.org/data/2.5/weather?q=${encodedCityName},${encodedCountryName}&units=${units}&APPID=f37fdcaa1c983d7dac860b0dc0d0b9b6`;
    
    request({url: weatherMapUrl, json: true}, (error, response) => {

        // const data = JSON.parse(response.body); // Unnecessary if we add the json: true arguement to the request call.

        if (error) {
            console.log("Error cannot connect to the API service");
        } else if (response.body.name === undefined) {
            console.log("This city does not exist");
        } else {
            console.log(`Today we have mainly ${response.body.weather[0].description}`);
            console.log(`The current temperature in ${response.body.name} is ${response.body.main.temp} degrees Centigrade`);
            callback(response.body)        
        }     
    });
    
    
}

module.exports = forecast;
// exports.weatherData = weatherData;

