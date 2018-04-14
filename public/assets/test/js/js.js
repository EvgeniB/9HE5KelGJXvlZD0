var mapSlider =  $(".map_slider");
var littleSlider = $('.map_slider_little');

$(document).ready(function() {
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
    $(".map_slider").slick({
        slidesToShow: 1,
        easing:'linear',
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.map_slider_littlee'
    });
    $('.map_slider_littlee').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.map_slider',
        arrows: true,
        dots: false,
        centerMode: true,
        focusOnSelect: true
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
                $(this).find('i img').attr('src','img/show.png');
            }
            else
            {
                $(this).find('span').text('Show More');
                $(this).find('i img').attr('src','img/hide.png')
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
$('.locations_days .exp-col span.spa_1').on('click',function(){
  $('.locations_days .exp-col span').removeClass('active');
  $(this).addClass('active');
  $('.day').removeClass('active');
  $('.day .event').slideDown('slow');
});
$('.locations_days .exp-col span.spa_2').on('click',function(){
  $('.locations_days .exp-col span').removeClass('active');
  $(this).addClass('active');
  $('.day').addClass('active');
  $('.day .event').slideUp('slow');
});

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
});
// $('.all_in_head').parents('.day').toggleClass('active');

// 
    // $('.map_go_to').hcSticky({top:90});
    $('.all_scroll_map').hcSticky({top:90});
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
})*/
