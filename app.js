var express = require("express");
var router = require("./routes/router");
var path = require("path");

var app = express();

app.use("/", router);
app.use(express.static("public"));

app.set("views", [path.join(__dirname, "views/admin"), path.join(__dirname, "views/partials"),path.join(__dirname, "views/user")]);
app.set("view engine", "ejs");

app.listen(3000, function() {
    console.log("Go to localhost 3000");
})