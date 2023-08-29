const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { title } = require("process");
const app = express();

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

//define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlers engine and views location
app.set("view engine", 'hbs')
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
    // res.send("Hello express");
    res.render("index", {
        title: "Weather App",
        name: "Ronak"
    });
});

app.get("/help", (req, res) => {
    // res.send("Help page");
    res.render("help", {
        text: "Helping....",
        title: "Help",
        name: "Ronak"
    })
});

app.get("/about", (req, res) => {
    // res.send("<h1>About page</h1>")
    res.render("about", {
        title: "About Me",
        name: "Ronak Jagani"
    });
});
// app.get("/weather", (req, res) => {
//     res.send({
//         forecast: "rainy",
//         location: "Rajkot"
//     });
// });

app.get("/weather", async function(req, res){
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    try {
        const data = await geocode(req.query.address);
        const forecastData = await forecast(data.latitude, data.longitude);
        const loc = data.location;
        res.send({
            forecast: forecastData,
            location: loc,
            address: req.query.address
        })
    }
    catch(error) {
        res.send({
            error: "Provide valid address"
        })
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        err: "Help artical not found",
        name: "Ronak"
    })
})
app.get("*", (req, res) => {
    res.render("404", {
        err: "Page not found",
        name: "Ronak",
        title: "404"
    })
})
app.listen(3000, () => {
    console.log("Server on port 3000");
});