
function getDateFormat(arr , format ){
	var day = '';
	var mans = '';
	
	if(arr.getDate()<10){
		day = '0'+arr.getDate();
	}else{
		day = arr.getDate();
	}
	if(arr.getMonth()<10){
		 mans = '0'+arr.getMonth();
	}else{
		 mans = arr.getMonth();
	}
	
		return days_str =   mans+'/'+day+'/'+arr.getFullYear();
}
function getDateFromManyDay(date_one, hav_many_day   ){
	var i = 0;
	var array_day = [];
	while(i < hav_many_day ){
		var days = new Date( date_one.getFullYear() , date_one.getMonth(), date_one.getDate()+ i++ );
		array_day[array_day.length] = getDateFormat(days , "/");
	}
	return array_day;
}
$('.date-picker').each(function(){
    $(this).datepicker({
        templates:{
            leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
            rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
        }
    }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if( datepicker_color.length != 0){
                $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
			
			array_day = $(".form-control_js").val().split('/');
			//(year, month, date, hours, minutes, seconds, ms)
			days = new Date( array_day[2] , array_day[0]  , array_day[1]);
			//days_str =  days.getDate()+'/'+days.getMonth()+'/'+days.getFullYear();
			days_str =   getDateFromManyDay(days, 3); //getDateFormat(days);
			$.each(document.getElementsByClassName('time_line_span'), function(i, cols) {
				$(cols).html(days_str[i]);//console.log() .children('p').children('span')
			});
			//console.log(days_str) ;
			//console.log($(".form-control_js").val().split('/')) ;
        }).on('change', function(e) {
			console.log($(".form-control_js").val()) ;
		});
});

/*$('input.timepicker_style').click(function(){
	
console.log($('.bootstrap-datetimepicker-widget').html());
	
});*/
	

$('.date-picker1').each(function(){
    $(this).datepicker({
        templates:{
            leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
            rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
        }
    }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if( datepicker_color.length != 0){
                $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
        });
});
$('.date-picker2').each(function(){
    $(this).datepicker({
        templates:{
            leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
            rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
        }
    }).on('show', function() {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if( datepicker_color.length != 0){
                $('.datepicker').addClass('datepicker-'+ datepicker_color +'');
            }
        }).on('hide', function() {
            $('.datepicker').removeClass('open');
        });
});