var awardHandler = function(id) {
    var awardElement = document.getElementById(id);
    awardElement.onclick = function(event) {
        var editAwardsForm = document.getElementById("editAwardsForm");
        var awardsTitle = document.getElementById("awards-title");
        var awardsDescription = document.getElementById("awards-description");
        var awardsYear = document.getElementById("awards-year");
        
        var id = event.target.id;
        var words = id.split("-");
        var word = words[2];
        
        // Will get the data using REST api later
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200)
        }
        
        var year = 2018;
        var title = "Honour roll";
        var description = "Hi";
        
        
        editAwardsForm.style.display = "block";
        awardsYear.value = year;
        awardsDescription.value = description;
        awardsTitle.value = title;
    }
}