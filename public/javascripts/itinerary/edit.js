function construct_itinerary() {
    var title = $('.title.animated');
    var start_date = $('#start-date');
    var trip_highlights = $('.triphighlights');
    var days = $('.oneday');

    var title_val = title.text();
    var start_date_val = start_date.val();
    var trip_highlights_val = trip_highlights.val();
    var itinerary;
    var hidden_itinerary = $('#itinerary_obj');

    itinerary = { Title: title_val,
        Start_Date: start_date_val,
        TripHighlights: trip_highlights_val,
        Days: []
    };

    var day_head;
    var day_body;

    var d_events;

    var d_title_val;
    var d_date_val;

    for (var i = 0;  i < days.length; i++) {
        day_head = days.find('.head');
        day_body = days.find('.body');

        d_title_val = day_head.eq(i).find('.title > textarea').text();
        d_date_val = day_head.eq(i).find('.day-title > .date').text();

        day = {
            Title: d_title_val,
            Date: d_date_val,
            Events: []
        };

        d_events = day_body.find('.item.filled');

        var event;

        var e_top_bar;
        var e_inner;
        var e_label;
        var e_desc;
        var e_form_details;

        var e_start_time_val;
        var e_end_time_val;
        var e_label_val;
        var e_desc_val;

        for (var j = 0; j < d_events.length; j++) {
            e_top_bar = d_events.eq(j).find('.top-bar');
            e_inner = d_events.eq(j).find('.inner').eq(0);
            e_label = e_inner.find('.title').eq(0);
            e_desc = e_inner.find('.short-text').eq(0);
            e_form_details = e_inner.find('.form-details').eq(0);

            e_label_val = e_label.text();
            e_desc_val = e_desc.text();
            e_start_time_val = e_top_bar.find('.time-field').eq(0).children().eq(0).val();
            e_end_time_val = e_top_bar.find('.time-field').eq(1).children().eq(0).val();

            event = {
                Label: e_label_val,
                Description: e_desc_val,
                Start_Time: e_start_time_val,
                End_Time: e_end_time_val
            };

            day.Events.push(event);
        }

        itinerary.Days.push(day);
    }

    //alert(days.find('.head').eq(0).find('.title > textarea').text());
    alert(JSON.stringify(itinerary));

    hidden_itinerary.val(JSON.stringify(itinerary));
}

$(document).ready(function() {

    $('#submit').click(function () {
        //event.preventDefault();
        construct_itinerary();
        //$('submit_form').submit();
    });

});