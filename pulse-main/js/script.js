
$(document).ready(function(){
    $('.carousel__inner').slick({
        //adaptiveHeight: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next.svg"></button>'
    });

    $('ul.catalog__tabs ').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    $('.catalog-item__link').each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });

    $('.catalog-item__back').each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });

    //modal

    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').on('click',function(){
        $('.overlay, #order').fadeIn('slow');
    });

    $('#consultation-form').validate();
    $('#consultation form').validate();
    $('#order form').validate();

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");

            $("form").trigger('reset');
        })
        return false;
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
        } else{
            $('.pageup').fadeOut();
        }
    })

  });
 