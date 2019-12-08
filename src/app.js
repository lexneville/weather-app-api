// Use terminal command "npm init -y" to create the package.json file
// Use terminal command "npm install express" to install express dependencies

const express = require('express');
const path = require("path");
const hbs = require("hbs");
// Allows myForecast() to be called from this file.
const myForecast = require("./weatherMap"); 

const app = express();
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

let weatherData;
let userCity;



hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set('views', viewsPath);

// myForecast("manchester", "uk", "metric", (response) => {
//     weatherData = response;
//     userCity = weatherData.name;
//     console.log(userCity);
          
// }); 



console.log(`Outside function ${userCity}`);



app.get("/", (request, response) => {
    response.render("index", {
        title: "Weather App",
        author: "Jody Richardson"
    });
});

app.get("/forecast", (request, response) => {
    response.render("forecast", {
        // data: weatherData,
        // weather: weatherData.weather[0].description
    });
});

app.get("/about", (request, response) => {
    response.render("about");
});

app.get("/contact", (request, response) => {
    response.send("<h1>Contact Pages</h1>");
});

// app.get('/api', (request, response) => {
//     response.send(
//         {
//         data: weatherData,
//         }
//     )
// })

app.get('/api', (req, res) => {
    console.log(req.query);
    
    if(!req.query.city) {
        res.send({
            error: 'Please enter a city name'
        })
    } else {

        myForecast(req.query.city, "uk", "metric", (response) => {
            if (response.error) {
                res.send({
                    error: response.error
                })
            } else {
                res.send({
                    city: req.query.city,
                    country: req.query.country,
                    temp: response.main.temp
                })
            }
        });
        
        
    }
}
)

app.get("*", (request, response) => {
    response.send("<h1>404 Your Page Does Not Exist!</h1>")
})

// console.log(__dirname);
// console.log(__filename);


app.listen(3000, () => {
    console.log("Server is running!");
});



// install nodemon to auto update server on file changes.
// terminal command "sudo install -g nodemon" 

