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
router.get("/admin", isLoggedIn, function(req, res) {
    res.redirect("/admin/editHome");
});

// Add a new blog item
router.get("/admin/newBlog", isLoggedIn, ctrl.newBlogCtrl);

// Edit a blog item
router.get("/admin/editBlog/:num", isLoggedIn, ctrl.editBlogCtrl);

// Edit the home page
router.get("/admin/editHome", isLoggedIn, ctrl.editHomeCtrl);

// List the blog items for updating
router.get("/admin/listBlog", isLoggedIn, function (req, res) {
    res.redirect("/admin/listBlog/1");
});

// List the blog items for updating
router.get("/admin/listBlog/:num", isLoggedIn, ctrl.adminBlogListCtrl);


// ************************  The REST api *************************

// Check if login is correct
router.post('/admin/login',
            passport.authenticate('local-login', { successRedirect: '/admin/editHome',
                                   failureRedirect: '/admin/login',
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/admin/login');
}

module.exports = router;
