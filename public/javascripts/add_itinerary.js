function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function add_li(elem) {
    /*select name="cars" multiple>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
        </select>
    */
    /*
    var name = guid();

    var c = '';

    if (countries) {
        for (i = 0; i < countries.length; i++) {
            c += 'option value="' + countries[i] + '">' + countries[i] + '</option';
        }
    }

    var e = '<li id='+name+'><select name="countries" multiple>' +
        c +
        '</select>' +
        '<button type="button" onclick="delete_li(\''+ name +'\')">Delete</button>' +
        '</li>'; //JSON.stringify(e)
    //alert(e); <li><input type="text" value="" /></li><button type="button" onclick="delete_li(undefined)">Delete</button><br>
    //alert(JSON.stringify(e)); "<li><input type=\"text\" value=\"\" /></li><button type=\"button\" onclick=\"delete_li(undefined)\">Delete</button><br>"
    $("#" + elem).append(e);
    */

    //var c = $("#countries").clone();
    //$("#countries_list").append(c);
}

function delete_li(elem) {
    $('#'+elem).remove();
}

function add_day() {
    var d_n_input = $("#days_n");
    //alert(d_n_input.val());
    var d = $("#stock_day").clone();//.insertAfter("#days_list ul:last");
    d.attr("id", "day" + d_n_input.val());
    d_n_input.val(Number(d_n_input.val()) + 1);

    // have to go inside children elements and change id to "day..." followed by day number

    var children = null;
    //var num_days = $('#days_n').val();
    //alert(num_days);

    //alert("d is " + d.toString());
    //alert("d's children " + d.children().toString());

    for(var k=0;k<d_n_input.val();k++) {
        children = d.children(1).children();
        //alert(children);
        //for(var i=0;i<children;i++) {
            //children[i].child[0].attr("id", "" + k);
            children[1].childNodes[1].setAttribute("id", "day_title" + k);
            children[2].childNodes[1].setAttribute("id", "day_date" + k);

            //children[3].childNodes[1].setAttribute("id", "day_country" + k);
            //children[4].childNodes[1].setAttribute("id", "day_location" + k);
            children[5].childNodes[1].setAttribute("id", "day_overnight" + k);
        //}
    }


    //alert($(d));
    //$("#days_list ul").append('<li>dfs</li>');
    $("#days_list").append(d);
}

function delete_day(element) {
    var element = $(element);
    element.parent().remove();
}

function add_event() {
    var d_n_input = $("#events_n");
    //alert(d_n_input.val());
    var d = $("#stock_event").clone();//.insertAfter("#days_list ul:last");
    d.attr("id", "event" + d_n_input.val());
    d_n_input.val(Number(d_n_input.val()) + 1);
    //alert($(d));
    //$("#days_list ul").append('<li>dfs</li>');
    $("#events_list").append(d);
}

function delete_event(element) {
    var element = $(element);
    element.parent().remove();
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

    var num_days = $('#days_list').children(1).children().length;
    var days = $('#days_list').children(1);

    for(var i=0;i<num_days;i++) {
        Day = {};

        //Day.Title = $('#day_title' + i).val();
        //Day.Date = $('day_date' + i).val();
        //Day.Overnight = $('day_overnight' + i).val();

        Day.Title = days.children(i).find('input.day_title').val();
        Day.Date = days.children(i).find('input.day_date').val();
        Day.Overnight = days.children(i).find('input.day_overnight').val();


        //////////////////// country and location handling for days

        Countries = [];
        Country = '';

        country_list = days.children(i).find('div.countries');

        for(var k=0;k<country_list.find('input').length;k++) {
            Country = country_list.find('input')[k];

            if (Country.checked) {
                Countries.push(Country.value);
            }
        }

        Day.Countries = Countries;

        var location_list =  days.children(i).find('div.locations');

        var Locations = [];
        var Location = '';

        for(var k=0;i<location_list.find('input').length;k++) {
            Location = location_list.find('input')[k];

            if (Location.checked) {
                Locations.push(Location.value);
            }
        }

        Day.Locations = Locations;

        /////////////////////////////////////////////////////////////

        var event_list = days.children(i).children(2);
        var num_events = event_list.children.length;

        var Events = [];
        var Event = {};

        for(var j=0;j<num_events;j++) {
            Event.Label = event_list.children(j).children(0).children(0).children(1).val();
            Event.EventType = event_list.children(j).children(0).children(1).children(1).val();
            Event.Type = event_list.children(j).children(0).children(2).children(1).val();
            Event.Description = event_list.children(j).children(0).children(3).children(1).val();
            Event.Tips = event_list.children(j).children(0).children(4).children(1).val();
            Event.Photo = event_list.children(j).children(0).children(5).children(1).val();
            Event.Price = event_list.children(j).children(0).children(6).children(1).val();
            Event.Hours = event_list.children(j).children(0).children(7).children(1).val();
            Event.Address = event_list.children(j).children(0).children(8).children(1).val();
            Event.Phone = event_list.children(j).children(0).children(9).children(1).val();
            Event.Website = event_list.children(j).children(0).children(10).children(1).val();
            Event.AudioGuides = event_list.children(j).children(0).children(11).children(1).val();
            Event.BookLink = event_list.children(j).children(0).children(12).children(1).val();
            Event.Transportation = event_list.children(j).children(0).children(13).children(1).val();
            Event.Reviews = event_list.children(j).children(0).children(14).children(1).val();

            Events.push(Event);
        }

        Day.Events = Events;

        Days.push(Day);
        //Days.push(JSON.stringify(Day));
    }

    itinerary.Days = Days;

    //alert(itinerary);
    //alert(JSON.stringify(itinerary));

    $('#itinerary').val(JSON.stringify(itinerary));

    $("form").submit();
}