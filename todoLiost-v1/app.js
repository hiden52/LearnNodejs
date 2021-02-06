const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
let items = ["Coding", "Learn JS", "Master React"];

app.get("/", (req, res) => {
  const today = new Date();
  const currentDay = today.getDay();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const day = today.toLocaleDateString("en-US", options);

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
