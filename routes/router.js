var express = require("express");
var ctrl = require("../controllers/controller.js");
var router = express.Router();

// ************************  The front end part *************************

// The home page
router.get("/", homeCtrl(req, res));

// The blog list page
router.get("/blog", function(req, res) {
    res.redirect("/blog/1");
})

// The blog list page
router.get("/blog/:num", blogListCtrl(req, res));

// The single blog post page
router.get("/blogItem/:num", blogPageCtrl(req, res));

// The resume
router.get("/resume", resumeCtrl(req, res));

// ************************  The back end part *************************


// Add a new blog item
router.get("admin/newBlog", newBlogCtrl(req, res));

// Edit a blog item
router.get("admin/editBlog/:num", editBlogCtrl(req, res));

// Edit the home page
router.get("admin/editHome", editHomeCtrl(req, res));

// List the blog items for updating
router.get("admin/listBlog/:num", adminBlogListCtrl(req, res)));


// ************************  The REST api *************************


module.exports = router;