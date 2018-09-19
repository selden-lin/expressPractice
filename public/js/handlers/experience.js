var leadershipHandler = function(id) {
    var awardElement = document.getElementById(id);
    awardElement.onclick = function(event) {
        var editForm = document.getElementById("editLeadershipForm");
        var locationForm = document.getElementById("leadership-location");
        var startForm = document.getElementById("leadership-start");
        var endForm = document.getElementById("leadership-end");
        var associationForm = document.getElementById("leadership-association");
        var positionForm = document.getElementById("leadership-position");
        var descriptionForm = document.getElementById("leadership-description");
        var expId = document.getElementById("experience-id");
        var short = document.getElementById("leadership-short-description");
        var expIcon = document.getElementById("experience-icon");
        
        var word = event.target.id;
        var words = word.split("-");
        var id = words[2];
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var ret = JSON.parse(this.responseText).experience;
                
                for(var x=0;x<ret.length;x++) {
                    if(ret[x].id == parseInt(id)) {
                        locationForm.value = ret[x].location;
                        startForm.value = ret[x].start;
                        endForm.value = ret[x].end;
                        associationForm.value = ret[x].association;
                        positionForm.value = ret[x].position;
                        descriptionForm.value = ret[x].description;
                        expId.value = ret[x].id;
                        expIcon.value = ret[x].icon;
                        short.value = ret[x].shortDescription;
                    }
                }
            }
        };
        xhttp.open("GET", "/home.json", true);
        xhttp.send();  
        
        
    }
}