var blogs = require("../blog.json");
var pageSize = 10;


// ****************** The front end *************************

module.exports.homeCtrl = function (req, res) {
    res.render("home", {title: "home"});
}

module.export.blogListCtrl = function(req, res) {
    var pageNum = req.params.num;
    var maxPages = Math.floor(blogs.length/pageSize);
    if (pageNum > maxPages) {
        pageNum = maxPages;
    }
    var itemsToShow = blogs.slice(10*(pageNum-1), 10*pageNum);
    res.render("blogList", {title: "blog list", items: itemsToShow});
}

module.export.blogPageCtrl = function(req, res) {
    res.render("blogPage", {item: blogs[req.params.num]});
}

module.export.resumeCtrl = function(req, res) {
    
}

// ****************** The back end *************************

module.export.newBlogCtrl = function(req, res) {
    
}

module.export.editBlogCtrl = function(req, res) {
    
}

module.export.editHomeCtrl = function(req, res) {
    
}

module.export.adminBlogList Ctrl = function(req, res) {
    
}


// ****************** The REST api *************************
