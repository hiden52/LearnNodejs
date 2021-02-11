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

const listSchema = {
    name : String,
    items : [taskSchema]
}

// 매번 새로운 collection을 만들지 말고 하나의 collection에 document를 만들고
// property : array로 여러 목록을 관리
const List = mongoose.model("list", listSchema);

app.get("/", (req, res) => {
    const day = date.getDate(); // Using switch statemnt is not good

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

app.get("/:categoryName", (req, res) => {
    // 02.10 10:05 코드 다시짜자

    const category = req.params.categoryName;

    List.findOne({name: category}, (err, foundList) => {
        if(!err) {
            if(!foundList){
                const list = new List({
                    name: category,
                    items: defaultTasks
                });
                list.save();
                res.redirect("/" + category);
            } else {
                res.render("list", {
                    kindOfDay: foundList.name,
                    tasks: foundList.items
                });
            }
        } else {
            console.log(err);
        }
    });
   
});

app.post("/", (req, res) => {
    // const item = req.body.task;
    // items.push(item);
    
    const postFrom = req.body.submitPost;
    const taskName = req.body.task;
    //console.log(postFrom);
    if(postFrom === date.getDate()) {
        const newtask = new Task({ name: req.body.task });    
        newtask.save();
    
        res.redirect("/");
    } else {
        List.findOne({name: postFrom}, (err, foundDoc) => {
            if(!err) {
                foundDoc.items.push(Task({name: taskName}));
                foundDoc.save();
                res.redirect("/" + postFrom);                
            }
            
        });  
    }
});
    
app.post("/:categoryName", (req, res) => {
    const category = req.params.categoryName;
    const NewCategory = mongoose.model(category);
    const newtask = new NewCategory({ name: req.body.task });
    newtask.save();

    res.redirect("/" + category);
});

//  root 페이지가 아닌 다른 곳에서 딜리트 할 경우를 구현해야함.
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
