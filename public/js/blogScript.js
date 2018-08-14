var blogResize = function () {
    var height = window.innerHeight;
    var width = window.innerWidth;

    if (height > 400) {
        var top = document.getElementById("blog-head");
        top.style.minHeight = (height - 70) + "px";
        top.style.minWidth = width + "px";
        top.style.fontSize = 0.05*height+"px";
    }
};

var textEffect = function () {
    $('.ml11 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({
            loop: false
        })
        
        .add({
            targets: '.ml11 .line',
            translateX: [0, $(".ml11 .letters").width()],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100
        }).add({
            targets: '.ml11 .letter',
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=775',
            delay: function (el, i) {
                return 34 * (i + 1)
            }
        });
};

(function () {
    blogResize();
    window.onresize = blogResize;
    
    textEffect();
})();
