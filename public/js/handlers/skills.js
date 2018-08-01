var skillsHandler = function(id) {
    var awardElement = document.getElementById(id);
    awardElement.onclick = function(event) {
        var editForm = document.getElementById("editSkillsForm");
        var titleForm = document.getElementById("skills-title");
        var itemsForm = document.getElementById("skills-items");
        
        var id = event.target.id;
        var words = id.split("-");
        
        // Will get the data using REST api later
        var title = "Music interests";
        var items = "Piano,viola";
        
        
        editForm.style.display = "block";
        titleForm.value = title;
        itemsForm.value = items;
    }
}