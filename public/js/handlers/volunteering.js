var volunteerHandler = function(id) {
    var volunteeringElement = document.getElementById(id);
    volunteeringElement.onclick = function(event) {
        var editVolunteeringForm = document.getElementById("editVolunteeringForm");
        var volunteeringLocation = document.getElementById("volunteering-location");
        var volunteeringStart = document.getElementById("volunteering-start");
        var volunteeringEnd = document.getElementById("volunteering-end");
        var volunteeringAssociation = document.getElementById("volunteering-association");
        var volunteeringPosition = document.getElementById("volunteering-position");
        var volunteeringDescription = document.getElementById("volunteering-description");
        
        var id = event.target.id;
        var words = id.split("-");
        
        // Will get the data using REST api later
        var location = "London";
        var start = "now";
        var end = "later";
        var association = "NOVA";
        var position = "volunteer";
        var description = "Blew up stars";
        
        editVolunteeringForm.style.display = "block";
        volunteeringLocation.value = location;
        volunteeringStart.value = start;
        volunteeringEnd.value = end;
        volunteeringAssociation.value = association;
        volunteeringPosition.value = position;
        volunteeringDescription.value = description;
    }
}