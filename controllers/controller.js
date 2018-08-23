var blogs = require("../blog.json").blogs;
var home = require("../home.json");
var passport = require("passport"); 
var fs = require("fs");

var pageSize = 10;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// ****************** The front end *************************

module.exports.homeCtrl = function (req, res) {
    var exp = home.experience;
    var count = 0;
    var currWidth = "";
    for(var x=0;x<exp.length;x++) {
        if(typeof exp[x].start == "string") {
            
        } else {
            exp[x].start = months[exp[x].start[0]]+" "+exp[x].start[1];
            if(exp[x].end[0] != "present") {
                exp[x].end = months[exp[x].end[0]]+" "+exp[x].end[1];
            } else {
                exp[x].end = "present";
            }
        }
        
        if(count%3 == 0) {
            if(exp.length - x >= 3) {
                currWidth = "col-md-4";
            } else if(exp.length - x == 2) {
                currWidth = "col-md-offset-2 col-md-4";
            } else {
                currWidth = "col-md-offset-4 col-md-4";
            } 
        } else if(count%3 == 1) {
            if(currWidth == "col-md-offset-2 col-md-4") {
                currWidth = "col-md-4";
            }
        }
        exp[x].width = currWidth;
        count++;
    }
    
    home.experience = JSON.parse(JSON.stringify(exp));
    
    res.render("home", {title: "home", items: home});
};

module.exports.blogListCtrl = function(req, res) {
    
    var pageNum = req.params.num;
    var maxPages = Math.ceil(blogs.length/pageSize);
    if (pageNum > maxPages || pageNum <= 0) {
        pageNum = maxPages;
    }
    var itemsToShow = blogs.slice(9*(pageNum-1), 9*(pageNum));
    res.render("blogList", {title: "blog list", items: itemsToShow, pageNum: pageNum, pages: maxPages});
};

module.exports.blogPageCtrl = function(req, res) {
    var words = blogs[req.params.num].title.split(" ");
    res.render("blogPage", {title: blogs[req.params.num].title, items: blogs[req.params.num], title:words});
};

module.exports.resumeCtrl = function(req, res) {
    res.send("This is where the resume will be shown");
};

// ****************** The back end *************************

module.exports.newBlogCtrl = function(req, res) {
    res.render("adminNewBlog", {title: "Add a new blog"});
};

module.exports.editBlogCtrl = function(req, res) {
    var pageNum = req.params.num;
    var maxPages = Math.ceil(blogs.length/pageSize);
    if(pageNum < 0 || pageNum >= blogs.length) {
        res.redirect("/admin/listBlog");
    }
    
    res.render("adminEditBlog", {title: "Edit a blog", num: req.params.num, items: blogs[pageNum]});
};

module.exports.editHomeCtrl = function(req, res) {
    res.render("adminEditHome", {title: "Editing the home page", items: home});
};

module.exports.adminBlogListCtrl = function(req, res) {
    var pageNum = req.params.num;
    var maxPages = Math.ceil(blogs.length/pageSize);
    if (pageNum > maxPages || pageNum <= 0) {
        res.redirect("/admin/listBlog/"+maxPages);
    }
    var itemsToShow = blogs.slice(9*(pageNum-1), 9*(pageNum));
    res.render("adminListBlog", {title: "admin blog list", items: itemsToShow, pageNum: pageNum, pages: maxPages});
};


// ****************** The REST api *************************

module.exports.getHomeData = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(home);
}

module.exports.postEditHome = function(req, res) {
    home.title = req.body.title;
    home.description = req.body.description;
    if(req.body["awards-id"] != "") {
        for(var x=0;x<home.awards.length;x++) {
            if(home.awards[x].id == req.body["awards-id"]){
                if(req.body["awards-title"].trim() == "" && req.body["awards-description"].trim() == "" && req.body["awards-year"].trim() == "") {
                    home.awards.splice(x, 1);
                    break;
                } else {
                    home.awards[x].title = req.body["awards-title"];
                    home.awards[x].description = req.body["awards-description"];
                    home.awards[x].year = req.body["awards-year"];
                }
            } else if(x == home.awards.length - 1) {
                var temp = {};
                temp.id = req.body["awards-id"];
                temp.title = req.body["awards-title"];
                temp.description = req.body["awards-description"];
                temp.year = req.body["awards-year"];
                home.awards.push(JSON.parse(JSON.stringify(temp)));
            }
        }
    }
    if(req.body["experience-id"] != "") {
        for(var x=0;x<home.experience.length;x++) {
            if(home.experience[x].id == req.body["experience-id"]){
                if(req.body["leadership-location"].trim() == "" && req.body["leadership-start"].trim() == "" && req.body["leadership-end"].trim() == "" && req.body["leadership-association"].trim() == "" && req.body["leadership-position"].trim() == "") {
                    home.experience.splice(x, 1);
                    break;
                } 
            } else if(x == home.experience.length - 1){
                    var temp2 = {};
                    temp2.id = req.body["experience-id"];
                    temp2.location = req.body["leadership-location"];
                    temp2.start = req.body["leadership-start"];
                    temp2.end = req.body["leadership-end"];
                    temp2.association = req.body["leadership-association"];
                    temp2.position = req.body["leadership-position"];
                    temp2.icon = req.body["experience-icon"];
                    temp2.description = req.body["leadership-description"];
                    home.experience.push(JSON.parse(JSON.stringify(temp2)));
            }    
        }
    }
    if(req.body["skills-id"] != "") {
        for(var x=0;x<home.skills.length;x++) {
            if(home.skills[x].id == req.body["skills-id"]){
                
                if(req.body["skills-title"].trim() == "" && req.body["skills-level"].trim() == "" ) {
                    home.skills.splice(x, 1);
                    break;
                } 
            } else if(x == home.skills.length - 1){
                var temp3 = {};
                temp3.id = req.body["skills-id"];
                temp3.title = req.body["skills-title"];
                temp3.level = req.body["skills-level"];
                home.skills.push(JSON.parse(JSON.stringify(temp3)));
            }
            
        }
    }
    if(req.body["funSkills-id"] != "") {
        for(var x=0;x<home.funSkills.length;x++) {
            if(home.funSkills[x].id == req.body["funSkills-id"]){
                if(req.body["funSkills-title"].trim() == "" && req.body["funSkills-level"].trim() == "" ) {
                    home.funSkills.splice(x, 1);
                    break;
                } 
            } else if(x == home.funSkills.length - 1){
                var temp5 = {};
                temp5.id = req.body["funSkills-id"];
                temp5.title = req.body["funSkills-title"];
                temp5.level = req.body["funSkills-level"];
                home.funSkills.push(JSON.parse(JSON.stringify(temp5)));
            }
            
        }
    }
    if(req.body["education-id"] != "") {
        for(var x=0;x<home.education.length;x++) {
            if(home.education[x].id == req.body["education-id"]){
                if(req.body["education-program"].trim() == "" && req.body["education-school"].trim() == "" && req.body["education-year"].trim() == "" && req.body["education-gpa"].trim() == "" ) {
                    home.education.splice(x, 1);
                    break;
                } 
            } else if(x == home.education.length - 1){
                var temp4 = {};
                temp4.id = req.body["education-id"];
                temp4.school = req.body["education-school"];
                temp4.program = req.body["education-program"];
                temp4.year = req.body["education-year"];
                temp4.gpa = req.body["education-gpa"];
                home.education.push(JSON.parse(JSON.stringify(temp4)));
            }
            
        }
    }
    fs.writeFile(__dirname+"/../home.json", JSON.stringify(home), function(err) {
        if(err) {
            console.log("ERROR: something is wrong");
        } else{
            console.log("SUCCESS");
        }
    })
    res.redirect("/admin/editHome");
};

module.exports.postEditBlog = function(req, res) {
    var temp = {};
    temp.title = req.body.title;
    temp.date = req.body.date;
    temp.description = req.body.description;
    temp.content = req.body.content;
    
    blogs[req.body.index] = JSON.parse(JSON.stringify(temp));
    fs.writeFile(__dirname+"/../blog.json", JSON.stringify({"blogs": blogs}), function(err) {
        if(err) {
            console.log("ERROR: something is wrong");
        } else{
            console.log("SUCCESS");
        }
    })
    res.redirect("/admin/listBlog");
};

module.exports.postNewBlog = function(req, res) {
    var temp = {};
    temp.title = req.body.title;
    temp.date = req.body.date;
    temp.description = req.body.description;
    temp.content = req.body.content;

    blogs.push(JSON.parse(JSON.stringify(temp)));
    fs.writeFile(__dirname+"/../blog.json", JSON.stringify(blogs), function(err) {
        if(err) {
            console.log("ERROR: something is wrong");
        } else{
            console.log("SUCCESS");
        }
    })
    res.redirect("/admin/newBlog");
};

module.exports.deleteEditBlog = function(req, res) {
    
};