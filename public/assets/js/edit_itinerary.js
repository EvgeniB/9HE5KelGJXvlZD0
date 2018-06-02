function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

$(".save").click(function() {

});

$(".cancel").click(function() {
    location.href = '/edit_itineraries/';
});

$( ".theme-dropdown" ).change(function() {
    var elem;

    if ( this.value == 'empty' ) {

    }
     else {
        if ($(".themes").text() == '') {
            elem = "<span> " + this.value + " <i class='fa fa-close close-theme red-hover'></i></span>";

            //$(".themes").append(this.value);
            //$(".themes").append("<i class='fa fa-close close-theme'></i>");

            $(".themes").append(elem);
        }
        else {
            //$(".themes").append(", ");
            elem = "<span>, " + this.value + " <i class='fa fa-close close-theme red-hover'></i></span>";

            //$(".themes").append(", " + this.value + " ");
            //$(".themes").append("<i class='fa fa-close close-theme'></i>");

            $(".themes").append(elem);
        }
    }
});

$(document).on('click', "i.close-theme", function() {
    $(event.target).parent()[0].remove();

    if ($('.themes').text()[0] == ',') {
        $('.themes').first()[0].innerHTML = $('.themes').first()[0].innerHTML.substring(0, 6) + $('.themes').first()[0].innerHTML.substring(8);
        //$('.themes').first().text( $('.themes').first().text().substring(2) );
    }
});

$( document ).ready(function() {
    $('.days_top_number').on('input', function () {
        $(".nights_top_number").val(this.value - 1);
    });
});