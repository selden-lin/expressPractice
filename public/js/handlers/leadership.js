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
        
        var id = event.target.id;
        var words = id.split("-");
        
        // Will get the data using REST api later
        var location = "London";
        var start = "now";
        var end = "later";
        var association = "NOVA";
        var position = "volunteer";
        var description = "Blew up stars";
        
        
        editForm.style.display = "block";
        locationForm.value = location;
        startForm.value = start;
        endForm.value = end;
        associationForm.value = association;
        positionForm.value = position;
        descriptionForm.value = description;
    }
}