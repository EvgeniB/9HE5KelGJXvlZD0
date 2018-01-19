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