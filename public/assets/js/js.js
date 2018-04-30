var mapSlider =  $(".map_slider");
var littleSlider = $('.map_slider_little');

$(document).ready(function() {
	$('.time_icon_box').click(function(e){
		$this = $(this);
		$this.siblings('.timepicker').focus();
	});
	$('.icon_calendar').click(
			function(e){
				$(this).siblings('.date-picker').focus();
				//console.log(123456);
			}
		);
		$('.date').click(
			function(e){
				$(this).siblings('.date-picker1').focus();
				//console.log(123456);
			}
		);
		$('.date').click(
			function(e){
				$(this).siblings('.date-picker2').focus();
				//console.log(123456);
			}
		);
		
  $(".slider").owlCarousel({
    items : 5,
    autoplay : false,
    nav: true,
    dots: false,
    navText : false,
    loop : true,
    responsive : true, 
    draggble : true,
    itemsScaleUp : false,
    autoHeight : true,
    margin: 20,
    responsive:{
        0:{
          items:2
        },
        380:{
          items:2
        },
        768:{
          items:3
        },
        992:{
          items:4
        },
        1200:{
          items:5
        },
    }
  });
  function display_none(min, max){
	 
	  while(min<=max){
		  console.log('display_none:'+min);
		 /* setTimeout(function () {
			
				$('.go_to_sl[data-index="'+min+'"]').addClass('animate_from_slider');
			}, 500);*/
			$('.go_to_sl[data-index="'+min+++'"]').addClass('display_none');
	  }
	  
	  
  }
  function display_on(min, max, leng){
	
	  while(min<=max){
		  console.log('display_on:'+min);
		  $('.go_to_sl[data-index="'+min+'"]').removeClass('display_none');
		  $('.go_to_sl[data-index="'+min+++'"]').removeClass('animate_from_slider');
	  }
	  if(max < leng){
		   
		  display_none(++max,  leng)
	  }
	  
  }
  $('.head').hover(function(e){
	  $this = $(this);
	  $this.parent('.all_in_head ').children('.edit_block').children('.delete').children('img').attr('src',"/assets/img/basket.png") ;
	  $this.parent('.all_in_head ').children('.edit_block').children('.drag').children('img').attr('src',"/assets/img/drag.png") ;
  }, function(e){
	  $this = $(this);
	  $this.parent('.all_in_head ').children('.edit_block').children('.delete').children('img').attr('src',"/assets/img/basket_day.png") ;
	  $this.parent('.all_in_head ').children('.edit_block').children('.drag').children('img').attr('src',"/assets/img/drah_day.png") ;
  });
  $('.event').hover(function(e){
	  $this = $(this);
	  $this.children('.edit_block').children('.delete').children('img').attr('src','/assets/img/basket_grey_new.png');
	  $this.children('.edit_block').children('.drag').children('img').attr('src','/assets/img/drag_grey_new.png');
	  
  },function(e){
	  $this = $(this);
	  $this.children('.edit_block').children('.delete').children('img').attr('src','/assets/img/basket_grey.png');
	  $this.children('.edit_block').children('.drag').children('img').attr('src','/assets/img/drag_grey.png');
	  
  });
   
    /*$(".map_slider").slick({
        slidesToShow: 1,
        easing:'linear',
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.map_slider_littlee'
    });*/
    
	if($('.map_slider_littlee_box').children().length > 7){
		//console.log(11);
		$('.map_slider_littlee_next').addClass('active');
		$('.go_to_sl_1').clone().appendTo(".box_element_conteiner");
		$('.map_slider_littlee .go_to_sl_1').remove();
		$('.go_to_sl_2').clone().appendTo(".box_element_conteiner");
		$('.map_slider_littlee .go_to_sl_2').remove();
		$('.go_to_sl_3').clone().appendTo(".box_element_conteiner");
		$('.map_slider_littlee .go_to_sl_3').remove();
		$('.go_to_sl_4').clone().appendTo(".box_element_conteiner");
		$('.map_slider_littlee .go_to_sl_4').remove();
		$(".map_slider_littlee_box").prepend('<div class="go_to_sl_dop_style "> ...</div>');
		$('.box_element_conteiner').clone().insertAfter($('.map_slider_littlee_prev'));
		leng = $('.map_slider_littlee_box').children().length + 1;
		item_index = 0;
		$('.go_to_sl').addClass('display_none');
		while(item_index < 7){
			item_index++;
			$('.go_to_sl[data-index="'+item_index+'"]').removeClass('display_none');
		}
		$('.box_element.display_none').data('index_id',$('.map_slider_littlee_box').children().length);	
		 
		 
		 
		// $(".all_go_t").prepend($(".box_element_conteiner"));
		// $('.map_slider_littlee_box').insertAfter($('.map_slider_littlee_prev'));
		
		//$('.go_to_sl_2').addClass('display_none');
		
		/*$('.map_slider_littlee').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.map_slider',
			arrows: true,
			dots: false,
			centerMode: false,
			focusOnSelect: true,
			width: 26
		});*/
		//$('.box_element_conteiner').clone().insertAfter('.go_to_sl_3');
		//$('body .count_dayse ').addClass('width_slider');
		
		//$('.count_dayse .map_slider_littlee').insertAfter('.map_slider_littlee  ');
		
		
		
		//$('.box_element_conteiner').clone().appendTo(".count_dayse.map_slider_littlee.slick-initialized.slick-slider")
		
		//console.log($('.count_dayse.map_slider_littlee').children().length);
	} else{
		$('.map_slider_littlee_prev').addClass('display_none');
		$('.map_slider_littlee_next').addClass('display_none');
		
		//console.log($('.count_dayse.map_slider_littlee').children().length);
		//console.log(22);
		/*$('.map_slider_littlee').slick({
			slidesToShow: 8,
			slidesToScroll: 1,
			asNavFor: '.map_slider',
			arrows: true,
			dots: false,
			centerMode: true,
			focusOnSelect: true,
			width: 26
		});*/
	}
	$('.go_to_sl').click(function(e){
		$this = $(this);
		console.log($this.data('index'));
		$('.map_slider .item').removeClass('active');
		$('.go_to_sl').removeClass('active');
		$this.addClass('active');
		$('.item[data-index="'+$this.data('index')+'"]').addClass('active');
	});
	$('.map_slider_littlee_prev').click(function(e){
		element_max = $('.map_slider_littlee_box').children().length + 1;
		i_index = $('.box_element.display_none').data('index_id');
		console.log('i_index:'+ i_index);
		if($('div.go_to_sl_dop_style').hasClass('active')){
			
			if(i_index == 6 ){
				
				$('.map_slider_littlee_prev').removeClass('active');
				$('div.go_to_sl_dop_style').removeClass('active');
				display_on1 = i_index - 1;
				console.log('display_none1:'+ display_none1);
				$('.go_to_sl[data-index="'+display_on1+'"]').removeClass('display_none')
			}
			display_on2 = i_index;
			console.log('display_on2:'+ display_on2);
			$('.go_to_sl[data-index="'+display_on2+'"]').removeClass('display_none');
			display_none = i_index + 2 ;
			$('.go_to_sl[data-index="'+display_none+'"]').addClass('display_none');
			$('.box_element.display_none').data('index_id',--i_index);
			$('.map_slider_littlee_next').addClass('active');
		}
		
		//if($('div.go_to_sl_dop_style').hasClass('active') && $('.box_element.display_none').data('index_id')>9 ){
			/*max_leng = $('.box_element.display_none').data('index_id') ;
			max_size = 7;
			element_min = 5;
			if(max_leng>= max_size){
				//max_leng = $('.box_element.display_none').data('index_id') ;
				leng = $('.map_slider_littlee_box').children().length + 1;
				min_leng = max_leng -4;	
				++max_leng  ;
				console.log('f > 4:'+max_leng);
				display_on(min_leng, max_leng, leng);
				display_none(element_min, min_leng, leng)
				$('.box_element.display_none').data('index_id',max_leng-2);
				$('.go_to_sl_dop_style').addClass('active');
				
			}else if(1){
				++max_size;
				$('.go_to_sl_dop_style').removeClass('active');
				$('.go_to_sl[data-index="'+element_min+'"]').removeClass('display_none');
				$('.go_to_sl[data-index="'+max_size+'"]').addClass('display_none');
				$('.box_element.display_none').data('index_id',$('.map_slider_littlee_box').children().length);
			}*/
			
			//$('.box_element.display_none').data('index_id',max_leng);
		
		
		
		
		//var f = $('.go_to_sl.active').data('index') - 1;
		//max_leng = 0 ;
		//index_id = $('.box_element.display_none').data('index_id');
		
		/*if(max_leng  < f ){
			f = max_leng;
			console.log('f = 1;'+max_leng);
			min_leng = max_leng -4;	
			++max_leng  ;
			console.log('f > 4:'+max_leng);
			display_on(min_leng, max_leng);
			display_none(3, min_leng);
			$('.box_element.display_none').data('index_id',max_leng);
		}*/
			
		/*if(f <= 0){
			max_leng =$('.map_slider_littlee_box').children().length  ;
			f = 1  + max_leng  ;
			console.log('f = 1;'+max_leng);
		}else {
			max_leng = $('.box_element.display_none').data('index_id');
		}*/
		//min_leng = max_leng -4;	
		
		//if(f > 4 && f !=max_leng){
			
			
			
			//index_id++;
			//$('.go_to_sl[data-index="'+max_leng+'"]').removeClass('display_none');
			//$('.go_to_sl[data-index="'+max_leng+'"]').removeClass('animate_from_slider');
				//setTimeout(function () {
			
			//	$('.go_to_sl[data-index="'+min_leng+'"]').addClass('animate_from_slider');
			//}, 500);
			//$('.go_to_sl[data-index="'+min_leng+'"]').addClass('display_none');
			// $('.go_to_sl[data-index="'+min_leng+'"]').addClass('display_none');
			//$('.go_to_sl_dop_style').addClass('active');
			// $('.box_element.display_none').data('index_id',max_leng);
		//}else if(f < 4){
			//++max_leng  ;
			//console.log('f < 4:'+max_leng);
			//index_id++;
			//setTimeout(function () {
			
				//$('.go_to_sl[data-index="'+max_leng+'"]').addClass('animate_from_slider');
			//}, 500);
			//$('.go_to_sl[data-index="'+max_leng+'"]').addClass('display_none');
			//$('.go_to_sl[data-index="'+min_leng+'"]').removeClass('display_none');	
			//$('.go_to_sl[data-index="'+min_leng+'"]').removeClass('animate_from_slider');	
			//$('.go_to_sl_dop_style').removeClass('active');
			//$('.box_element.display_none').data('index_id',max_leng);
		//}
		/*console.log(f);
		$('.go_to_sl').removeClass('active');
		$('.map_slider .item').removeClass('active');
		$('.item[data-index="'+f+'"]').addClass('active');
		$('.go_to_sl[data-index="'+f+'"]').addClass('active');*/
		//} else{
		//	$(this).removeClass('active');
		//}
		
		
		
	

	});
	
	$('.map_slider_littlee_next').click(function(e){
		
			element_max = $('.map_slider_littlee_box').children().length + 1;
			i_index = $('.box_element.display_none').data('index_id');
			if(element_max > i_index){
				$('.map_slider_littlee_prev').addClass('active');
				
				
				if(!$('div.go_to_sl_dop_style').hasClass('active')){
					i_index = 5;
					display_none1 = i_index ;
					$('.go_to_sl[data-index="'+display_none1+'"]').addClass('display_none');
					$('div.go_to_sl_dop_style').addClass('active');
				}
				
				display_none2 = ++i_index;
				display_on = i_index +2 ;
					
				$('.go_to_sl[data-index="'+display_none2+'"]').addClass('display_none');	
				$('.go_to_sl[data-index="'+display_on+'"]').removeClass('display_none');	
				
				$('.box_element.display_none').data('index_id',i_index);
				console.log($('.box_element.display_none').data('index_id'));
				if(element_max == i_index){
					$('.map_slider_littlee_next').removeClass('active');
				}
			}else{
				$('.map_slider_littlee_next').removeClass('active');
			}
			/*
			max_leng = $('.box_element.display_none').data('index_id') ;
			max_size = 7;
			element_min = 5;
			element_max = $('.map_slider_littlee_box').children().length + 1;
			if(max_leng>= max_size){
				//max_leng = $('.box_element.display_none').data('index_id') ;
				
				leng = element_max;
				if( 1 + max_leng == leng + 1 && $('div.go_to_sl_dop_style').hasClass('active')){
					console.log( 'max_leng:'+max_leng);
					display_on(element_min, max_size, leng);
					$('.go_to_sl[data-index="'+element_min+'"]').addClass('display_none');
					$('.box_element.display_none').data('index_id',element_max - 1);
					$('.go_to_sl_dop_style').removeClass('active');
				}else{
					if(leng == max_leng + 1 && $('div.go_to_sl_dop_style').hasClass('active')){
					max_leng = leng;
					min_leng = max_leng - 5 ;
					}else if(max_leng == $('.map_slider_littlee_box').children().length ){
						min_leng = element_min ;	
						max_leng = max_size + 1 ;
					}else if(1){
						
						min_leng = max_leng - 4 ;	
						max_leng = max_leng + 1 ;
					}
					
					
					console.log( 'max_leng:'+max_leng);
					console.log( "$('div.go_to_sl_dop_style').hasClass('.active'):"+$('.go_to_sl_dop_style').hasClass('active'));
					display_on(min_leng, max_leng, leng);
					display_none(element_min, min_leng, leng);
					console.log( '-----------------------');
					$('.box_element.display_none').data('index_id',max_leng);
					$('.go_to_sl_dop_style').addClass('active');
					
				}
				
				
			}else if(1){
				++max_size;
				$('.go_to_sl_dop_style').removeClass('active');
				$('.go_to_sl[data-index="'+element_min+'"]').addClass('display_none');
				$('.go_to_sl[data-index="'+max_size+'"]').addClass('display_none');
			}*/
		
		/* f = $('.go_to_sl.active').data('index') + 1;
		max_leng = $('.map_slider_littlee_box').children().length +1 ;
		if(max_leng  <  f ){
			f = 1;
			console.log(f);
		}else if(f <= 0){
			f = max_leng + 1 ;
			console.log(f);
		}
		
			
		if(f > 4){
			
			
			$('.go_to_sl[data-index="'+max_leng+'"]').removeClass('display_none');
			$('.go_to_sl[data-index="'+max_leng+'"]').removeClass('animate_from_slider');
			setTimeout(function () {
			
				$('.go_to_sl[data-index="'+3+'"]').addClass('animate_from_slider');
			}, 500);
			$('.go_to_sl[data-index="'+3+'"]').addClass('display_none');	
			$('.go_to_sl_dop_style').addClass('active');
			
		}else if(f < 4){
			setTimeout(function () {
			
				$('.go_to_sl[data-index="'+max_leng+'"]').addClass('animate_from_slider');
			}, 500);
			$('.go_to_sl[data-index="'+max_leng+'"]').addClass('display_none');
			
			$('.go_to_sl[data-index="'+3+'"]').removeClass('display_none');	
			$('.go_to_sl[data-index="'+3+'"]').removeClass('animate_from_slider');	
			$('.go_to_sl_dop_style').removeClass('active');
		}*/
			
		
		//console.log(f);
		//console.log( max_leng);
		/*$('.go_to_sl').removeClass('active');
		$('.map_slider .item').removeClass('active');
		$('.item[data-index="'+f+'"]').addClass('active');
		$('.go_to_sl[data-index="'+f+'"]').addClass('active');*/
		
	});
	
/*    littleSlider.owlCarousel({
    center: true,
    items:5,
    loop:true,
    margin:3
  });
    mapSlider.owlCarousel({
    items : 1,
    autoplay : false,
    nav: false,
    dots: false,
    navText : false,
    loop : true,
    // responsive : true,
    draggble : true,
    itemsScaleUp : false
  });*/
/*  $('[class^=go_to_sl]').click(function() {

      var item_index = parseInt($(this).text())-1;
      littleSlider.find('.owl-dots .owl-dot').eq(item_index).trigger('click');
      mapSlider.trigger('to.owl.carousel', item_index);
      $('.go_to_sl').removeClass('active');
      $(this).addClass('active');
  });
  $('.go_prev').click(function() {
      mapSlider.trigger('next.owl.carousel');
  });
  $('.go_next').click(function() {
      mapSlider.trigger('prev.owl.carousel');
  });*/

  $('.menu').click(function(){ $(this).toggleClass('open'); });
  $('.show_less').on('click',function(){
        $(this).parents('.bottom_row').siblings('.hidden_part').slideToggle('slow');
        $(this).toggleClass('active');
        $(this).parents('.event').toggleClass('active');
            if($(this).hasClass('active'))
            {
                $(this).find('span').text('Show Less');
                $(this).find('i img').attr('src','/assets/img/show.png');
            }
            else
            {
                $(this).find('span').text('Show More');
                $(this).find('i img').attr('src','/assets/img/hide.png')
            }
      return false;
  });
  $('.highlights .slider .item').on('click',function () {
      var big_slide = $(this).data('big_slide');
      $('header').css('background-image','url('+big_slide+')');
  });
// $('.locations_days .exp-col span').on('click',function(){
//     var btn_click = $(this).index();
//     $('.event .show_less').each(function () {
//         if(btn_click && $(this).hasClass('active'))
//             $(this).trigger('click');
            

//         if(!btn_click && !$(this).hasClass('active'))
//             $(this).trigger('click');
            
//     });
// });
$('.section.locations_days .exp-col span.spa_1').on('click',function(){
  $('.section.locations_days .exp-col span').removeClass('active');
  $(this).addClass('active');
  $('.section.locations_days .day').removeClass('active');
  $('.section.locations_days .day .event').slideDown('slow');
});
$('.section.locations_days .exp-col span.spa_2').on('click',function(){
  $('.section.locations_days .exp-col span').removeClass('active');
  $(this).addClass('active');
  $('.section.locations_days .day').addClass('active');
  $('.section.locations_days .day .event').slideUp('slow');
});


/*$(function () {
                $('.timepicker').datetimepicker({
                    format: 'HH:mm'
                });
            });

$('.timepicker').datetimepicker({
                  format:'HH:mm',
					//disabledDates: 'decades',		//'decades','years','months','days'
					dayViewHeaderFormat: 'HH:mm',
					timeFormat: 'hh:mm',
					minuteStep: 1,
                });

if($(".timepicker").length != 0){
        $('.timepicker').datetimepicker({
//          format: 'H:mm',    // use this format if you want the 24hours timepicker
           format: 'h:mm A',    //use this format if you want the 12hours timpiecker with AM/PM toggle
           icons: {
               time: "now-ui-icons tech_watch-time",
               date: "now-ui-icons ui-1_calendar-60",
               up: "fa fa-chevron-up",
               down: "fa fa-chevron-down",
               previous: 'now-ui-icons arrows-1_minimal-left',
               next: 'now-ui-icons arrows-1_minimal-right',
               today: 'fa fa-screenshot',
               clear: 'fa fa-trash',
               close: 'fa fa-remove'
           }
        });
    };*/

$('.day .all_in_head').on('click',function(){
  // $('.all_in_head').parent().toggleClass('active');
  // $('.locations_days .exp-col span').removeClass('active');
  // $(this).addClass('active');
  if($(this).parents('.day').hasClass('active'))
  {
      $(this).parents('.day').removeClass('active');
  }
  else
  {
      $(this).parents('.day').addClass('active');
  }
  $(this).parents('.day').find('.event').slideToggle('slow');
});/**/



// $('.all_in_head').parents('.day').toggleClass('active');

// 
    // $('.map_go_to').hcSticky({top:90});
	//const hcSticky = require('hc-sticky');
	
	//var Sticky = require('sticky-js');

	//var sticky = new Sticky('.all_scroll_map');
	
   // $('.all_scroll_map').hcSticky({top:90});
	$('.all_in_head .delete').click(function(e){
		$this= $(this);
		$this.parent().parent().parent().parent().remove();//.remove();
	});
	/**/$('.delete').click(function(e){
		$this= $(this);
		$this.parent().parent().remove();
	});
	function date_add_new(){
			array_day = $(".form-control_js").val().split('/');
			//console.log(array_day);
			//(year, month, date, hours, minutes, seconds, ms)
			days = new Date( array_day[2] , array_day[0]  , array_day[1]);
			//console.log(days);
			//days_str =  days.getDate()+'/'+days.getMonth()+'/'+days.getFullYear();
			days_str =   getDateFromManyDay(days, 3); //getDateFormat(days);
			//console.log(days_str);
			$.each(document.getElementsByClassName('time_line_span'), function(i, cols) {
				console.log($(cols).html(days_str[i]));//.children('p').children('span')
			});
		
	};
	date_add_new();
	
	
			
	
	
	/*var day_namber = 1;
	$('.time_line').forEach.call(cols, function(col) {
		console.log(cols);
	});*/
	
});
/*
mapSlider.on('translate.owl.carousel', function(event) {
    var item_index = parseInt(mapSlider.find('.owl-item.active .item').data('index'));
    // $('.active .go_to_sl_'+item_index).trigger('click');

    console.log(item_index);
});
mapSlider.on('translated.owl.carousel', function(event) {
    var item_index = parseInt(mapSlider.find('.owl-item.active .item').data('index'));
    $('.active .go_to_sl_'+item_index).trigger('click');

    /!*littleSlider.find('.owl-dots .owl-dot').eq(item_index-1).trigger('click');
    $('.go_to_sl').removeClass('active');
    $(this).addClass('active');*!/
})
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
        });
});

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
});*/
//$('.day').click(function(e){this.onmousedown =
 	// function(){
		
		//$('.days_box').addClass("days_box_dop"); 
		//$('.days').addClass("days_dop"); 
	//console.log(111);
	
	
	/*
	
		$('.day1 .event').draggable({containment: ".day1",revert: true,revertDuration: 0});
		position = null;
		$( ".day1" ).droppable({
		accept: '.day1 .event',//принимаем только дни
		activate: function(event, ui){
			console.log('start');
			position = ui;
		},
		over: function( event, ui )//если фигура над клеткой- выделяем её границей
		  {
		 // $(this).addClass('days_dop_style');
		  },
		out: function( event, ui )//если фигура ушла- снимаем границу
		  {
		 // $(this).removeClass('days_dop_style');
		  },
		drop:function( event, ui )//если бросили фигуру в клетку
		  {
				console.log( ui.offset.top); // новая
				console.log( position.offset.top); // преведущая
				
				
				
				if(ui.offset.top < position.offset.top){
					console.log('ui.offset.top < position.offset.top');
					$(position).addClass('test1234');
					//$($(this).children($(ui).next())).addClass('test1234');//.insertAfter(ui.draggable);
					
				//	console.log($($(ui).next()));
				}
					
				else{
					//var next = $(position).prev();
					//if(next){
						//console.log('ui.offset.top > position.offset.top');
						console.log( ui );
						$(this).children(ui.draggable).addClass('test1234');//.insertBefore(ui.draggable);
						//$(this).children(ui.draggable).insertAfter(next);
					//$(this).prepend(ui.draggable);
						
					//}
					
				}
			  
			  
			//  var pdiv = $(ui.draggable);
			//	pdiv.insertBefore($(ui.draggable).next());
			  
			  
		// $(this).append(ui.draggable);//перемещаем фигуру в нового предка
		 
		  }
		});
		
		
		*/
		
		
		
	//}console.log();
	
	/*$('.days_box').removeClass("ui-droppable"); 
	$('.days_box').removeClass("days_box_dop"); 
	$('.days').removeClass("ui-draggable"); 
	$('.days').removeClass("days_dop"); 
	$('.days').removeClass("ui-draggable-handle"); 
	 
}); **/
/*	function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
}

var cols = document.querySelectorAll('#days_box .days');
[].forEach.call(cols, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
}); */
	
/*	
(function() {
	console.log('days1');
	
  var id_ = 'days1';
  var cols_ = document.querySelectorAll('#' + id_ + ' .event');
  var dragSrcEl_ = null;
	var dragSrcEl_2 = null;
  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
	console.log(1111);
    dragSrcEl_ = this;
	dragSrcEl_2 = $(this).parent();
    // this/e.target is the source node.
    $(this).addClass('moving');
  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
     $(this).addClass('over');
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.
     $(this).removeClass('over');
  };

  this.handleDrop = function(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if we're dropping on the same column we're dragging.
    if (dragSrcEl_ != this && this != $(this).parent()) {
      dragSrcEl_.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
		console.log(2222);
      // Set number of times the column has been moved.
     /* var count = this.querySelector('.count');
      var newCount = parseInt(count.getAttribute('data-col-moves')) + 1;
      count.setAttribute('data-col-moves', newCount);
      count.textContent = 'moves: ' + newCount;*/
   /* }

    return false;
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.
    [].forEach.call(cols_, function (col) {
      $(col).removeClass('over');
       $(col).removeClass('moving');
    });
  };

  [].forEach.call(cols_, function (col) {
    col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('drop', this.handleDrop, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
    
		  });
		})();*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/*	
	
(function() {
	console.log('days_box');
  var id_ = 'days_box';
  var cols_ = document.querySelectorAll('#' + id_ + ' .days');
  var dragSrcEl_ = null;

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
	 $('.all_in_head .delete').click(function(e){
		$this= $(this);
		$this.parent().parent().parent().parent().remove();//.remove();
	});
	/**//*$('.delete').click(function(e){
		$this= $(this);
		$this.parent().parent().remove();
	});
	 $(e).children(' .day').children('.all_in_head').on('click', function(){
		console.log(11111);
		 if($(this).parent('.day').hasClass('active'))
  {
      $(this).parent('.day').removeClass('active');
  }
  else
  {
      $(this).parent('.day').addClass('active');
  }
  $(this).parent('.day').find('.event').slideToggle('slow');
	});
		
	console.log(3333);
    dragSrcEl_ = this;

    // this/e.target is the source node.
    $(this).addClass('moving');
	
  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
     $(this).addClass('over');
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.
     $(this).removeClass('over');
  };

  this.handleDrop = function(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if we're dropping on the same column we're dragging.
    if (dragSrcEl_ != this  ) {
      dragSrcEl_.innerHTML = this.innerHTML;
	  $(dragSrcEl_).children(' .day').children('.all_in_head').on('click', function(){
		console.log(11111);
		 if($(this).parent('.day').hasClass('active'))
  {
      $(this).parent('.day').removeClass('active');
  }
  else
  {
      $(this).parent('.day').addClass('active');
  }
  $(this).parent('.day').find('.event').slideToggle('slow');
	});
	  
      this.innerHTML = e.dataTransfer.getData('text/html');
	   $(this).children(' .day').children('.all_in_head').on('click', function(){
		console.log(11111);
		 if($(this).parent('.day').hasClass('active'))
  {
      $(this).parent('.day').removeClass('active');
  }
  else
  {
      $(this).parent('.day').addClass('active');
  }
  $(this).parent('.day').find('.event').slideToggle('slow');
	});
	  
	  $('.all_in_head .delete').click(function(e){
		$this= $(this);
		$this.parent().parent().parent().parent().remove();//.remove();
	});
	/**//*$('.delete').click(function(e){
		$this= $(this);
		$this.parent().parent().remove();
	});
		console.log(4444);	
      // Set number of times the column has been moved.
     /* var count = this.querySelector('.count');
      var newCount = parseInt(count.getAttribute('data-col-moves')) + 1;
      count.setAttribute('data-col-moves', newCount);
      count.textContent = 'moves: ' + newCount;*/
  /*  }

    return false;
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.
    [].forEach.call(cols_, function (col) {
      $(col).removeClass('over');
       $(col).removeClass('moving');
    });
  };

  [].forEach.call(cols_, function (col) {
    col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('drop', this.handleDrop, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
    $(col).children(' .day').children('.all_in_head').on('click', function(){
		console.log(11111);
		 if($(this).parent('.day').hasClass('active'))
  {
      $(this).parent('.day').removeClass('active');
  }
  else
  {
      $(this).parent('.day').addClass('active');
  }
  $(this).parent('.day').find('.event').slideToggle('slow');
	});
  });
})();

*/






// chek ie


function check_ie(){
	if (!!navigator.userAgent.match(/Trident\/7\./))
  return "ie";  
}
console.log(check_ie());



var adjustment;



$("div.event_box").sortable({
  helper: "clone",
  group: 'event_box',
  pullPlaceholder: false,
  placeholder: "highlight",
  // animation on drop
  onDrop: function  ($item, container, _super) {
    var $clonedItem = $('<div/>').css({height: 0});
    $item.before($clonedItem);
    $clonedItem.animate({'height': $item.height()});

    $item.animate($clonedItem.position(), function  () {
      $clonedItem.detach();
      _super($item, container);
    });
  },

  // set $item relative to cursor position
  onDragStart: function ($item, container, _super) {
    var offset = $item.offset(),
        pointer = container.rootGroup.pointer;

    adjustment = {
      left: pointer.left - offset.left,
      top: pointer.top - offset.top
    };

    _super($item, container);
	
  },
  onDrag: function ($item, position) {
    $item.css({
      left: position.left - adjustment.left,
      top: position.top - adjustment.top
    });
  }
});

var adjustment_days;

$("div.days_box").sortable({
	
  helper: "clone",
	placeholder: "highlight",
  group: 'days_box',
  pullPlaceholder: false,
  // animation on drop
  onDrop: function  ($item, container, _super) {
    var $clonedItem = $('<div/>').css({height: 0});
    $item.before($clonedItem);
    $clonedItem.animate({'height': $item.height()});

    $item.animate($clonedItem.position(), function  () {
      $clonedItem.detach();
      _super($item, container);
    });
	
	
  },

  // set $item relative to cursor position
  onDragStart: function ($item, container, _super) {
    var offset = $item.offset(),
        pointer = container.rootGroup.pointer;

    adjustment_days = {
      left: pointer.left - offset.left,
      top: pointer.top - offset.top
    };

    _super($item, container);
	
  },
  onDrag: function ($item, position) {
    $item.css({
      left: position.left - adjustment_days.left,
      top: position.top - adjustment_days.top
    });
  }
});

$(document).mouseup(function (e) {
    var container1 = $('body');
    if (container1.has(e.target).length === 0){
        $('input.timepicker').blur();
		console.log(1);
    }
	 var container2 = $('body .event ');
	if (container2.has(e.target).length === 0){
        $('input.timepicker').blur();
		console.log(2);
    } 
	var container3 = $('body .add_width ');
	if (container3.has(e.target).length === 0){
        $('input.timepicker').blur();
		console.log(3);
    }
	
	
});

