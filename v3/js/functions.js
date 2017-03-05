window.onload = function() {
  (function($){
    var time = new Date($.now()),
        curTimeHour = time.getHours(),
        curTimeMin = time.getMinutes();
    if (curTimeHour > 6 && curTimeHour < 19) {
      $("body").addClass("day");
    }
    else {
      $("body").addClass("night");
    }
    //$(".document-wrapper").addClass("active");
    var motto = $(".main-info h1").text(),
        mottoW = $(".main-info h1").width();
    var winWidth = $(window).width();
    if (winWidth > 840) {
      $(".main-info section").append("<span class='h1_after' style='width: "+mottoW+"px'>"+motto+"</span>");
      $(".main-info").append("<div class='section_shade'></div>");
    }
    if (winWidth > 1024) {



    }
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
