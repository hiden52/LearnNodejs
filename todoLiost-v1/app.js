const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

const items = ["Coding", "Learn JS", "Master Rea"];

app.get("/", (req, res) => {
    // not good
    //   switch (currentDay) {
    //     case 0:
    //       day = "Sunday";
    //       break;
    //     case 1:
    //       day = "Monday";
    //       break;
    //     case 2:
    //       day = "Tuesday";
    //       break;
    //     case 3:
    //       day = "Wendsday";
    //       break;
    //     case 4:
    //       day = "Thursday";
    //       break;
    //     case 5:
    //       day = "Friday";
    //       break;
    //     case 6:
    //       day = "Saturday";
    //       break;
    //     default:
    //       console.log("Error: current day is equal to: " + currentDay);
    //   }
    const day = date.getDate();
    res.render("list", { kindOfDay: day, newTasks: items });
});

app.post("/", (req, res) => {
    item = req.body.task;
    items.push(item);

    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
