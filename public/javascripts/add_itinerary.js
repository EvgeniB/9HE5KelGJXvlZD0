function add_day() {
    var d = $("#stock_day").clone();
    $("#days_list").append(d);
}

function delete_day(element) {
    var element = $(element);
    element.closest('li.day').remove();
}

function add_event(element) {
    var d_n_input = $("#events_n");
    var d = $("#stock_event").clone();
    var event_list = $(element).closest('ul.event_list').append(d);
}

function delete_event(element) {
    var element = $(element);
    element.closest('li.event').remove();
}

function make_itinerary() {
    var itinerary = {};

    var Days = [];
    var Events = [];

    var Day = {};

    itinerary.Title = $('#title').val();
    itinerary.Description = $('#description').val();
    itinerary.DayLength = $('#daylength').val();
    itinerary.NightLength = Number($('#daylength').val()) + 1;
    itinerary.ImageUrl = $('#imageurl').val();

    var Countries = [];
    var Country = '';

    var country_list = $('#country_list');

    for(var i=0;i<country_list.find('input').length;i++) {
        Country = country_list.find('input')[i];

        if (Country.checked) {
            Countries.push(Country.value);
        }
    }

    itinerary.Countries = Countries;

    var location_list = $('#location_list');

    var Locations = [];
    var Location = '';

    for(var i=0;i<location_list.find('input').length;i++) {
        Location = location_list.find('input')[i];

        if (Location.checked) {
            Locations.push(Location.value);
        }
    }

    itinerary.Locations = Locations;

    var theme_list = $('#theme_list');

    var Themes = [];
    var Theme = '';

    for(var i=0;i<theme_list.find('input').length;i++) {
        Theme = theme_list.find('input')[i];

        if (Theme.checked) {
            Themes.push(Theme.value);
        }
    }

    itinerary.Theme = Themes;

    // Creating day list //
    var num_days = $('#days_list').children().length;
    var days = $('#days_list').children();

    for(var i=0;i<num_days;i++) {
        Day = {};

        Day.Title = days.children(i).find('input.day_title').val();
        Day.Date = days.children(i).find('input.day_date').val();
        Day.Overnight = days.children(i).find('input.day_overnight').val();


        //////////////////// country and location handling for days

        Countries = [];
        Country = '';

        country_list = days.children(i).find('div.day_countries');

        for(var k=0;k<country_list.find('input').length;k++) {
            Country = country_list.find('input')[k];

            if (Country.checked) {
                Countries.push(Country.value);
            }
        }

        Day.Day_Countries = Countries;

        location_list =  days.children(i).find('div.day_locations');

        Locations = [];
        Location = '';

        for(var k=0;k<location_list.find('input').length;k++) {
            Location = location_list.find('input')[k];

            if (Location.checked) {
                Locations.push(Location.value);
            }
        }

        Day.Day_Locations = Locations;

        /////////////////////////////////////////////////////////////

        var event_list = days.children(i).find('ul.event_list');
        var num_events = event_list.children().length - 1;

        var Events = [];
        var Event;

        for(var j=0;j<num_events;j++) {
            Event = {};

            Event.Label = event_list.children(j).find('input.event_label').val();
            //Event.EventType = event_list.children(j).find('input.event_eventtype').val();
            Event.Time = event_list.children(j).find('input.event_time').val();
            Event.Description = event_list.children(j).find('input.event_description').val();
            Event.Tips = event_list.children(j).find('input.event_tips').val();
            Event.Photo = event_list.children(j).find('input.event_photo').val();
            Event.Price = event_list.children(j).find('input.event_price').val();
            Event.Hours = event_list.children(j).find('input.event_hours').val();
            Event.Address = event_list.children(j).find('input.event_address').val();
            Event.Phone = event_list.children(j).find('input.event_phone').val();
            Event.Website = event_list.children(j).find('input.event_website').val();
            Event.AudioGuides = event_list.children(j).find('input.event_audioguides').val();
            Event.BookLink = event_list.children(j).find('input.event_booklink').val();
            Event.Transportation = event_list.children(j).find('input.event_transportation').val();
            Event.Reviews = event_list.children(j).find('input.event_reviews').val();

            Events.push(Event);
        }

        Day.Events = Events;

        Days.push(Day);
    }

    itinerary.Days = Days;
    $('#itinerary').val(JSON.stringify(itinerary));

    $("form").submit();
}