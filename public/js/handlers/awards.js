var awardHandler = function(id) {
    var awardElement = document.getElementById(id);
    awardElement.onclick = function(event) {
        var editAwardsForm = document.getElementById("editAwardsForm");
        var awardsTitle = document.getElementById("awards-title");
        var awardsDescription = document.getElementById("awards-description");
        var awardsYear = document.getElementById("awards-year");
        var awardsId = document.getElementById("awards-id");
        
        var word = event.target.id;
        var words = word.split("-");
        var id = words[2];
        
        // Ajax request to get the data from the field
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var ret = JSON.parse(this.responseText).awards;
                
                for(var x=0;x<ret.length;x++) {
                    if(ret[x].id == parseInt(id)) {
                        awardsTitle.value = ret[x].title;
                        awardsDescription.value = ret[x].description;
                        awardsYear.value = ret[x].year;
                        awardsId.value = ret[x].id;
                    }
                }
            }
        };
        xhttp.open("GET", "/home.json", true);
        xhttp.send();    
        


    }
}