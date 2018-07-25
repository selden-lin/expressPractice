var blogsObj = require("../blog.json");
var home = require("../home.json");
var blogs = blogsObj.blogs;
var pageSize = 10;


// ****************** The front end *************************

module.exports.homeCtrl = function (req, res) {
    res.render("home", {title: "home"});
}

module.exports.blogListCtrl = function(req, res) {
    var pageNum = req.params.num;
    var maxPages = Math.floor(blogs.length/pageSize);
    if (pageNum > maxPages) {
        pageNum = maxPages;
    }
    var itemsToShow = blogs.slice(10*(pageNum-1), 10*pageNum);
    res.render("blogList", {title: "blog list", items: itemsToShow, pageNum: pageNum-1});
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
    res.render("adminEditBlog", {title: "Edit a blog"});
}

module.exports.editHomeCtrl = function(req, res) {
    var editAwardsHandler = function(event) {
        console.log(event);
    }
    var handlers = {
        "awards": editAwardsHandler
    }
    res.render("adminEditHome", {title: "Editing the home page", items: home, handlers: handlers});
}

module.exports.adminBlogListCtrl = function(req, res) {
    res.render("adminListBlog", {title: "List of all blog posts"});
}


// ****************** The REST api *************************
