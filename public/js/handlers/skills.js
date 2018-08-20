var skillsHandler = function(id) {
    var awardElement = document.getElementById(id);
    awardElement.onclick = function(event) {
        var editForm = document.getElementById("editSkillsForm");
        var titleForm = document.getElementById("skills-title");
        var itemsForm = document.getElementById("skills-items");
        var skillsId = document.getElementById("skills-id");
        
        var word = event.target.id;
        var words = word.split("-");
        var id = words[2];
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var ret = JSON.parse(this.responseText).skills;
                
                for(var x=0;x<ret.length;x++) {
                    if(ret[x].id == parseInt(id)) {
                        titleForm.value = ret[x].title;
                        itemsForm.value = ret[x].items.join(", ");
                        skillsId.value = ret[x].id;
                    }
                }
            }
        };
        xhttp.open("GET", "/home.json", true);
        xhttp.send();  
        
    }
}