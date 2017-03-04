window.onload = function() {
  (function($){
    var time = new Date($.now()),
        curTimeHour = time.getHours(),
        curTimeMin = time.getMinutes();
    if (curTimeHour > 7 && curTimeHour < 19) {
      //$("body").addClass("day");
    }
    else {
      //$("body").addClass("night");
    }
    //$(".document-wrapper").addClass("active");
    var motto = $(".main-info h1").text(),
        mottoW = $(".main-info h1").width();
    $(".main-info section").append("<span class='h1_after' style='width: "+mottoW+"px'>"+motto+"</span>");
    $(".main-info").append("<div class='section_shade'></div>");
    var winWidth = $(window).width();
    if (winWidth > 1024) {
      /* $(window).scroll(function(){
        var scrolledY = $(window).scrollTop(),
            animated = false,
            nscrl = -(scrolledY / 4),
            pscrl = (scrolledY / 4);
        if (scrolledY >= 32 && animated == false) {
          $(".scrollable").css({
            "transform": "translateX(0px) translateY(" + nscrl + "px)",
            "-webkit-transform": "translateX(0px) translateY(" + nscrl + "px)"
          });
          animated = true;
        }
        else {
          $(".scrollable").css({
            "transform": "translateX(0px) translateY(" + pscrl + "px)",
            "-webkit-transform": "translateX(0px) translateY(" + pscrl + "px)"
          });
          animated = false;
        }
      }); */
    }
    $(".portfolio-wrapper .pw-entry").click(function(){
      var urlToGo = $(this).attr("data-url");
      window.open(urlToGo);
    });
  })(jQuery);
}

document.addEventListener("DOMContentLoaded", function(event) {
  function is_touch_device() {
    return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
    }
  var pHtml = document.getElementsByTagName( 'html' )[0];
  if (!is_touch_device()) {
    pHtml.setAttribute( 'class', 'no-touch' );
  }
  else {
    pHtml.setAttribute( 'class', 'touch' );
  }

});
