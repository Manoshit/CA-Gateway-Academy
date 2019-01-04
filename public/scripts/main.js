$(document).ready(function () {

  // slide animation
  $(document).ready(function(){
    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if (pos < winTop + 800) {
          $(this).addClass("slide");
        }
      });
      // number count for stats, using jQuery animate
      $('.counting').each(function() {

        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();

        if(pos < winTop + 600) {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {
            duration: 1500,
            easing: 'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
        }
      });
    });
  });

  $('.feedback-slick').slick({
      arrow: true,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      infinite: true,
      mobileFirst: true,
      pauseOnFocus: false,
      rows: 1,
      // slidesPerRow: 3,
      // slidesToShow: 3,
      // slidesToScroll: 1,
      swipe: true,
      swipeToSlide: true,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
          }
      ]
  });

    // auto close navbar after clicking on a link
    $('.navbar-collapse a').click(function(){
      $(".navbar-collapse").collapse('hide');
    });
});
