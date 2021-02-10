const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

const items = ["Coding", "Learn JS", "Master React"];
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const taskSchema = {
    name: {
        type: String,
        required: true,
    },
};
const Task = mongoose.model("Task", taskSchema);

const coding = new Task({
    name: "Code all day!",
});
const study = new Task({ name: "Study" });
const buySnacks = new Task({ name: "Buy some snacks" });

const defaultTasks = [coding, study, buySnacks];

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

    Task.find({}, (err, tasks) => {
        if (tasks.length === 0) {
            Task.insertMany(defaultTasks, (err) => {
                if (err) console.log(err);
                else {
                    console.log("Successfully insert docs!");
                    res.redirect("/");
                }
            });
        } else res.render("list", { kindOfDay: day, tasks: tasks });
    });
});

// 루트페이지로 들어가면 버그발생 ㅜㅜ 고치자!
app.get("/:categoryName", (req, res) => {
    const category = req.params.categoryName;

    const collections = mongoose.modelNames();
    collections.forEach((col, i) => {
        if(col === category) {
            console.log("It name of collection exists!");
            const NewCategory = mongoose.model(category);
        }
        if(i === collections.length) {const NewCategory = mongoose.model(category, taskSchema);}

    });
    

    NewCategory.find({}, (err, tasks) =>{
        res.render("list", {kindOfDay: category, tasks: tasks});
    });
    console.log(mongoose.modelNames());

});

app.post("/", (req, res) => {
    // const item = req.body.task;
    // items.push(item);
    const newtask = new Task({ name: req.body.task });
    newtask.save();

    res.redirect("/");
});
app.post("/:categoryName", (req, res) => {
    const category = req.params.categoryName;
    const NewCategory = mongoose.model(category);
    const newtask = new NewCategory({ name: req.body.task });
    newtask.save();

    res.redirect("/" + category);
});

app.post("/delete", (req, res) => {
    const checkedTaskId = req.body.checkbox;
    if (checkedTaskId) {
        Task.findByIdAndDelete(checkedTaskId, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted the document!");
            }
        });
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
