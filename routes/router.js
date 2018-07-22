var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("home", {title: "home"}) 
});

router.get("/seasoning/:item", function(req, res) {
    res.render("seasoning", {title: "item", name: req.params.item});
})

module.exports = router;