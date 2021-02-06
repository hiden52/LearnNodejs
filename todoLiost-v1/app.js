const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});