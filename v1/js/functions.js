window.onload = function() {
  (function($){
    $("body").addClass("content-visible");
    $(window).blur(function () {
      $("body").addClass("inactive");
    });
    $(window).focus(function () {
      $("body").removeClass("inactive");
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
    function checkOrientation(){
      var oA = window.orientation;
        pHtml.setAttribute( 'class', 'touch orientation-'+oA );
    }
    window.addEventListener('orientationchange', function () {
      checkOrientation();
    });
    checkOrientation();
  }

});
