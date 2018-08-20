var skillsHandler = function(id) {
    var awardElement = document.getElementById(id);
    awardElement.onclick = function(event) {
        var school = document.getElementById("education-school");
        var idForm = document.getElementById("education-id");
        var program = document.getElementById("education-program");
        var year = document.getElementById("education-year");
        var gpa = document.getElementById("education-gpa");
        
        var word = event.target.id;
        var words = word.split("-");
        var id = words[2];
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var ret = JSON.parse(this.responseText).education;
                
                for(var x=0;x<ret.length;x++) {
                    if(ret[x].id == parseInt(id)) {
                        school.value = ret[x].school;
                        idForm.value = ret[x].id;
                        program.value = ret[x].program;
                        year.value = ret[x].year;
                        gpa.value = ret[x].gpa;
                    }
                }
            }
        };
        xhttp.open("GET", "/home.json", true);
        xhttp.send();  
        
    }
}