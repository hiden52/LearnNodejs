const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

app.get("/", (req, res) => { 
    // res.send("<h1>Hello, world!</h1>"); 
    res.sendFile(__dirname + "/index.html");
} );

app.post("/", (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    let result = num1 + num2;

    res.send("Result: " + result);
})

app.get("/bmicalculator", (req, res) => {
    res.sendFile( __dirname + "/bmiCalculator.html");
});
app.post("/bmicalculator", (req, res) => {
    let height = parseFloat(req.body.height);
    let weight = parseFloat(req.body.weight);

    let bmi = (weight / Math.pow(height, 2));

    res.send("<span>Your BIM is \"<strong>" +  bmi.toFixed(1) + "\"</strong></span>");
})

app.listen(port, () => {
    console.log("Sever started");
});

