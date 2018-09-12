


$(document).on("ready", function() {
    $("#js-menu-open").on("click", function() {
        $("#js-menu").addClass("active");
        $("#js-list-body").addClass("inactive");
    });

    $("#js-menu-close").on("click", function() {
        console.log("CLICK");
        $("#js-menu").removeClass("active");
        $("#js-list-body").removeClass("inactive");
    });
});
