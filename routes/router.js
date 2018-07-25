var express = require("express");
var ctrl = require("../controllers/controller.js");
var router = express.Router();

// ************************  The front end part *************************

// The home page
router.get("/", ctrl.homeCtrl);

// The blog list page
router.get("/blog", function(req, res) {
    res.redirect("/blog/1");
});

// The blog list page
router.get("/blog/:num", ctrl.blogListCtrl);

// The single blog post page
router.get("/blogItem/:num", ctrl.blogPageCtrl);

// The resume
router.get("/resume", ctrl.resumeCtrl);

// ************************  The back end part *************************


// Add a new blog item
router.get("admin/newBlog", ctrl.newBlogCtrl);

// Edit a blog item
router.get("admin/editBlog/:num", ctrl.editBlogCtrl);

// Edit the home page
router.get("admin/editHome", ctrl.editHomeCtrl);

// List the blog items for updating
router.get("admin/listBlog/:num", ctrl.adminBlogListCtrl);


// ************************  The REST api *************************


module.exports = router;