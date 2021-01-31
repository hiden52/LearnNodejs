const express =require("express");
const https = require("https");
const bodyParder = require("body-parser");

const app = express();
app.use(bodyParder.urlencoded({extended: true}));

const port = 3000;

app.get("/", (req, res)=> {

    res.sendFile(__dirname + "/index.html");

    

});

app.post("/", (req, res) => {
    const apiKey = "9aa18f64e07f432ba788fb10fd2435a2";
    const cityName = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
    res.type("html");

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            

            const temp = weatherData.main.temp;
            const weatherDescrip = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            
            res.write(`<h1>The temperature in ${cityName} is ${temp} degrees Celcius.</h1>`);
            res.write("<p>The weather is currently " + weatherDescrip + "</p>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
            //console.log(weatherData);
           // console.log(JSON.stringify(object));

        });
    });

})



app.listen( port, ()=>{
    console.log(`Server is running on port ${port}.`);
})