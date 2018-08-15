var cellResize = function() {
    var cells = document.getElementsByClassName("blog-list-cell");
    var links = document.getElementsByClassName("blog-list-link");
    var height = cells[0].offsetWidth;
    
    for(var x=0;x<cells.length;x++) { 
        cells[x].style.height = height+"px";
    }  
};

cellResize();
window.onresize = cellResize;
    
