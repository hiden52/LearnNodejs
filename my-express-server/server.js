const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>hello, World!</h1>");
});
app.get("/contact", (req, res) => {
    res.send("<h2>Contact me</h2>")
});

app.get("/about", (req, res) => {
    res.send("<h2>I'm a Developer</h2><ul><li>JAVASCRIPT</li><li>C++</li></ul>");
});

app.get("/hobby", (req, res) => {
    res.send("<strong>Coding</strong> is fun!");
});

app.listen(port, () => {
    console.log("Server started on port 3000");
});