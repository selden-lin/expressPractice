var express = require("express");
var router = require("./routes/router");
var path = require("path");
var bodyParser = require("body-parser")

var app = express();
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var port = process.env.PORT || 3000;

app.use(session({
    secret: "cats"
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use("/", router);
app.use(express.static("public"));

app.set("views", [path.join(__dirname, "views/admin"), path.join(__dirname, "views/partials"), path.join(__dirname, "views/user")]);
app.set("view engine", "ejs");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));

app.listen(port, function () {
    console.log("Go to localhost "+port);
});
