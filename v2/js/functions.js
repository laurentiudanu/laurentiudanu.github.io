window.onload = function() {
  (function($){
    $(".document-wrapper").addClass("active");
    $('header a[href*="#"]').click(function() {
	     if (location.pathname == this.pathname && location.host == this.host) {
	       var target = $(this.hash);
    	   $('html,body').animate({
  		   scrollTop: ($(target).offset().top)}, 1000);
         return false;
	    };
    });


    var winWidth = $(window).width();
    if (winWidth > 1024) {
      $(window).scroll(function(){
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
      });
    }
    $(".portfolio-wrapper .next").click(function(){
      if($(".portfolio-wrapper .pw-entry.visible").next().is(".pw-entry")) {
        $(".portfolio-wrapper .pw-entry.visible").removeClass("visible").next().addClass("visible");
      }
      else {
        $(".portfolio-wrapper .pw-entry").removeClass("visible");
        $(".portfolio-wrapper .pw-entry:first").addClass("visible");
      }
      return false;
    });
    $(".portfolio-wrapper .prev").click(function(){
      if($(".portfolio-wrapper .pw-entry.visible").prev().is(".pw-entry")) {
        $(".portfolio-wrapper .pw-entry.visible").removeClass("visible").prev().addClass("visible");
      }
      else {
        $(".portfolio-wrapper .pw-entry").removeClass("visible");
        $(".portfolio-wrapper .pw-entry:last").addClass("visible");
      }
      return false;
    });
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
