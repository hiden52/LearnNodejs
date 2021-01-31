const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/signup.html");
});

app.post("/", (req, res) => {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;
    console.log(firstName, lastName, email);
})



app.listen(port, () => {
    console.log("Server is running on port" + port); 
});