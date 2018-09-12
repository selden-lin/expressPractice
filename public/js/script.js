var word = "";
var navHold = null;
var expHit = 0;
var awardHit = 0;
var aboutHit = 0;

(function () {
    drawWelcome();
    window.onresize = drawWelcome;

    var navItems = document.getElementsByClassName("nav-link"); 
    for(var x=0;x<navItems.length-2;x++) {
        word = navItems[x].id.slice(4);
        navItems[x].onclick = smoothScroll(word);
    }
    
    
    // When the user scrolls to the experience section, the cards flip
    docScroll();
    window.onscroll = docScroll;
    
})();

function docScroll() {
    // flipping the exp cards on scroll
    var experience = document.getElementById("experience");
    var exp = document.getElementsByClassName("exp-cell");
    var about = document.getElementById("about");
    var aboutCells = document.getElementsByClassName("about-skills-cell");
    var aboutPic = document.getElementsByClassName("about-pic")[0];
    
    if(document.body.scrollTop >= about.offsetTop-70 &&  document.body.scrollTop <= about.offsetTop+aboutPic.offsetHeight+40) {
        aboutPic.style.top = 70;
        aboutPic.style.position = "fixed";
    } else if(document.body.scrollTop < about.offsetTop-70){
        aboutPic.style.position = "absolute";
        aboutPic.style.top = 0;
    } else{
        aboutPic.style.top = aboutPic.offsetHeight+100;
        aboutPic.style.position = "absolute";
    }
    
    if(aboutHit == 0 && document.body.scrollTop >= about.offsetTop) {
        for(var x=0;x<aboutCells.length;x++) {
            aboutCells[x].classList.add("about-skills-rise");
            aboutCells[x].style.width = "100%";
        }
        aboutHit = 1;
    }
    
    if(expHit == 0 && document.body.scrollTop >= experience.offsetTop-300) {
        for(var x=0;x<exp.length;x++) {
            exp[x].classList.add("exp-flip");
            exp[x].style.transform = "rotateY(180deg)";
            exp[x].style.transform = "rotateY(0deg)";
        }
        expHit = 1;
    }
    
    //  animation of the award list on scroll
    var awards = document.getElementById("awards");
    var items = document.getElementsByClassName("award-row");
    
    if(awardHit == 0 && document.body.scrollTop >= awards.offsetTop-200) {
        for(var x=0;x<items.length;x++) {
            items[x].classList.add("award-animate");
        }
        awardHit = 1;
    }
}

// Function for screen to scroll to the div section
function smoothScroll(div) {
    if (div == "welcome") {
        return function () {
            window.scroll({
                top: -70,
                left: 0,
                behavior: 'smooth'
            });
            return false;
        }
    }
    return function () {
        var intro = document.getElementById(div);
        window.scroll({
            top: intro.offsetTop - 70,
            left: 0,
            behavior: 'smooth'
        });
        return false;
    }
}

// Draws the heartbeat animation and resizes the panes on browser resize
function drawWelcome() {
    var wm = document.getElementById("welcomeMessage");
    var aboutImg = document.getElementsByClassName("about-pic")[0];
    var aboutContent = document.getElementsByClassName("about-pic-content")[0];
    var height = window.innerHeight;
    var width = window.innerWidth;

    var welcome = document.getElementById("welcome");
    var rows = document.getElementsByClassName("row-1");

    if (height > 400) {
        wm.style.fontSize = height * 0.20 + "px";
        for (var x = 0; x < rows.length; x++) {
            rows[x].style.minHeight = (height - 70) + "px";
            rows[x].style.maxWidth = (width) + "px";
        }

        // About pic
        aboutContent.style.minHeight = height;
        aboutImg.style.height = height;
        
        // The heartbeat animation
        var heartDiv = document.getElementById("heart-div");
        heartDiv.style.height = window.innerHeight + "px";
        heartDiv.style.width = window.innerWidth + "px";

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.style.height = canvas.height + "px";
        canvas.style.width = canvas.width + "px";

        var height = window.innerHeight;
        var width = window.innerWidth;
        ctx.strokeStyle = " #f9d3d2";

        ctx.moveTo(0, height * 0.6);
        ctx.lineTo(width * 0.35, height * 0.6);
        ctx.stroke();

        ctx.moveTo(width * 0.35, height * 0.6);
        ctx.lineTo(width * 0.37, height * 0.5);
        ctx.stroke();

        ctx.moveTo(width * 0.37, height * 0.5);
        ctx.lineTo(width * 0.39, height * 0.6);
        ctx.stroke();

        ctx.moveTo(width * 0.39, height * 0.6);
        ctx.lineTo(width * 0.43, height * 0.6);
        ctx.stroke();

        ctx.moveTo(width * 0.43, height * 0.6);
        ctx.lineTo(width * 0.45, height * 0.68);
        ctx.stroke();

        ctx.moveTo(width * 0.45, height * 0.68);
        ctx.lineTo(width * 0.49, height * 0.3);
        ctx.stroke();

        ctx.moveTo(width * 0.49, height * 0.3);
        ctx.lineTo(width * 0.55, height * 0.77);
        ctx.stroke();

        ctx.moveTo(width * 0.55, height * 0.77);
        ctx.lineTo(width * 0.58, height * 0.6);
        ctx.stroke();

        ctx.moveTo(width * 0.58, height * 0.6);
        ctx.lineTo(width * 0.62, height * 0.6);
        ctx.stroke();

        ctx.moveTo(width * 0.62, height * 0.6);
        ctx.lineTo(width * 0.64, height * 0.53);
        ctx.stroke();

        ctx.moveTo(width * 0.64, height * 0.53);
        ctx.lineTo(width * 0.66, height * 0.6);
        ctx.stroke();

        ctx.moveTo(width * 0.66, height * 0.6);
        ctx.lineTo(width, height * 0.6);
        ctx.stroke();
    }
}
