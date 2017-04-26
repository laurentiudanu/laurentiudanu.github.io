window.onload = function() {
  (function($){
    function removeIA() {
      $(".index-animation").addClass("fadeOut").bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',   function(){ 
        $(this).remove();
      });
    }
    $(".index-animation h1").addClass("flash");
    $(".index-animation h1").bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){ 
      $(this).remove();
      $(".index-animation .ia-1").addClass("bounceIn").bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',   function(){ 
            $(".index-animation .ia-2").addClass("fadeInUp").bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',   function(){ 
              window.setTimeout(removeIA, 900)
            });
      });
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
