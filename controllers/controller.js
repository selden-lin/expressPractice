var blogs = require("../blog.json").blogs;
var home = require("../home.json");
var pageSize = 10;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ****************** The front end *************************

module.exports.homeCtrl = function (req, res) {
    var exp = home.experience;
    var count = 0;
    var currWidth = "";
    for(var x=0;x<exp.length;x++) {
        if(typeof exp[x].start == "string") {
            break;
        }
        exp[x].start = months[exp[x].start[0]]+" "+exp[x].start[1];
        if(exp[x].end[0] != "present") {
            exp[x].end = months[exp[x].end[0]]+" "+exp[x].end[1];
        } else {
            exp[x].end = "present";
        }
        
        if(count == 0) {
            if(exp.length - x >= 3) {
                currWidth = "col-md-4";
            } else if(exp.length - x == 2) {
                currWidth = "col-md-offset-2 col-md-4";
            } else {
                currWidth = "col-md-offset-4 col-md-4";
            } 
        } else if(count == 1) {
            if(currWidth == "col-md-offset-2 col-md-4") {
                currWidth = "col-md-4";
            }
        }
        exp[x].width = currWidth;
        count++;
    }
    
    home.experience = exp;
    
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
    var words = blogs[req.params.num].title.split(" ");
    res.render("blogPage", {title: blogs[req.params.num].title, items: blogs[req.params.num], title:words});
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
