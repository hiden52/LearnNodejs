//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, { secret : secret, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.render('home');
});
app.get("/register", (req, res) => {
    res.render('register');
});

app.route("/login")
.get((req, res) => {
    res.render('login');
})
.post((req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    User.findOne({
        email : userName,
    }, (err, foundUser) => {
        if (foundUser) {
            // findOne에 성공해서 fillter에 해당하는 doc 반환할 때
            // decryption 하는 것 같음.
            if (foundUser.password === password) {
                console.log(foundUser);
                res.render("secrets");
            }
        }
        else res.send("Invalid email or password.");
    });
})

app.route("/register")
.get ((req, res) => {
    res.render('register');
})
.post((req, res) => {
    const newUser = User({
        email : req.body.username,
        password: req.body.password
    });
    newUser.save(err => {
        if (err) console.log(err);
        else res.render("secrets");
    });
});


//
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
