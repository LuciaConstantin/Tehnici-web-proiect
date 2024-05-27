if (localStorage.getItem("tema")) {
    document.body.classList.add(localStorage.getItem("tema"));
} else {
    document.body.classList.remove("dark", "green", "autumn", "sea"); 
}

window.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("tema")) {
        document.body.classList.add(localStorage.getItem("tema"));
        document.getElementById(localStorage.getItem("tema") + "_mode").checked = true; 
    } else {
        document.getElementById("light_mode").checked = true;
    }

    var radioButtons = document.querySelectorAll('input[type="radio"][name="tema"]');
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener("change", function() {
            var temaSelectata = this.value;
            document.body.classList.remove("light", "dark", "green", "autumn", "sea");
            document.body.classList.add(temaSelectata);
            localStorage.setItem("tema", temaSelectata);
        });
    });
});




    

