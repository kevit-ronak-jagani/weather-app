const express = require("express");
const path = require("path");
const hbs = require("hbs");
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
// To define a middleware function, we call app.use()
app.use(express.static(publicDir));

app.get("", (req, res) => {
    // res.send("Hello express");
    res.render("index", {
        title: "Weather App",
        name: "Ronak Jagani"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        text: "Helping....",
        title: "Help",
        name: "Ronak"
    })
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ronak Jagani"
    });
});

app.get("/weather", async function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    try {
        console.log(req.query.address);
        const data = await geocode(req.query.address);

        const forecastData = await forecast(data.latitude, data.longitude);
        const loc = data.location;
        res.send({
            forecast: forecastData,
            location: loc,
            address: req.query.address
        })
    }
    catch (error) {
        console.log(error)
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