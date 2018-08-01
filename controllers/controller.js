var blogs = require("../blog.json").blogs;
var home = require("../home.json");
var pageSize = 10;


// ****************** The front end *************************

module.exports.homeCtrl = function (req, res) {
    res.render("home", {title: "home", items: home});
}

module.exports.blogListCtrl = function(req, res) {
    var pageNum = req.params.num;
    var maxPages = Math.floor(blogs.length/pageSize)-1;
    if (pageNum > maxPages) {
        pageNum = maxPages;
    }
    var itemsToShow = blogs.slice(10*pageNum, 10*(pageNum+1));
    res.render("blogList", {title: "blog list", items: itemsToShow, pageNum: pageNum});
}

module.exports.blogPageCtrl = function(req, res) {
    res.render("blogPage", {title: blogs[req.params.num].title, items: blogs[req.params.num]});
}

module.exports.resumeCtrl = function(req, res) {
    res.send("This is where the resume will be shown");
}

// ****************** The back end *************************

module.exports.newBlogCtrl = function(req, res) {
    res.render("adminNewBlog", {title: "Add a new blog"});
}

module.exports.editBlogCtrl = function(req, res) {
    res.render("adminEditBlog", {title: "Edit a blog", num: req.params.num});
}

module.exports.editHomeCtrl = function(req, res) {
    res.render("adminEditHome", {title: "Editing the home page", items: home});
}

module.exports.adminBlogListCtrl = function(req, res) {
    var pageNum = req.params.num;
    var maxPages = Math.floor(blogs.length/pageSize);
    if (pageNum > maxPages) {
        res.redirect("/admin/listBlog/"+maxPages);
    }
    var itemsToShow = blogs.slice(10*pageNum, 10*(pageNum+1));
    res.render("adminListBlog", {title: "admin blog list", items: itemsToShow, pageNum: pageNum});
}


// ****************** The REST api *************************
