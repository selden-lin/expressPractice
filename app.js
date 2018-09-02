var express = require("express");
var router = require("./routes/router");
var path = require("path");
var bodyParser = require("body-parser")

var app = express();
var cookieParser = require('cookie-parser');
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require('connect-flash');

// Used for the db
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

mongoose.connect("mongodb://linseld9:linseld913@ds141902.mlab.com:41902/michaelauth");

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var userSchema = mongoose.Schema({
    username: 'string',
    password: 'string',
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return password == this.password;
};

var User = mongoose.model("auth", userSchema);
User.findOne({}, 'username password', function (err, person) {
    if (err) return handleError(err);
});

// Setup app plugins
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(bodyParser());
app.use("/", router);
app.use(express.static("public"));

app.set("views", [path.join(__dirname, "views/admin"), path.join(__dirname, "views/partials"), path.join(__dirname, "views/user")]);
app.set("view engine", "ejs");

// Passport setup
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {
        User.findOne({
            'username': username
        }, function (err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                
            return done(null, user);
        });

    }));

app.listen(3000, function () {
    console.log("Go to localhost 3000");
});
