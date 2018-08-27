var express = require("express");
var ctrl = require("../controllers/controller.js");
var passport = require("passport");
var router = express.Router();

// ************************  The front end part *************************

// The home page
router.get("/", ctrl.homeCtrl);

// The blog list page
router.get("/blog", function (req, res) {
    res.redirect("/blog/1");
});

// The blog list page
router.get("/blog/:num", ctrl.blogListCtrl);

// The single blog post page
router.get("/blogItem/:num", ctrl.blogPageCtrl);



// ************************  The back end part *************************

//Login page 
router.get("/admin/login", function(req, res) {
    res.render("adminLogin", {"title": "Login"});
});

// Default
router.get("/admin", passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/admin/login' }), function(req, res) {
    res.redirect("/admin/editHome");
});

// Add a new blog item
router.get("/admin/newBlog", passport.authenticate('local', { successRedirect: '/admin/newBlog',
                                   failureRedirect: '/admin/login' }), ctrl.newBlogCtrl);

// Edit a blog item
router.get("/admin/editBlog/:num", passport.authenticate('local', { successRedirect: '/admin/editBlog/:num',
                                   failureRedirect: '/admin/login' }), ctrl.editBlogCtrl);

// Edit the home page
router.get("/admin/editHome", passport.authenticate('local', { successRedirect: '/admin/editHome',
                                   failureRedirect: '/admin/login' }), ctrl.editHomeCtrl);

// List the blog items for updating
router.get("/admin/listBlog", passport.authenticate('local', { successRedirect: '/admin/listBlog',
                                   failureRedirect: '/admin/login' }), function (req, res) {
    res.redirect("/admin/listBlog/1");
});

// List the blog items for updating
router.get("/admin/listBlog/:num", passport.authenticate('local', { successRedirect: '/admin/listBlog/:num',
                                   failureRedirect: '/admin/' }), ctrl.adminBlogListCtrl);


// ************************  The REST api *************************

// Check if login is correct
router.post('/login',
            passport.authenticate('local', { successRedirect: '/admin/editHome',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


// Get the home info
router.get("/home.json", ctrl.getHomeData);

// Add a new blog
router.post("/admin/newBlog", ctrl.postNewBlog);

// Send changes for editing the home page
router.post("/admin/editHome", ctrl.postEditHome);

// Send changes for editing a blog
router.post("/admin/editBlog/:num", ctrl.postEditBlog);

// Deleting blog post
router.delete("/admin/editBlog/:num", ctrl.deleteEditBlog);

module.exports = router;
