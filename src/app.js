// Use terminal command "npm init -y" to create the package.json file
// Use terminal command "npm install express" to install express dependencies

const express = require('express');
const path = require("path");
const hbs = require("hbs");
const myForecast = require("./weatherMap"); // Allows myForecast() to be called from this file.

const app = express();
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialPath);

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set('views', viewsPath);

myForecast("ouagadougou", "bf", "metric"); // Added to check the function has been imported correctly

app.get("/", (request, response) => {
    response.render("index", {
        title: "Weather App",
        author: "Jody Richardson"
    });
});

app.get("/about", (request, response) => {
    response.render("about");
});

app.get("/contact", (request, response) => {
    response.send("<h1>Contact Pages</h1>");
});

app.get('/api', (request, response) => {
    response.send(
        {
            forecast: "It is sunny",
            location: "Manchester"
        }
    )
})

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

