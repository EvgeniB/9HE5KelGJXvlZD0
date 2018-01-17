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