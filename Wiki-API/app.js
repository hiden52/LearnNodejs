const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/wikiDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch(console.error);

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("articles", articleSchema);

const coding = new Article({
  title: "Coding",
  content: "Coding is so fun!",
});
//coding.save();

app.get("/", (req, res) => {
  res.render("post", {});
});


///////////////////////////////// Request Targetting All Articles
app
  .route("/article") //
  .get((req, res) => {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save();

    res.redirect("/article");
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Deleted All Articles");
      } else {
        res.send(err);
      }
    });
  });


  /////////////////////////// Request Targetting A Specific Article //
  app
  .route("/article/:title") //
  .get((req, res) => {
    Article.findOne({ title: req.params.title }, (err, foundArticle) => {
      if (foundArticle) res.send(foundArticle);
      else res.send("Not Found");
    });
  });



app.listen(3000, () => {
  console.log("Server started on port 3000");
});
