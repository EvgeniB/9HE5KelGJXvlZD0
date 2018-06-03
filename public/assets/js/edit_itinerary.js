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

$(document).on('click', ".event_day", function() {
//$(".event_day").on('click', function() {
    alert("event_day");

    var days = $(".days_box");

    days.append(add_day);
});

$(document).on('click', ".event_event", function() {
//$(".event_event").on('click', function() {
    alert("event_event");

    var get_day = jQuery(this).parent().parent().parent().find('.event_box, .ui-sortable');

    //var get_day = $(".event_box, .ui-sortable");

    get_day.append(add_event);
});

$( document ).ready(function() {
    $('.days_top_number').on('input', function () {
        $(".nights_top_number").val(this.value - 1);
    });
});

var add_day = `
<div class="days ui-sortable-handle" draggable="true" id="days1">
    <div class="day day1 clearfix">
    <div class="time_line">
    <p>Day 1</p>
</div>
<div class="all_in_head">
    <div class="edit_block">
    <div class="delete"><img src="/assets/img/basket_day.png" alt=""></div>
    <div class="drag drag_days"><img src="/assets/img/drah_day.png" alt=""></div>
    </div>
    <div class="head">
    <img src="/assets/img/city1.jpg" alt="">
    <div class="time_line_span_box"><span class="time_line_span">10/05/2016</span></div>
<h3>Arrival</h3>
<p>Location(s): Barcelona</p>
<p>Overnight: Barcelona</p>
</div>
</div>
<div class="event_box ui-sortable">
<div class="event active" id="day1_event_1" data-index="1">
    <div class="edit_block">
      <div class="delete"><img src="/assets/img/basket_grey.png" alt=""></div>
      <div class="drag"><img src="/assets/img/drag_grey.png" alt=""></div>
    </div>
    <div class="icon">
      <img src="/assets/img/icon1.png" alt="">
    </div>
    <div class="content">
      <h3><b>Arrival - Barcelona</b> <br>Welcome to the start point of your itinerary and let the adventure begin!</h3>
      <div class="hidden_part active">
        <table>
          <tbody><tr><td>Airport:</td><td>CUN</td></tr>
          <tr><td>Confirmation #:</td><td>HSU4A7</td></tr>
          <tr><td>Flight #:</td><td>UA432</td></tr>
          <tr><td>Airline: </td><td>United Airlines</td></tr>
          <tr><td>Terminal:</td><td>3</td></tr>
          <tr><td>Gate:</td><td>B10</td></tr>
          <tr><td>Booked Through:</td><td>Expedia</td></tr>
        </tbody></table>
        <a href="" download="" class="voucher"><i><img src="/assets/img/paper.png" alt=""> </i>PDF</a>
      </div>
      <div class="bottom_row clearfix">
        <a href="#" class="book_now">Book Now</a>
        <a href="" class="show_less active"><span>Show Less</span> <i><img src="/assets/img/show.png" alt=""></i></a>
      </div>
    </div>
  </div>

    </div>

    </div>
    <div class="edit_events clearfix" style="clear:both;">
    <div class="event_editor">
    <div class="event_add">+ Add more</div>
<div class="event_day">Days</div>
    <div class="event_event">Events</div>
    </div>
    </div>
    </div>`;

var add_event = `
<div class="event active" id="day1_event_1" data-index="1">
    <div class="edit_block">
      <div class="delete"><img src="/assets/img/basket_grey.png" alt=""></div>
      <div class="drag"><img src="/assets/img/drag_grey.png" alt=""></div>
    </div>
    <div class="icon">
      <img src="/assets/img/icon1.png" alt="">
    </div>
    <div class="content">
      <h3><b>Arrival - Barcelona</b> <br>Welcome to the start point of your itinerary and let the adventure begin!</h3>
      <div class="hidden_part active">
        <table>
          <tbody><tr><td>Airport:</td><td>CUN</td></tr>
          <tr><td>Confirmation #:</td><td>HSU4A7</td></tr>
          <tr><td>Flight #:</td><td>UA432</td></tr>
          <tr><td>Airline: </td><td>United Airlines</td></tr>
          <tr><td>Terminal:</td><td>3</td></tr>
          <tr><td>Gate:</td><td>B10</td></tr>
          <tr><td>Booked Through:</td><td>Expedia</td></tr>
        </tbody></table>
        <a href="" download="" class="voucher"><i><img src="/assets/img/paper.png" alt=""> </i>PDF</a>
      </div>
      <div class="bottom_row clearfix">
        <a href="#" class="book_now">Book Now</a>
        <a href="" class="show_less active"><span>Show Less</span> <i><img src="/assets/img/show.png" alt=""></i></a>
      </div>
    </div>
</div>
`;