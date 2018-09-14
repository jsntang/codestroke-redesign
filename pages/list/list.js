


$(document).on("ready", function() {
    $("#js-menu-open").on("click", function() {
        $("#js-menu").addClass("active");
        $(".global-container").addClass("inactive");
    });

    $("#js-menu-close").on("click", function() {
        $("#js-menu").removeClass("active");
        $(".global-container").removeClass("inactive");
    });
});
