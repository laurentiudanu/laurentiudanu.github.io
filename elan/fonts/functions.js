!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);


window.onload = function() {
  (function($){

    "object"==typeof Countries&&(Countries.updateProvinceLabel=function(e,t){if("string"==typeof e&&Countries[e]&&Countries[e].provinces){if("object"!=typeof t&&(t=document.getElementById("address_province_label"),null===t))return;t.innerHTML=Countries[e].label;var r=jQuery(t).parent();r.find("select");r.find(".custom-style-select-box-inner").html(Countries[e].provinces[0])}}),"undefined"==typeof Shopify.Cart&&(Shopify.Cart={}),Shopify.Cart.ShippingCalculator=function(){var _config={submitButton:"Calculate shipping",submitButtonDisabled:"Calculating...",templateId:"shipping-calculator-response-template",wrapperId:"wrapper-response",customerIsLoggedIn:!1,moneyFormat:"${{amount}}"},_render=function(e){var t=jQuery("#"+_config.templateId),r=jQuery("#"+_config.wrapperId);if(t.length&&r.length){var templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var n=Handlebars.compile(jQuery.trim(t.text())),a=n(e);if(jQuery(a).appendTo(r),"undefined"!=typeof Currency&&"function"==typeof Currency.convertAll){var i="";jQuery("[name=currencies]").size()?i=jQuery("[name=currencies]").val():jQuery("#currencies span.selected").size()&&(i=jQuery("#currencies span.selected").attr("data-currency")),""!==i&&Currency.convertAll(shopCurrency,i,"#wrapper-response span.money, #estimated-shipping span.money")}}},_enableButtons=function(){jQuery(".get-rates").removeAttr("disabled").removeClass("disabled").val(_config.submitButton)},_disableButtons=function(){jQuery(".get-rates").val(_config.submitButtonDisabled).attr("disabled","disabled").addClass("disabled")},_getCartShippingRatesForDestination=function(e){var t={type:"POST",url:"/cart/prepare_shipping_rates",data:jQuery.param({shipping_address:e}),success:_pollForCartShippingRatesForDestination(e),error:_onError};jQuery.ajax(t)},_pollForCartShippingRatesForDestination=function(e){var t=function(){jQuery.ajax("/cart/async_shipping_rates",{dataType:"json",success:function(r,n,a){200===a.status?_onCartShippingRatesUpdate(r.shipping_rates,e):setTimeout(t,500)},error:_onError})};return t},_fullMessagesFromErrors=function(e){var t=[];return jQuery.each(e,function(e,r){jQuery.each(r,function(r,n){t.push(e+" "+n)})}),t},_onError=function(XMLHttpRequest,textStatus){jQuery("#estimated-shipping").hide(),jQuery("#estimated-shipping em").empty(),_enableButtons();var feedback="",data=eval("("+XMLHttpRequest.responseText+")");feedback=data.message?data.message+"("+data.status+"): "+data.description:"Error : "+_fullMessagesFromErrors(data).join("; ")+".","Error : country is not supported."===feedback&&(feedback="We do not ship to this destination."),_render({rates:[],errorFeedback:feedback,success:!1}),jQuery("#"+_config.wrapperId).show()},_onCartShippingRatesUpdate=function(e,t){_enableButtons();var r="";if(t.zip&&(r+=t.zip+", "),t.province&&(r+=t.province+", "),r+=t.country,e.length){"0.00"==e[0].price?jQuery("#estimated-shipping em").html("FREE"):jQuery("#estimated-shipping em").html(_formatRate(e[0].price));for(var n=0;n<e.length;n++)e[n].price=_formatRate(e[n].price)}_render({rates:e,address:r,success:!0}),jQuery("#"+_config.wrapperId+", #estimated-shipping").fadeIn()},_formatRate=function(e){function t(e,t){return"undefined"==typeof e?t:e}function r(e,r,n,a){if(r=t(r,2),n=t(n,","),a=t(a,"."),isNaN(e)||null==e)return 0;e=(e/100).toFixed(r);var i=e.split("."),o=i[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+n),s=i[1]?a+i[1]:"";return o+s}if("function"==typeof Shopify.formatMoney)return Shopify.formatMoney(e,_config.moneyFormat);"string"==typeof e&&(e=e.replace(".",""));var n="",a=/\{\{\s*(\w+)\s*\}\}/,i=_config.moneyFormat;switch(i.match(a)[1]){case"amount":n=r(e,2);break;case"amount_no_decimals":n=r(e,0);break;case"amount_with_comma_separator":n=r(e,2,".",",");break;case"amount_no_decimals_with_comma_separator":n=r(e,0,".",",")}return i.replace(a,n)};return _init=function(){new Shopify.CountryProvinceSelector("address_country","address_province",{hideElement:"address_province_container"});var e=jQuery("#address_country"),t=jQuery("#address_province_label").get(0);"undefined"!=typeof Countries&&(Countries.updateProvinceLabel(e.val(),t),e.change(function(){Countries.updateProvinceLabel(e.val(),t)})),jQuery(".get-rates").click(function(){_disableButtons(),jQuery("#"+_config.wrapperId).empty().hide();var e={};e.zip=jQuery("#address_zip").val()||"",e.country=jQuery("#address_country").val()||"",e.province=jQuery("#address_province").val()||"",_getCartShippingRatesForDestination(e)}),_config.customerIsLoggedIn&&jQuery(".get-rates:eq(0)").trigger("click")},{show:function(e){e=e||{},jQuery.extend(_config,e),jQuery(function(){_init()})},getConfig:function(){return _config},formatRate:function(e){return _formatRate(e)}}}();
    /*! js-cookie v3.0.0-beta.1 | MIT */
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";var e={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[ACDEF]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function t(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}return function n(r,o){function i(e,n,i){if("undefined"!=typeof document){"number"==typeof(i=t(o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),n=r.write(n,e),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=e+"="+n+c}}return Object.freeze({set:i,get:function(t){if("undefined"!=typeof document&&(!arguments.length||t)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u.charAt(0)&&(u=u.slice(1,-1));try{var f=e.read(c[0]);if(o[f]=r.read(u,f),t===f)break}catch(e){}}return t?o[t]:o}},remove:function(e,n){i(e,"",t(n,{expires:-1}))},withAttributes:function(e){return n(this.converter,t(this.attributes,e))},withConverter:function(e){return n(t(this.converter,e),this.attributes)},attributes:Object.freeze(o),converter:Object.freeze(r)})}(e,{path:"/"})});
  
    window.p12packcount = 1;
    window.p12subpackcount = 1;

    function isInViewport(node) {
      var rect = node.getBoundingClientRect()
      return (
        (rect.height > 0 || rect.width > 0) &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
    /*
    document.addEventListener("rebuy:smartcart.line-item-increase", (event) => {
      const cpq = Number(event.detail.item.quantity + 1);
      const item = event.detail.item;
      const maxq = event.detail.item.properties.pmax;
      if(cpq == maxq) {
        rebuy:smartcart.hideQuantitySelectors(item);
      }
    });
    */

    //Cookies.set('darthvader', '1', { expires: 1 });

    //document.querySelector("body").classList.add("loaded-doc");

    if($(".logged-in-customer").length > 0) {
      window.dataLayer = window.dataLayer || [];
    
      dataLayer.push({
        'event' : 'userData',
        'user_id' : $(".logged-in-customer").attr("data-uid")
      });
    } 

    if(window.location.href.indexOf("?pdp") > -1) {
      if($(".pos-pack-select").length > 0) {
        $(".pos-pack-select").addClass("no-options");
      }
    }
    if(window.location.href.indexOf("?newcarousel") > -1) {
      $(".home-hero.block.just-hide-me").addClass("visible");
      $("#shopify-section-home-hero-carousel").remove();
    }
  
    
    if(window.location.href.indexOf("?ref") > -1) {
      if($(".anal-douche-product-info").length > 0) {
        console.log("FutureMax campaign!");
        $(".anal-douche-product-info h1").text("Disposable Douche Solution");
        $(".anal-douche-product-info .product-shortinfo").empty();
        $(".anal-douche-product-info .product-shortinfo").append("<p>Choose between our cleanser or our complete  douching kit by selecting an option with our medical-grade douche bulb or selecting just our mild, isotonic rectal wash. Suitable for all genders and bodies.</p>");
        $(".anal-douche-product-info #shopify-section-p-meta-info-tab .rmi-cols .pi-info-grid:nth-of-type(1) p").empty().text("Gently washes unwanted residual/lingering waste.");
        $(".anal-douche-product-info #shopify-section-p-meta-info-tab .rmi-cols .pi-info-grid:nth-of-type(2) p").empty().text("Calms while cleansing your rectum, for a refreshing feel.");
        $(".anal-douche-product-info #shopify-section-p-meta-info-tab .rmi-cols .pi-info-grid:nth-of-type(3) p").empty().text("Hydrates and comforts delicate tissue.");
        $("#shopify-section-product-blocks .blog-entry:nth-of-type(2)").attr("data-url","/blogs/the-science-of-sex/how-to-clean-a-douche-bulb");
        $("#shopify-section-product-blocks .blog-entry:nth-of-type(2) .title").empty().text("How to Clean a Douche Bulb");
        $("#shopify-section-product-blocks .blog-entry:nth-of-type(2) .be-copy p").empty().text("No surprises, no mess, just pure cleanliness.");
        $("#shopify-section-product-blocks .blog-entry:nth-of-type(2) .be-footer a").attr("href","/blogs/the-science-of-sex/how-to-clean-a-douche-bulb");
        $(".jdgm-rev-widg__body, .jdgm-widget-actions-wrapper, #shopify-section-faq-6 .faq-entry.faq-4").remove();
        let fq1t = $("#shopify-section-faq-6 .faq-entry.faq-1 h5").text().replace('anal','');
        fq1t = fq1t.replace('+','');
        let fq1tt = $("#shopify-section-faq-6 .faq-entry.faq-1 .faqe-inner p").text().replace('anal','');
        $("#shopify-section-faq-6 .faq-entry.faq-1 .faqe-inner p").text(fq1tt);
        $("#shopify-section-faq-6 .faq-entry.faq-1 h5").text(fq1t).append("<span>+</span>");
        let fq3t = $("#shopify-section-faq-6 .faq-entry.faq-3 .faqe-inner p").html().replace('anal','');
        $("#shopify-section-faq-6 .faq-entry.faq-3 .faqe-inner p").html(fq3t);
        let fq6h = $("#shopify-section-faq-6 .faq-entry.faq-6 h5").html().replace('anal','');
        $("#shopify-section-faq-6 .faq-entry.faq-6 h5").html(fq6h);
        let fq7t = $("#shopify-section-faq-6 .faq-entry.faq-7 .faqe-inner p").html().split('<br>')[0];
        $("#shopify-section-faq-6 .faq-entry.faq-7 .faqe-inner p").html(fq7t);
        $(".product-w-image-details.p-4 .p-4-image-to-replace").attr("src","https://futuremethod.com/cdn/shop/t/31/assets/FM_PMax_DispDoucheOriginal.jpg?v=38074770132741318491700137949");
        setTimeout(function () {
          $("#shopify-section-product-images .pci-entry-1").css('background-image', 'url(https://cdn.shopify.com/s/files/1/0012/0927/0336/files/FM_PMax_DisposableDouche.jpg?v=1700138386)');
          $("#shopify-section-product-images .pci-entry-2").css('background-image', 'url(https://cdn.shopify.com/s/files/1/0012/0927/0336/files/FM_PMax_DisposableDouche_1.jpg?v=1700138670)');
        }, 440);
      }
    }

    $(document).on("click",".page-product-filters a", function(){
      let tt = $(this).attr("data-target");
      if(tt == "null") {
        $(".all-products-grid .apg-entry.product").removeClass("hidden");
      }
      else {
        $(".all-products-grid .apg-entry.product").removeClass("hidden").addClass("hidden");
        $(".all-products-grid .apg-entry.product."+tt).removeClass("hidden")
      }
      $(".page-product-filters a").removeClass("active");
      $(this).addClass("active");
      return false;
    })
    
    if($("#shopify-section-wide-modal").length > 0) {
        let modalCookie = Cookies.get("fmmodalview");
        if (typeof modalCookie === 'undefined') {
          Cookies.set('fmmodalview', '1', { expires: 1 });
          window.setTimeout(function() {
            $("body").addClass("opaque show-modal");
            if($(".modal.promo-popup").length > 0) {
              $(".modal.promo-popup").addClass("active-modal")
            }
            else {
              $(".modal.default-modal").addClass("active-modal")
            }
          }, 30000);
        }
        else {
          $("#shopify-section-wide-modal .modal").remove();
        }
    }
    let g_timer = null;

    function mcTimer() {
      // g_timer = window.setTimeout(function() {
      //   $('.mini-cart, .mini-cart .mc-actions').removeClass("active");
      //   $('.content-wrapper').removeClass("opaque");
      // }, 6000);
    }
    
    function mcTimerReset() {
        clearTimeout(g_timer);
        mcTimer();
    }

   $(document).on("click", ".all-products-grid .apg-entry .thumb-wrapper", function(){
    if($(this).attr("data-url")){
      window.location = $(this).attr("data-url");
    }
   }); 
    if($(".the-forum-faq-wrapper").length > 0) {
      function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
      }
      var goto = getUrlVars()["q"];
      if(goto) {
        let correction = -84;
        $('html,body').animate({scrollTop: ($(".the-forum-faq-wrapper .faq-entry h5[data-entry='"+goto+"']").offset().top+correction)}, 1000);
        $(".the-forum-faq-wrapper .faq-entry h5[data-entry='"+goto+"']").parent().addClass("active")
        $(".the-forum-faq-wrapper .faq-entry h5[data-entry='"+goto+"'] span").text("-")
      }
      else {
      }
    }

    $(document).on("click", ".ac-author a", function(){
      let target = $(this).attr("href");
      let correction = -84;
      $('html,body').animate({scrollTop: ($(target).offset().top+correction)}, 1000);
      return false;
    });

    $(document).on("click",".announcement-bar a", function(){
      let tg = $(this).attr("href");
      if(tg == "#covid-info" || tg == "#bf-info" || tg == "#general-info") {
        $(".modal.extra").addClass("visible");
        return false;
      }
    });

    if(window.location.hash) {
      if(window.location.hash === "#in-the-news") {
        var correction = -94;  
        setTimeout(function () {
        window.scrollTo(0, $("#in-the-news").offset().top+correction);
        }, 400);
      }
      if(window.location.hash.includes("wii")) {
        var correction = -64; 
        $('html,body').animate({scrollTop: ($(window.location.hash).offset().top+correction)}, 1000);
      }
      /*
      if(window.location.hash === "#are-future-method-products-available-in-retail-stores" && $(".template-faq").length > 0) {
        if($("#are-future-method-products-available-in-retail-stores").length > 0) {
          var correction = -124;  
          $('html,body').animate({scrollTop: ($("#are-future-method-products-available-in-retail-stores").offset().top+correction)}, 1000);
        }
      }
      if(window.location.hash === "#where-do-you-ship" && $(".template-faq").length > 0) {
        var correction = -124;  
        $('html,body').animate({scrollTop: ($("#where-do-you-ship").offset().top+correction)}, 1000);
      }
      */
      if($(".template-faq").length > 0) {
        var correction = -164;  
        $('html,body').animate({scrollTop: ($(window.location.hash).offset().top+correction)}, 1000);
        $(window.location.hash).addClass("active");
      }
      
    }

    

    $(document).on("click",".wi-grid .wi-entry a", function(){
      let ttg = $(this).attr("href");
      if(ttg.includes("wii")) {
        var correction = -124; 
        $('html,body').animate({scrollTop: ($(ttg).offset().top+correction)}, 1000);
        return false;
      }
    });

    if($(".modal").length > 0) {
      // setTimeout(function () {
      //   $(".modal").hide();
      // }, 5000); 
    }
    $(".modal .close").click(function(){
      if($(".modal").hasClass("visible")){
        $(".modal").removeClass("visible");
      }
      else {
        $(".modal").not($(".modal.extra")).hide();
        if($(".modal").hasClass("active-modal")){
          $(".modal").removeClass("active-modal");
        }
        $("body").removeClass("opaque show-modal");
      }
      return false;
    });

    // if($(".modal").is(':visible')) {
    //   $("body").toggleClass("opaque");
    // }

    if($(".hub-blog-listing").length){
      $(".hub-blog-listing .fel-entries").owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        responsive:{
          0: {
            items:1
          },
          640:{
              items:3
          }
        }
      });
    }
    if($(".hub-forum-listing").length){
      $(".hub-forum-listing").owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        responsive:{
          0: {
            items:1
          },
          640:{
              items:3
          }
        }
      });
    }
    
    // homehero carousel
    if($("#shopify-section-home-hero").length){
      let hheroc = $("#shopify-section-home-hero-carousel .carousel-wrapper")
      hheroc.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        responsive:{
          0: {
            items:1
          }
        }
      });
      $(document).on('keypress', function(e) {
        if(e.keyCode == 106) {
          //press j
          $("#shopify-section-home-hero").remove();
          $("#shopify-section-home-hero-carousel .hhc-inner-wrapper").removeClass("hidden");
          hheroc.data('owlCarousel').destroy();
          hheroc.owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 9000,
            autoplayHoverPause: true,
            responsive:{
              0: {
                items:1
              }
            }
          });
        }
      });
      
    }

    if($("#shopify-section-hp-new-carousel").length){
      let hheroc = $("#shopify-section-hp-new-carousel .carousel-wrapper")
      hheroc.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 9000,
        autoplayHoverPause: true,
        responsive:{
          0: {
            items:1
          }
        }
      });
    }
    $(document).on("click", ".sproduct-right .select-pack a, .pos-pack-select a", function(){
      $(this).toggleClass("active");
      return false;
    });
    
    $(document).on("click", ".product-dp-tabs .pdt-nav a", function(){
      $(".product-dp-tabs .pdt-nav a, .product-dp-tabs .pdt-tabs-tab").removeClass("active");
      $(this).addClass("active");
      $(".product-dp-tabs "+$(this).attr("href")).addClass("active");
	  return false;
    });

    if(window.location.href.indexOf("?debugmode") > -1) {
      $("body").addClass("debug-mode");
    }
    if($(".pos-pack-select").length > 0) {
      if($(".pos-pack-select .active").attr("data-oldprice")) {
        $(".aptc-price").empty();
        $(".aptc-price").append("<span>$"+$(".pos-pack-select .active").attr("data-oldprice")+"</span> $"+$(".pos-pack-select .active").attr("data-price"));
      }
      else {
        $(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
      }
    }
    $(document).on("click", ".pos-pack-delivery p",function() {
      let curoption = $(this).attr("data-df");
      //$("#rc_autodeliver_options #rc_shipping_interval_frequency option[value='"+curoption+"']").prop('selected', true);
      $(".rc_widget__option__plans__dropdown.rc-selling-plans__dropdown option[data-plan-option='Delivery every "+curoption+" Weeks']").prop('selected', true);
      $(".pos-pack-delivery p").removeClass("active");
      $(this).addClass("active");
      let defsubf = $(".subscription-frequency.visible .pos-pack-delivery .active").text();
      $(".subscription-frequency.visible .subscription-frequency-value").empty().html('<strong>'+defsubf+'</strong> (tap above for options)');
      return false;
    })
    $(document).on("click", ".pos-pack-select p",function(){
      if(!$(this).hasClass("disabled")) {
        $(".pos-pack-select p, .pack-select-info p").removeClass("active");
        let tic = $(this).attr("data-pi");
        let svariant = $(this).attr("data-pid");
        //$(".aptc-price").empty().text("$"+$(this).attr("data-price"));
        if($(this).attr("data-oldprice")) {
          $(".aptc-price").empty();
          $(".aptc-price").append("<span>$"+$(this).attr("data-oldprice")+"</span> $"+$(this).attr("data-price"));
        }
        else {
          $(".aptc-price").empty().text("$"+$(this).attr("data-price"));
        }
        $(".pack-select-info p."+tic).addClass("active");
        $(this).addClass("active");
        $("#pmax").val($(this).attr("data-limit"));
        $(".product-variant-selector option[value='"+svariant+"']").prop('selected', true); 
      }
      return false;
    });
    if($(".pos-frequency-select").length > 0) {
      if($(".pos-frequency-select .option.subscription").hasClass("selected")) {
        setTimeout(function() {
          $(".rc-container-wrapper .rc-option__subsave .rc-radio__label").trigger("click");
        },880);
        if($(".pos-pack-select").length > 0) {
          $(".pos-pack-select p").removeClass("active");
          $(".pos-pack-select p").not($(".pos-pack-select p.subscription")).addClass("disabled");
          $(".pos-pack-select .option-to-hide").addClass("to-hide");
          $(".pos-pack-select p.subscription").removeClass("hide").addClass("active");
          $(".rc_widget__option__plans__dropdown.rc-selling-plans__dropdown option[data-plan-option='Delivery every 4 Weeks']").prop('selected', true);
          let subId = $(".pos-pack-select p.subscription.active").attr("data-pid");
          $("#pmax").val($(".pos-pack-select p.subscription.active").attr("data-limit"));
          $(".product-variant-selector option[value='"+subId+"']").prop('selected', true);
          //$(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
          if($(".pos-pack-select .active").attr("data-oldprice")) {
            $(".aptc-price").empty();
            $(".aptc-price").append("<span>$"+$(".pos-pack-select .active").attr("data-oldprice")+"</span> $"+$(".pos-pack-select .active").attr("data-price"));
          }
          else {
            $(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
          }
          $(".subscription-frequency").addClass("visible");
        }
      }
    }
    $(document).on("click", ".pos-frequency-select .option",function(){
      $(".pos-frequency-select .option").removeClass("selected");
      $(this).addClass("selected");
      if($(this).hasClass("subscription")) {
        $(".pos-pack-select p").removeClass("active");
        $(".pos-pack-select p").not($(".pos-pack-select p.subscription")).addClass("disabled");
        $(".pos-pack-select .option-to-hide").addClass("to-hide");
        $(".pos-pack-select p.subscription").removeClass("hide").addClass("active");
        $(".pack-select-info p").removeClass("active");
        $(".pack-select-info ."+$(".pos-pack-select p.subscription").attr("data-pi")).addClass("active");
        $(".subscription-frequency").addClass("visible");
        $(".rc_widget__option__plans__dropdown.rc-selling-plans__dropdown option[data-plan-option='Delivery every 4 Weeks']").prop('selected', true);
        let subId = $(".pos-pack-select p.subscription.active").attr("data-pid");
        $("#pmax").val($(".pos-pack-select p.subscription.active").attr("data-limit"));
        $(".product-variant-selector option[value='"+subId+"']").prop('selected', true);
        if($(".rc_container").length > 0) {
          $(".rc-container-wrapper .rc-option__subsave .rc-radio__label").trigger("click");
        }
        //$(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
        if($(".pos-pack-select .active").attr("data-oldprice")) {
          $(".aptc-price").empty();
          $(".aptc-price").append("<span>$"+$(".pos-pack-select .active").attr("data-oldprice")+"</span> $"+$(".pos-pack-select .active").attr("data-price"));
        }
        else {
          $(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
        }
      }
      else {
        $(".pack-select-info p").removeClass("active");
        $(".pos-pack-select p.subscription").addClass("hide");
        $(".pos-pack-select .option-to-hide").removeClass("to-hide");
        $(".subscription-frequency").removeClass("visible");
        $(".pos-pack-select p").removeClass("active disabled");
        $(".pos-pack-select p:first, .pack-select-info p:first").addClass("active");
        if($(".rc_container").length > 0) {
          $(".rc-container-wrapper .rc-option__onetime .rc-radio__label").trigger("click");
        }
        let subId = $(".pos-pack-select p.active").attr("data-pid");
        $("#pmax").val($(".pos-pack-select p.active").attr("data-limit"));
        $(".product-variant-selector option[value='"+subId+"']").prop('selected', true);
        //$(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
        if($(".pos-pack-select .active").attr("data-oldprice")) {
          $(".aptc-price").empty();
          $(".aptc-price").append("<span>$"+$(".pos-pack-select .active").attr("data-oldprice")+"</span> $"+$(".pos-pack-select .active").attr("data-price"));
        }
        else {
          $(".aptc-price").empty().text("$"+$(".pos-pack-select .active").attr("data-price"));
        }
      }
      return false;
    });

    $(document).on("click", ".ti-head a", function(){
      let tgs = $(this).attr("href");
      if(tgs === "#faqs") {
        let correction = -216;
        $('html,body').animate({scrollTop: ($(".faq-wrapper").offset().top+correction)}, 1000);
      }
      else {
        $(".ti-head a, .ti-content .tic-entry").removeClass("active");
        $(this).addClass("active");
        $(".ti-content").find($(tgs)).addClass("active");
      }
      return false;
    });
    $(document).on("click", ".product-info-blocks .pibrm-trigger", function(){
      $(".product-info-blocks .pib-read-more").not($(this).parent()).removeClass("active");
      $(this).parent().toggleClass("active");
      return false;
    });
    
    $(document).on("click", ".product-info-blocks a", function(){
      let tgs = $(this).attr("href");
      if(tgs === "#faqs") {
        let correction = -164;
        $('html,body').animate({scrollTop: (($(".faq-wrapper h3").offset().top+correction).toFixed(0))}, 1000);
        return false;
      }
    })
    if($(".sproduct-right.scrub.biotic").length > 0) {
      setTimeout(function() {
        $(".rc-container-wrapper .rc-radio.rc-option__onetime .rc-radio__input.rc_widget__option__input--onetime").trigger('click');
      },540);
      $("#pmaxl").val($(".product-dp-selector li:first").attr("data-limit"));
      $("#pmax").val($(".product-dp-selector li:first").attr("data-limit"));
    }

    if($(".sproduct-right").length > 0 && !$(".sproduct-right").hasClass("scrub") && !$(".sproduct-right").hasClass("mp")) {
      if(!$(".add-pack-to-cart").hasClass("sold-out")) {
        $(".sproduct-right .add-pack-to-cart").removeClass("hidden");
      }
      if($(".product-dp-selector").length > 0) {
        $("#pmaxl").val($(".product-dp-selector li:first").attr("data-limit"));
        $("#pmax").val($(".product-dp-selector li:first").attr("data-limit"));
      }
      $(".product-pack-selector .pps-entry").each(function(){
        let variantName = $(".variant-name",this).attr("data-name");
        if(variantName.length) {
          if (variantName.toLowerCase().indexOf("subscribe") <= 0) {
            $(".pps-e-quant",this).removeClass("hidden");
          }
          else {
            let variant = $(this).attr("data-variant");
            $(".pps-e-content",this).addClass("selected-pack");
            $(".extra-info",this).removeClass("to-hide");
            $(".pps-e-quant",this).removeClass("hidden");
            setTimeout(function() {
              $("#rc_container .rc_label.rc_label__autodeliver").trigger('click');
              $("#product-select-1392111026240").find('option:selected').prop('selected', false);
              $("#product-select-1392111026240 option[value="+variant+"]").prop('selected', true); 
            },540);
          }
        }
      });

      $(document).on("click", ".product-pack-selector .pps-entry", function(){
        // package clicker
        if($(this).hasClass("available")){
          let variant = $(this).attr("data-variant");
          let variantName = $(".variant-name",this).attr("data-name");
          let currQuant = $(".pps-e-quant .quant-total", this).text();
          if(currQuant > 1) {
            $("#add-to-cart #Quantity").val(currQuant);
          }
          else {
            $("#add-to-cart #Quantity").val("1");
          }
          $(".product-pack-selector .pps-entry .pps-e-content").removeClass("selected-pack");
          $(".pps-e-content",this).addClass("selected-pack");
          if (variantName.toLowerCase().indexOf("subscribe") >= 0) {
            // $("#rc_container .rc_label.rc_label__autodeliver").click();
            $(".rc-container-wrapper .rc-radio.rc-option__subsave .rc-radio__input.rc_widget__option__input--subsave").trigger('click');
          }
          else {
            //$("#rc_container .rc_label.rc_label__onetime").click();
            $(".rc-container-wrapper .rc-radio.rc-option__onetime .rc-radio__input.rc_widget__option__input--onetime").trigger('click');
          }
          $("#product-select-1392111026240").find('option:selected').prop('selected', false);
          $("#product-select-1392111026240 option[value="+variant+"]").prop('selected', true); 
        }
        return false;
      });
    }
    /* new product */
    /* anal douche pack selector */
    if(!$(".sproduct-right  .add-pack-to-cart").hasClass("sold-out")) {
      $(".sproduct-right .add-pack-to-cart").removeClass("hidden");
    }
    if($(".pos-pack-select").length > 0) {
      $("#pmax").val($(".pos-pack-select .active").attr("data-limit"));
    }
    /*
    if($(".sproduct-right").hasClass("mp")) {
      $(".sproduct-right .add-pack-to-cart").removeClass("hidden");
      setTimeout(function() {
        if($("#rc_container").length > 0) {
          $("#product-select-5598147215509").find('option:selected').prop('selected', false);
          $("#product-select-5598147215509 option[value=35703831527573]").prop('selected', true); 
          //$("#rc_container .rc_label.rc_label__onetime").trigger('click');
          $(".rc-container-wrapper .rc-radio.rc-option__onetime .rc-radio__input.rc_widget__option__input--onetime").trigger('click');
          if($(".product-dp-selector").length > 0) {
        	$("#pmaxl").val($(".product-dp-selector li.active").attr("data-limit"));
            $("#pmax").val($(".product-dp-selector li.active").attr("data-limit"));
      	  }
        }
        else {
          $(".add-pack-to-cart").addClass("hidden");
        }
      },540);
    }
    */
    setTimeout(function() {
      if($(".rc-container-wrapper.rc_container_wrapper").length > 0) {
        //console.log("ReCharge widget is present");
        if(!$(".rc-container-wrapper.rc_container_wrapper .rc_widget__option--active").hasClass("rc_widget__option--onetime")) {
          console.log("setting ReCharge to onetime purchase by default!");
          $(".rc-container-wrapper .rc-radio.rc-option__onetime .rc-radio__input.rc_widget__option__input--onetime").trigger('click');
        }
      }
    },340);
  
    $(document).on("click", ".main-header .search-toggle", function(){
      $(".main-header .search-form").toggleClass("active");
      $(".main-header .search-form input[type=text]").focus();
      $(".content-wrapper").toggleClass("opaque");
      return false;
    });
    
    if($(".product-dp-info.just-visible").length > 0) {
      $(".product-dp .product-dp-info.just-visible .default").addClass("active");
    }

    if($("#blog-modal").length > 0) {
      
      let modalCookie = Cookies.get("uwblgmodal");
      
      if (typeof modalCookie === 'undefined') {
		window.setTimeout(function() {
	    	jQuery("#blog-modal").addClass("visible");
	  	}, 2400);
      }
    }
    document.addEventListener('scroll', function () {
      if($("#blog-modal").length > 0) {
        const sfooter = document.getElementById("shopify-section-article-ga");
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		var rect = sfooter.getBoundingClientRect();
        let modalCookie = Cookies.get("uwblgmodal");
		    if(rect.top < vh) {
		    	jQuery("#blog-modal").removeClass("visible");
		    }
		    else {
              if (typeof modalCookie === 'undefined') {
		    	jQuery("#blog-modal").addClass("visible");	
              }
  		    }
      }
		}, {
		    passive: true
		});
    jQuery(document).on("click","#blog-modal .bm-close",function(){
    	jQuery("#blog-modal").removeClass("visible");
        let modalCookie = Cookies.get("uwblgmodal");
    	if (typeof modalCookie === 'undefined') {
        	Cookies.set('uwblgmodal', '1', { expires: 1 });
        }
    	return false;
    })

    if($(".sproduct.alt .product-dp").length > 0 && !$(".product-dp").hasClass("simple-dp")) {
      let curoption = $(".product-dp .product-dp-selector .default").text();
      $(".product-dp .product-dp-selector .default, .product-dp .product-dp-info .default").addClass("active");
      $(".product-dp .product-dp-trigger span").text(curoption);
      $(document).on("click", ".product-dp .product-dp-trigger", function(){
        $(".product-dp .product-dp-selector").toggleClass("active");
        $(this).toggleClass("active");
        return false;
      });

      $(document).on("click", ".product-dp .product-dp-selector .option", function(){
        let curoption = $(this).text();
        let curclass = $(this).attr("data-variant-id");
        let variant = $(this).attr("data-variant");
        let variantName = $(this).attr("data-variant-name");
        console.log("Selected variant is: "+variantName);
        let maxlimit = $(this).attr("data-limit");
        $(".product-dp .product-dp-trigger span").empty().text(curoption);
        $(".product-dp .product-dp-trigger, .product-dp .product-dp-selector, .product-dp .product-dp-selector .option, .product-dp .product-dp-info .option").removeClass("active");
        $(".product-dp .product-dp-info .option[data-variant-id='"+curclass+"']").addClass("active");
        $(this).addClass("active");
        if (variantName.toLowerCase().indexOf("subscribe") >= 0 || variantName.toLowerCase().indexOf("subscription") >= 0) {
          //$("#rc_container .rc_label.rc_label__autodeliver").click();
          $(".rc-container-wrapper .rc-radio.rc-option__subsave .rc-radio__input.rc_widget__option__input--subsave").trigger('click');
        }
        else {
          //$("#rc_container .rc_label.rc_label__onetime").click();
          $(".rc-container-wrapper .rc-radio.rc-option__onetime .rc-radio__input.rc_widget__option__input--onetime").trigger('click');
        }
        $("#product-select-5598147215509").find('option:selected').prop('selected', false);
        $("#product-select-5598147215509 option[value="+variant+"]").prop('selected', true); 
        $("#pmaxl").val(maxlimit);
        $("#pmax").val(maxlimit);
        return false;
      });
    }
    $(document).on("click", ".pdt-tabs-tab .tab-dp-selector p", function(){
      $(this).parent().toggleClass("active");
      return false;
    });
    $(document).on("click", ".delivery-frequency-selector p", function(){
      $(".delivery-frequency-selector ul").toggleClass("active");
      $(this).toggleClass("active");
      return false;
    });
    $(document).on("click", ".delivery-frequency-selector li", function(){
      let curoptiont = $(this).text();
      let curoption = "Delivery every "+$(this).attr("data-df")+" Weeks";
      $(".delivery-frequency-selector p").text(curoptiont);
      //$("#rc_autodeliver_options .rc_select.rc_select__frequency option[value="+curoption+"]").prop('selected', true);
      $(".rc_widget__option__plans__dropdown.rc-selling-plans__dropdown option[data-plan-option='"+curoption+"']").prop('selected', true);
      $(".delivery-frequency-selector p, .delivery-frequency-selector ul").removeClass("active");
    });
    if($(".delivery-frequency-selector.twelve-pack").length > 0) {
      let curoption = "Delivery every 4 Weeks";
      setTimeout(function() {
        //$("#rc_autodeliver_options .rc_select.rc_select__frequency option[value=4]").prop('selected', true);
        $(".rc_widget__option__plans__dropdown.rc-selling-plans__dropdown option[data-plan-option='"+curoption+"']").prop('selected', true);
      },540);
    }
    if($(".delivery-frequency-selector.biotic").length > 0) {
      let curoption = "Delivery every 4 Weeks";
      setTimeout(function() {
        //$("#rc_autodeliver_options .rc_select.rc_select__frequency option[value=4]").prop('selected', true);
        $(".rc_widget__option__plans__dropdown.rc-selling-plans__dropdown option[data-plan-option='"+curoption+"']").prop('selected', true);
      },540);
    }
    if($(".product-dp").hasClass("simple-dp")) {
      let curoption = $(".product-dp .product-dp-selector .default").text();
      $(".product-dp .product-dp-selector .default").addClass("active");
      $(".product-dp .product-dp-trigger span").text(curoption);
      $(document).on("click", ".product-dp .product-dp-trigger", function(){
        $(".product-dp .product-dp-selector").toggleClass("active");
        $(this).toggleClass("active");
        if($(".sproduct-right .price-detail-text").length > 0 && !$(".sproduct-right .price-detail-text").hasClass("biotic")) {
          $(".sproduct-right .price-detail-text").toggleClass("visible");
        }
        return false;
      });
      $(document).on("click", ".product-dp.simple-dp .product-dp-selector .option", function(){
        let curoption = $(this).text();
        let maxlimit = $(this).attr("data-limit");
        let dfs = $("#add-to-cart").attr("data-productid");
        $(".product-dp .product-dp-trigger span").empty().text(curoption);
        $(".product-dp .product-dp-trigger, .product-dp .product-dp-selector, .product-dp .product-dp-selector .option").removeClass("active");
        $(this).addClass("active");
		$("#pmaxl").val(maxlimit);
        $("#pmax").val(maxlimit);
        $(".price-detail-text").removeClass("visible");
        if($(".product-dp-info.just-visible").length > 0) {
          let dvi = $(this).attr("data-variant-id");
          $(".product-dp-info.just-visible .option").removeClass("active");
          $(".product-dp-info.just-visible .option."+dvi).addClass("active");
        }
        if (curoption.toLowerCase().indexOf("subscription") == 0) {
          //$("#rc_container .rc_label.rc_label__autodeliver").click();
          $(".rc-container-wrapper .rc-radio.rc-option__subsave .rc-radio__input.rc_widget__option__input--subsave").trigger('click');
          if($(".delivery-frequency-selector.biotic").length > 0) {
            $(".delivery-frequency-selector.biotic").addClass("active");
            $(".price-detail-text.frequency").addClass("visible");
            $(".price-detail-text.disclaimer").removeClass("visible");
            let variant = $(this).attr("data-variant"); 
            $("#product-select-"+dfs).find('option:selected').prop('selected', false);
            $("#product-select-"+dfs+" option[value="+variant+"]").prop('selected', true);
          } 
        }
        else {
          let variant = $(this).attr("data-variant");
          $("#product-select-"+dfs).find('option:selected').prop('selected', false);
          $("#product-select-"+dfs+" option[value="+variant+"]").prop('selected', true); 
          //$("#rc_container .rc_label.rc_label__onetime").click();
          $(".rc-container-wrapper .rc-radio.rc-option__onetime .rc-radio__input.rc_widget__option__input--onetime").trigger('click');
          $(".price-detail-text").removeClass("visible");
          if($(".delivery-frequency-selector.biotic").length > 0) {
            $(".delivery-frequency-selector.biotic").removeClass("active");
          } 
          if (curoption.toLowerCase().indexOf("12-month supply") >= 0) {
            $(".price-detail-text.disclaimer").addClass("visible");
          }
        }
        return false;
      });
    }

    function addToCartOk(product) { 
      $(".main-header .cart").empty();
      $.getJSON('/cart.js', function(cart) {
        $(".main-header .cart").append("<span>"+cart.item_count+"</span>");
          for( x in cart.items ){
              let defThumb = cart.items[x].featured_image.url;
              if(cart.items[x].properties !== null) {
                var maxq = Number(cart.items[x].properties.pmax);
              }
              else {
                var maxq = 5;
              }
              if(cart.items[x].variant_title) {
                var prtlc = cart.items[x].variant_title;
              }
              else {
                var prtlc = cart.items[x].product_title;
              }
              
              var prtlc = prtlc.toLowerCase();
  
              if(cart.items[x].quantity == 1) {
                if (prtlc.indexOf("subscription") > 0) {
                    $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>12-Pack Monthly Subscription</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item deselected'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>");  
                }
                else if(cart.items[x].product_title == "Butt & Gut Daily Pre + Probiotic 10.00% Off Auto renew") {
                  $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>Subscription Butt & Gut Daily Pre + Probiotic</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item deselected'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>"); 
                }
                else {
                    if(cart.items[x].variant_title) {
                      $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>"+cart.items[x].variant_title+"</p><p class='product-desc'>"+cart.items[x].product_description+"</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item deselected'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>");  
                    }
                  else {
                    $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>"+cart.items[x].product_title+"</p><p class='product-desc'>"+cart.items[x].product_description+"</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item deselected'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>");  
                  }
                }
              }
              else if(cart.items[x].quantity > 1) {
                if (prtlc.indexOf("subscription") > 0) {
                  $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>12-Pack Monthly Subscription</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>");  
                }
                else if(cart.items[x].product_title == "Butt & Gut Daily Pre + Probiotic 10.00% Off Auto renew") {
                  $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>Subscription Butt & Gut Daily Pre + Probiotic</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item deselected'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>"); 
                }
                else {
                  if(cart.items[x].variant_title) {
                    $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>"+cart.items[x].variant_title+"</p><p class='product-desc'>"+cart.items[x].product_description+"</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>");
                  }
                  else {
                    $(".mini-cart .mc-content").append("<div class='cart-item "+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"' data-price='"+cart.items[x].final_price+"'><div class='ci-thumb'><img src='"+defThumb+"'></div><div class='ci-copy'><p class='variant-name hidden'>"+cart.items[x].product_title+"</p><p class='product-name'>"+cart.items[x].product_title+"</p><p class='product-desc'>"+cart.items[x].product_description+"</p><p class='variant-price'>"+Shopify.formatMoney(cart.items[x].final_price)+"</p><div class='cart-item-actions cf' data-product-id='"+cart.items[x].variant_id+"' data-quantity='"+cart.items[x].quantity+"'><div class='quant-selector'><a href='#' class='remove-item'>-</a><span class='current-quantity'>"+cart.items[x].quantity+"</span><a href='#' class='add-item' data-maxq='"+maxq+"'>+</a></div><a href='#' class='delete-item'>Delete Item</a></div></div></div>");
                  }
                }
              }

            
              
          }
        if(cart.item_count <= 1) {
          $('.mini-cart .mc-content').append("<p class='cart-info'><span class='ci-title'>Subtotal (<em>"+cart.item_count+"</em> item)</span> <span class='ci-cost'>"+Shopify.formatMoney(cart.total_price)+"</span></p>");
        }
        else {
          $('.mini-cart .mc-content').append("<p class='cart-info'><span class='ci-title'>Subtotal (<em>"+cart.item_count+"</em> items)</span> <span class='ci-cost' data-fcost='"+cart.total_price+"'>"+Shopify.formatMoney(cart.total_price)+"</span></p>");
        }
      });
      $('body, .content-wrapper').addClass("opaque");
      
      $('.mini-cart').addClass("active");
      setTimeout(function () {
        $('.mini-cart .mc-actions').addClass("active");
      }, 800);
      //mcTimer();
    } 
  
    function addToCartFail(obj, status) { 
      $('.mini-cart').html('The product you are trying to add is out of stock.'); 
    } 

    function addItem() {
      $.ajax({
        type: 'POST', 
        url: '/cart/add.js',
        dataType: 'json', 
        data: $('#add-to-cart').serialize(),
        success: addToCartOk,
        error: addToCartFail
      });
    }
    // stian
    if ($(".announcement-bar").length > 0) {
      if($(".announcement-bar").visible( false, true ) && $(".main-header").visible( false, true )) {
        let mcst = $(".announcement-bar").outerHeight(true) + $(".main-header").outerHeight(true);
        let abh = $(".announcement-bar").outerHeight(true);
        let dtp = $(".main-header").height();
        $(".mini-cart").css("top",dtp+abh);
        $(".mobile-nav").css("top",mcst);
        $(".mobile-nav").css("height","calc(90vh - "+mcst+"px)");
      }
      else {
        let mcst = $(".announcement-bar").outerHeight(true) + $(".main-header").outerHeight(true);
        if($(window).scrollTop() < mcst) {
          let mcstf = mcst - $(window).scrollTop();
          let abh = $(".announcement-bar").outerHeight(true);
          let dtp = $(".main-header").height();
          $(".mini-cart").css("top",dtp+abh);
          $(".mobile-nav").css("top",mcstf);
          $(".mobile-nav").css("height","calc(90vh - "+mcstf+"px)");
        }
      }
    }
    else {
      if($(".main-header").visible( false, true )) {
        let mcst = $(".main-header").outerHeight(true);
        let abh = $(".announcement-bar").outerHeight(true);
        let dtp = $(".main-header").height();
        $(".mini-cart").css("top",dtp+abh);
        $(".mobile-nav").css("top",mcst);
        $(".mobile-nav").css("height","calc(90vh - "+mcst+"px)");
      }
      else {
        let mcst = $(".main-header").outerHeight(true);
        if($(window).scrollTop() < mcst) {
          let mcstf = mcst - $(window).scrollTop();
          let abh = $(".announcement-bar").outerHeight(true);
          let dtp = $(".main-header").height();
          $(".mini-cart").css("top",dtp+abh);
          $(".mobile-nav").css("top",mcstf);
          $(".mobile-nav").css("height","calc(90vh - "+mcstf+"px)");
        }
      }
    }
    let defThumb = $(".default-product-thumb.to-hide").attr("src");
    

    $(document).on("click", ".faq-wrapper .faq-entry h5", function(){
      $(".faq-wrapper .faq-entry").not($(this).parent()).removeClass("active");
      $(".faq-wrapper .faq-entry h5 span").not($("span",this)).text("+");
      $(this).parent().toggleClass("active");
      let text = $("span",this).text();
      $("span",this).text(text == "+" ? "-" : "+");
    });
    $(document).on("click", ".product-pack-selector .pps-e-quant a", function(){
      let counter = Number($(this).parent().find(".quant-total").text());
      if($(this).hasClass("add-quant")){
        counter++
        $(this).parent().find(".quant-total").text(counter);
        $("#add-to-cart #Quantity").val(counter);
        if($(this).parent().find(".remove-quant").hasClass("disabled")){
          $(this).parent().find(".remove-quant").removeClass("disabled")
        }
        if($(this).attr("data-max")) {
          let maxq = Number($(this).attr("data-max"));
          if(maxq == counter) {
            $(this).addClass("disabled");
            setTimeout(function () {
              alert("To purchase 5+ units, please email info@futuremethod.com");
            }, 300);
          }
        }
      }
      if($(this).hasClass("remove-quant")){
        if(!$(this).hasClass("disabled")){
          if((counter - 1) > 1) {
            counter--
            $(this).parent().find(".quant-total").text(counter);  
            $("#add-to-cart #Quantity").val(counter);
            if($(this).parent().find(".add-quant").hasClass("disabled")) {
              $(this).parent().find(".add-quant").removeClass("disabled")
            }
          }
          else if((counter - 1) == 1 || (counter - 1) < 1) {
            $(this).parent().find(".quant-total").text("1"); 
            $("#add-to-cart #Quantity").val("1");
            $(this).addClass("disabled");
          }
        }
      }
      return false;
    });
    $("#cart-form .pq").keyup(function () {
      let curVal = $(this).val();
      if(curVal > 2) {
        alert("If you want to purchase 3+ 12-packs, please contact us at info@futuremethod.com");
        $(this).val(2);
      }
    });
    
    $(document).on("click", ".cart-item-actions .quant-selector .add-item", function(){
      let id = "id";
      let quantity = "quantity";
      let currQuant = Number($(this).parent().find(".current-quantity").text());
      let maxQ = Number($(this).attr("data-maxq"))
      let data = {};
      data[id] = $(this).parent().parent().attr("data-product-id");
      data[quantity] = currQuant + 1;
      if(currQuant == maxQ) {
        alert("If you want to purchase more than "+maxQ+" items, please contact us at info@futuremethod.com");
      }
      else {
        $.ajax({
          url: "/cart/change.js",
          type: "POST",
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json'
        });
        $(this).parent().find(".remove-item").removeClass("deselected");
        let defQ = Number($(this).parent().parent().attr("data-quantity"));
        $(this).parent().parent().attr("data-quantity",defQ + 1);
        $(".mini-cart .mc-content .cart-item."+$(this).parent().parent().attr("data-product-id")).attr("data-quantity",defQ + 1);
        $(this).parent().find(".current-quantity").text(defQ + 1);
        $(".main-header .cart span").text(defQ + 1);
        if($(".mini-cart .mc-content .cart-item").length == 1) {
          let quant = $(".mini-cart .mc-content .cart-item").attr("data-quantity");
          $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>"+quant+"</em> items)");
          let finalPrice = $(".mini-cart .mc-content .cart-item").attr("data-price") * quant;
          $(".mini-cart .cart-info .ci-cost").html(Shopify.formatMoney(finalPrice));
        }
        else {
          let finalQuantity = 0;
          let finalPrice = 0;
          $(".mini-cart .mc-content .cart-item").each(function(){
            finalQuantity += Number($(this).attr("data-quantity"));
            finalPrice += Number($(this).attr("data-price") * $(this).attr("data-quantity"));
          });
          if(finalQuantity > 1) {
            $(".mini-cart .cart-info .ci-title em").text(finalQuantity);
            $(".main-header .cart span").empty();
            $(".main-header .cart span").text(finalQuantity);
          }
          else {
            $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>1</em> item)");
            $(".main-header .cart span").empty();
            $(".mini-cart .cart-info .ci-title em").text("1");
          }
          $(".mini-cart .cart-info .ci-cost").text(Shopify.formatMoney(finalPrice));
        }
        mcTimerReset();
      }
      return false;
    });
    $(document).on("click", ".cart-item-actions .quant-selector .remove-item", function(){
      if(!$(this).hasClass("deselected")) {
        let id = "id";
        let quantity = "quantity";
        let currQuant = Number($(this).parent().parent().attr("data-quantity"))
        let data = {};
        data[id] = $(this).parent().parent().attr("data-product-id");
        data[quantity] = currQuant - 1;
        if($(this).parent().parent().attr("data-product-id") == "37169765810325" && window.p12subpackcount < 3) {
          window.p12subpackcount = window.p12subpackcount - 1;
        }
        if($(this).parent().parent().attr("data-product-id") == "35742724358293" && window.p12packcount < 3) {
          window.p12packcount = window.p12packcount - 1;
        }
        if (Number($(this).parent().parent().attr("data-quantity")) - 1 > 1) {
          $.ajax({
            url: "/cart/change.js",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
          });
          let defQ = Number($(this).parent().parent().attr("data-quantity"));
          $(this).parent().parent().attr("data-quantity",defQ - 1);
          $(".mini-cart .mc-content .cart-item."+$(this).parent().parent().attr("data-product-id")).attr("data-quantity",defQ - 1);
          $(this).parent().find(".current-quantity").text(defQ - 1);
          if($(".mini-cart .mc-content .cart-item").length == 1) {
            let quant = $(".mini-cart .mc-content .cart-item").attr("data-quantity");
            $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>"+quant+"</em> items)");
            let finalPrice = $(".mini-cart .mc-content .cart-item").attr("data-price") * quant;
            $(".mini-cart .cart-info .ci-cost").html(Shopify.formatMoney(finalPrice));
          }
          else {
            let finalQuantity = 0;
            let finalPrice = 0;
            $(".mini-cart .mc-content .cart-item").each(function(){
              finalQuantity += Number($(this).attr("data-quantity"));
              finalPrice += Number($(this).attr("data-price") * $(this).attr("data-quantity"));
            });
            if(finalQuantity > 1) {
              $(".mini-cart .cart-info .ci-title em").text(finalQuantity);
              $(".main-header .cart span").empty();
              $(".main-header .cart span").text(finalQuantity);
            }
            else {
              $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>1</em> item)");
              $(".main-header .cart span").text("1");
            }
            $(".mini-cart .cart-info .ci-cost").text(Shopify.formatMoney(finalPrice));
          }
        }  
        else {
          data[quantity] = 1;
          $.ajax({
            url: "/cart/change.js",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
          });
          $(this).addClass("deselected");
          $(this).parent().parent().attr("data-quantity","1");
          $(".mini-cart .mc-content .cart-item."+$(this).parent().parent().attr("data-product-id")).attr("data-quantity","1");
          $(this).parent().find(".current-quantity").text("1");
          $(".main-header .cart span").text("1");
          if($(".mini-cart .mc-content .cart-item").length == 1) {
            let quant = $(".mini-cart .mc-content .cart-item").attr("data-quantity");
            $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>"+quant+"</em> items)");
            let finalPrice = $(".mini-cart .mc-content .cart-item").attr("data-price") * quant;
            $(".mini-cart .cart-info .ci-cost").html(Shopify.formatMoney(finalPrice));
          }
          else {
            let finalQuantity = 0;
            let finalPrice = 0;
            $(".mini-cart .mc-content .cart-item").each(function(){
              finalQuantity += Number($(this).attr("data-quantity"));
              finalPrice += Number($(this).attr("data-price") * $(this).attr("data-quantity"));
            });
            if(finalQuantity > 1) {
              $(".main-header .cart span").empty();
              $(".mini-cart .cart-info .ci-title em").text(finalQuantity);
              $(".main-header .cart span").text(finalQuantity);
            }
            else {
              $(".main-header .cart span").empty();
              $(".main-header .cart span").text("1");
              $(".mini-cart .cart-info .ci-title em").text("1");
              $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>1</em> item)");
            }
            $(".mini-cart .cart-info .ci-cost").text(Shopify.formatMoney(finalPrice));
          }
        }
      }
      mcTimerReset();
      return false;
    });

    $(document).on("click", function(event){
      if($(".mini-cart").hasClass("active") && $("body").hasClass("opaque")) {
        if(!$(event.target).closest(".mini-cart").length){
          $(".main-header .cart").empty();
          $('.mini-cart .mc-content').empty();
          $('.mini-cart, .mini-cart .mc-actions').removeClass("active");
          $('body, .content-wrapper').removeClass("opaque");
          clearTimeout(g_timer);
        } 
      }
    });
    $(document).on("click", "#cartUpdate", function(e){
      $(".cart-line-item .product-quant").each(function(){
        if($(".qInputField",this).length > 0) {
          let cq = Number($(".qInputField",this));
          let maxq = Number($(".qInputField",this).attr("data-maxq"));
          let pname = $(".qInputField",this).attr("data-product");
          if(cq > maxq) {
          	 $("#cart-form").submit(function(e){
              e.preventDefault();
            });
            return false;
            alert("If you want to purchase "+maxq+"+"+pname+", please contact us at info@futuremethod.com");
          }
        }
      });
      
    });
    $(document).on("click", ".cart-item-actions .delete-item", function(){
      // Shopify.removeItem(id);
      let id = "id";
      let quantity = "quantity";
      let data = {};
      data[id] = $(this).parent().attr("data-product-id");
      data[quantity] = 0;
      $.ajax({
        url: "/cart/change.js",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
      });
      if($(this).parent().attr("data-product-id") == "37169765810325") {
        window.p12subpackcount = 0;
      }
      else if($(this).parent().attr("data-product-id") == "35742724358293") {
        window.p12packcount = 0;
      }
      $(".mini-cart .mc-content .cart-item."+$(this).parent().attr("data-product-id")).remove();
      if($(".mini-cart .mc-content .cart-item").length == 1) {
        let quant = $(".mini-cart .mc-content .cart-item").attr("data-quantity");
        if(quant == 1) {
          $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>1</em> item)");
          let finalPrice = $(".mini-cart .mc-content .cart-item").attr("data-price");
          $(".mini-cart .cart-info .ci-cost").html(Shopify.formatMoney(finalPrice));
          $(".main-header .cart").empty();
          $(".main-header .cart").append("<span>1</span>");
        }
        else {
          $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>"+quant+"</em> items)");
          let finalPrice = $(".mini-cart .mc-content .cart-item").attr("data-price") * quant;
          $(".mini-cart .cart-info .ci-cost").html(Shopify.formatMoney(finalPrice));
          $(".main-header .cart").empty();
          $(".main-header .cart").append("<span>"+quant+"</span>");
        }
      }
      else if($(".mini-cart .mc-content .cart-item").length == 0){
        $(".main-header .cart").empty();
        $('.mini-cart .mc-content').empty();
        $('.mini-cart, .mini-cart .mc-actions').removeClass("active");
        $('body, .content-wrapper').removeClass("opaque");
        clearTimeout(g_timer);
        //$(".mini-cart .mc-content .cart-item."+$(this).parent().attr("data-product-id")).remove();
      }
      else {
        window.price = [];
        window.quantity = [];
        let finalQuantity = 0;
        let finalPrice = 0;
        $(".mini-cart .mc-content .cart-item").each(function(){
          finalQuantity += Number($(this).attr("data-quantity"));
          finalPrice += Number($(this).attr("data-price") * $(this).attr("data-quantity"));
        });
        if(finalQuantity > 1) {
          $(".mini-cart .cart-info .ci-title em").text(finalQuantity);
          $(".main-header .cart").empty();
          $(".main-header .cart").append("<span>"+finalQuantity+"</span>");
        }
        else {
          $(".mini-cart .cart-info .ci-title").html("Subtotal (<em>1</em> item)");
          $(".main-header .cart").empty();
          $(".main-header .cart").append("<span>1</span>");
        }
        $(".mini-cart .cart-info .ci-cost").text(Shopify.formatMoney(finalPrice));
      }
      mcTimerReset();
      return false;
    });
    //stian
    
    function addSIC(item) {
      $.ajax({
        type: 'POST', 
        url: '/cart/add.js',
        dataType: 'json', 
        data: item,
        success: addToCartOk,
        error: addToCartFail
      });
    }
    /* add upsell to cart */
    $(".uwg-entry form, #add-to-cart").submit(function(e){
        e.preventDefault();
    });
    $(document).on("click", ".uwg-entry .ups-image a", function(){
      if($(this).attr("href") == "#") {
        return false;
      }
    });
    $(document).on("click", ".uwg-entry .up-add-to-cart", function(){
      let cartItem = $(this).parent().serialize();
      var cpid = Number($(this).parent().find(".up_pid").val());
      var cpml = Number($(this).parent().find(".maxlimit").val());
      $.getJSON('/cart.js', function(cart) {  
        if(cart.items.length > 0) {
          //console.log("!!! There are items in the cart: "+cart.items.length);
          for( x in cart.items ){       
            let pmax = Number(cart.items[x].quantity);
            let pId = Number(cart.items[x].id);
            if(cpid == pId && cpml == pmax) {
              alert("To purchase "+cpml+"+ items, please email info@futuremethod.com");
              break;
            }
            else {
              addSIC(cartItem);
              break;
            }
          }
        }
        else {
          addSIC(cartItem);
        }
      });
      return false;
    });
    
    $(document).on("click", ".add-pack-to-cart a", function(){
      let cartItem = $('#add-to-cart').serialize();
      //console.log(cartItem);
      var params = cartItem.split('&').reduce(function(results, keyValue){
        //split the key value pair by the =
        var [key, value] = keyValue.split('=');

        //if the key already exists, we need to convert the value to an array, and then push to the array
        if (results[key]) {
          if (typeof results[key] === 'string') {
            results[key] = [ results[key] ];
          }

          results[key].push(value);
        } else {
          //key did not exist, just set it as a string
          results[key] = value;
        }

        //return the results for the next iteration
        return results;
      }, {});
      var cpid = Number(params["id"]);
      var cpml = Number(params["max_limit"]);

      $.getJSON('/cart.js', function(cart) {  
        if(cart.items.length > 0) {
          for( x in cart.items ){       
            let pCant = Number(cart.items[x].quantity);
            let pId = Number(cart.items[x].id);
            if(cpid == pId && cpml == pCant) {
              alert("To purchase "+cpml+"+ items, please email info@futuremethod.com");
              break;
            }
            else {
              addSIC(cartItem);
              break;
            }
          }
        }
        else {
          addSIC(cartItem);
        }
      });
      return false;
    });
    $(document).on("click", ".read-reviews a", function(){
      let target = $(this).attr("href");
      let correction = -40;
      $('html,body').animate({scrollTop: ($(target).offset().top+correction)}, 1000);
      return false;
    });
    $(document).on("click", ".mini-cart .close", function(){
      $('.mini-cart .mc-content').empty();
      $('.mini-cart, .mini-cart .mc-actions').removeClass("active");
      $('body, .content-wrapper').removeClass("opaque");
      clearTimeout(g_timer);
      return false;
    });
    if($(".pb-carousel.owl-carousel").length > 0) {
      $(".pb-carousel.owl-carousel").owlCarousel({
        loop: false,
        margin: 32,
        nav: false,
        dots: false,
        smartSpeed: 800,
        responsive:{
          0:{
            stagePadding: 48,
            items: 1,
            margin: 16,
            autoWidth: false          
          },
          1024:{
            loop: true,
            items: 3,
            autoWidth: false 
          }
        },
        onInitialized: setClassOI,
        onDragged: setClass,
        onDrag: setClass,
        onChanged: setClass
      });
      function setClassOI(event){
      };
      function setClass(event){
        let idx = event.item.index;
        $('.pb-carousel .owl-item').eq(idx).removeClass('peak-through').removeClass('right').removeClass('left');
        $('.pb-carousel .owl-item').eq(idx+1).addClass('peak-through right');
        $('.pb-carousel .owl-item').eq(idx-1).addClass('peak-through left');
      };

    }

    if ($(".sproduct-left").length > 0) {
      // $(".sproduct-left .product-images").owlCarousel({
      //   stagePadding: 64,
      //   loop: true,
      //   margin: 10,
      //   nav: true,
      //   dots: true,
      //   responsive:{
      //     0:{
      //         items:1
      //     }
      //   },
      //   onInitialized: setClass,
      //   onDragged: setClass,
      //   onDrag: setClass,
      //   onChanged: setClass
      // });
      // function setClass(event){
      //   idx = event.item.index;
      //   $('.owl-item.peak-through').removeClass('peak-through');
      //   $('.owl-item').eq(idx+1).addClass('peak-through');
      // };
      if ($(".sproduct-left.carousel-w-thumbs").length > 0) {
        $(".sproduct-left .product-images").owlCarousel({
          loop: true,
          margin: 0,
          nav: true,
          dots: true,
          smartSpeed: 800,
          dotsData: true,
          responsive:{
            0:{
                items:1
            }
          }
        });
      }
      else {
        if ($(".sproduct-left .product-images").hasClass("autoplay")) {
          $(".sproduct-left .product-images").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            smartSpeed: 800,
            responsive:{
              0:{
                  items:1
              }
            }
          });
        }
        else {
          $(".sproduct-left .product-images").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            smartSpeed: 800,
            responsive:{
              0:{
                  items:1
              }
            }
          });

        }
      }
    }
    if ($(".fe-nav").length > 0) {
      // blog nav
      $(".fe-nav").owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: false,
        smartSpeed: 800,
        responsive:{
          0:{
            stagePadding: 104,
            items: 1,
            autoWidth: false,
            startPosition: 'URLHash'
          },
          1024:{
            loop: false,
            items: 4,
            autoWidth: true
          }
        },
        onInitialized: setClassOI,
        onDragged: setClass,
        onDrag: setClass,
        onChanged: setClass
      });
      function setClassOI(event){
      };
      function setClass(event){
        let idx = event.item.index;
        $('.fe-nav .owl-item').eq(idx).removeClass('peak-through').removeClass('right').removeClass('left');
        $('.fe-nav .owl-item').eq(idx+1).addClass('peak-through right');
        $('.fe-nav .owl-item').eq(idx-1).addClass('peak-through left');
      };
    }
    
    if($(".tc-entry .testimonials").length > 0 || $(".silver-section .testimonials").length > 0) {
      $(".testimonials").owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        responsive:{
          0:{
              items:1
          }
        }
      });
    }

    if($(".article-content .ac-copy").length > 0 && $(".article-content .ac-copy h6").length > 0) {
      if($(".article-content .ac-copy h6").text() == "GET IN ON THE ACTION") {
        $(".article-content .ac-copy h6").wrap("<div class='caller'></div>");
        $(".article-content .ac-copy h6").remove();
        $("#shopify-section-article-ga").clone().appendTo(".article-content .ac-copy .caller");
      }
    }

    //$(".main-header .main-nav .mn-item .mn-title, .main-header .main-nav .mn-item .mn-subitem").hover(
    $(".main-header .main-nav .mn-item.w-hover .mn-title, .main-header .main-nav .mn-item.w-hover .mn-subitem").hover(
      function () {
        if(!$(".mini-cart").hasClass("active")) {
          $(".content-wrapper").addClass("opaque");
        }
      },
      function () {
        if(!$(".mini-cart").hasClass("active")) {
          $(".content-wrapper").removeClass("opaque");
        }
      }
    );
    
    $(document).on("click", ".account-wrapper .address-edit-toggle", function(){
      let fid = $(this).attr("data-form-id");
      $("#EditAddress_"+fid).toggleClass("hide");
      return false;
    });
    $(document).on("click", ".account-wrapper .address-new-toggle", function(){
      $("#AddressNewForm").toggleClass("hide");
      return false;
    });
    $(document).on("click", ".customer-login-wrapper .recover-user-pass #RecoverPassword, #HideRecoverPasswordLink", function(){
      $("#CustomerLoginForm, #RecoverPasswordForm").toggleClass("hide");
      return false;
    });
    if($(".small-wrapper.login-wrapper").length > 0) {
      let $formState = $(".small-wrapper.login-wrapper .reset-password-success");      
      // if (!$formState.length) return;
      // $('#ResetSuccess').removeClass('hide');
    }

    document.querySelectorAll('.address-delete-form').forEach((deleteForm) => {
      deleteForm.addEventListener('submit', (event) => {
          const confirmMessage = event.target.getAttribute('data-confirm-message');

          if (!window.confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
              event.preventDefault();
          }
      });
    });

    $(document).on("click", ".main-header .main-nav .pr-col-row, .main-header .mn-title, .blog-wrapper .blog-entry.wlink, .fel-entries .entry", function(){
      var url = $(this).attr("data-url");
      if (typeof url !== typeof undefined && url !== false) {
        window.location.href = url;
      }
      return false;
    });
    $(document).on("click", ".main-header .main-nav .lr-cell .click-trigger", function(){
      var url = $(this).attr("data-url");
      if($(".template-faq").length > 0) {
        let target = "#"+url.split("#").pop();
        console.log("hash detected!");
        var correction = -164;  
        $('html,body').animate({scrollTop: ($(target).offset().top+correction)}, 1000);
        $(target).addClass("active");
      }
      else {
        window.location.href = url;
      }
      
      return false;
    });
    $(document).on("click", ".mobile-nav .mn-section .product-item", function(){
      var url = $(this).attr("data-url");
      window.location.href = url;
      return false;
    });

    $(".main-header").append("<p class='mobile-nav-trigger'>Toggle mobile nav</p>");
    $(document).on("click", ".main-header .mobile-nav-trigger", function(){
      $("body").toggleClass("mobile-nav-open opaque");
      $('.content-wrapper').toggleClass("opaque");
    });

    if($(".main-header .product-row.shop-nav .pr-col").length <= 2) {
      $(".main-header .product-row.shop-nav .pr-col").each(function(){
        $(this).addClass("right-thumb");
      });
    }
    else if($(".main-header .product-row.shop-nav .pr-col").length > 3) {
      $(".main-header .product-row.shop-nav .pr-col").each(function(){
        $(this).addClass("five-col");
      });
    }
    if($(".mobile-nav .mn-section .product-item").length > 7) {
      $(".mobile-nav .mn-section .product-item").each(function(index){
        if(index != 0) {
          $(".pi-thumb",this).remove();
        }
      })
    }

    if($(".prlx-wrapper").length > 0) {
      let imgH = Math.round($(".prlx-wrapper .pw-actor img").height()/2);
      //$(".prlx-wrapper .pw-actor").css("top","-"+imgH+"px").addClass("active");
      //$(".prlx-wrapper .pw-actor").addClass("active");
    }
    if($(".lr-animation-block").length > 0) {
      AOS.init();
    }
    function cscroll() {
      
      $(window).bind('scroll', function() {
        let stv = $(window).scrollTop();
        if($("body").hasClass("templateindex") || $("body").hasClass("templatepage")){
          let ch = $(".content-wrapper").height() - $(".main-footer").outerHeight(true) - 64;
          if($("#shopify-section-home-hero-carousel")) {
            let sh = $("#shopify-section-home-hero-carousel").height() - $("#shopify-section-home-hero-carousel").height()/2;
            if(stv > sh) {
              $(".hp-buy-btn").removeAttr("style");
            }
            else {
             $(".hp-buy-btn").css("display","none");
            }
          }
          if(stv > ch) {
            $("body").addClass("no-more-cta-btn");
          }
          else {
            $("body").removeClass("no-more-cta-btn");
          }
        }
        // hide announcement bar
        // if($(".announcement-bar").is(':visible')) {
        //   let abh = $(".announcement-bar").outerHeight(true);;
        //   if (stv > 24) {
        //     $(".main-header").css("top","0").addClass("make-small");
        //     $(".mobile-nav").css("top",$(".main-header").outerHeight(true));
        //     $(".mobile-nav").css("height","calc(90vh - "+$(".main-header").outerHeight(true)+"px)");
        //   }
        //   else {
        //     $(".main-header").css("top",abh).removeClass("make-small");
        //     if($(".announcement-bar").length > 0) {
        //       let fv = $(".main-header").outerHeight(true)+$(".announcement-bar").outerHeight(true)
        //       $(".mobile-nav").css("top",+fv);
        //       $(".mobile-nav").css("height","calc(90vh - "+fv+"px)");
        //     }
        //     else {
        //       $(".mobile-nav").css("top",$(".main-header").outerHeight(true));
        //       $(".mobile-nav").css("height","calc(90vh - "+$(".main-header").outerHeight(true)+"px)");
        //     }
        //   }
        // }
        if($('.prlx-wrapper').length > 0) {
          if(stv > 40) {
            $(".prlx-wrapper .pw-actor").addClass("active");
          }
          if($('.prlx-wrapper').visible( true, true )) {
            let initY = $('.prlx-wrapper').outerHeight(true) - 84;
            let ph = stv - $('.prlx-wrapper .pw-actor').outerHeight(true);
            if(ph < initY) {
              //$(".prlx-wrapper .pw-actor").css('transform:', +parseInt(ph)+'px');
              $(".prlx-wrapper .pw-actor").css({"transform": "translate3d(0px, "+parseInt(ph)+"px, 0px)"});
            }
          }
        }
        
        if($(".add-pack-to-cart").length > 0) {
          //let nwsltp = $(".newsletter-wrapper").offset().top - $(".newsletter-wrapper").outerHeight(true) - $(".main-header").outerHeight(true) - $(".main-footer").outerHeight(true);
          if($(".reviews-wrapper").length) {
            var nwsltp = $(".reviews-wrapper").offset().top;
          }
          else {
            var nwsltp = 0;
          }
          let buybtnH = $(".add-pack-to-cart").outerHeight(true) + 24;
          let buybtn = $(".add-pack-to-cart").offset().top;
          let fv = buybtnH + buybtn;
          if($(".product-pack-selector").length){
            var bb = $(".product-pack-selector").offset().top + $(".product-pack-selector").outerHeight(true) + 54;
          }
          else if ($(".sproduct.alt .product-dp").length) {
            var bb = $(".sproduct.alt .product-dp").offset().top + $(".sproduct.alt .product-dp").outerHeight(true) + 54;
          }
          else {
            var bb = 200;
          }
          if (stv > bb) {
            $("body").addClass("fixed-buy-btn");
            if(stv > nwsltp) {
              $("body").addClass("hide-cta");
            }
            else {
              $("body").removeClass("hide-cta");
            }
          } 
          else {
            $("body").removeClass("fixed-buy-btn");
            if(stv > nwsltp) {
              $("body").addClass("hide-cta");
            }
            else {
              $("body").removeClass("hide-cta");
            }
          }
        }
        if($(".prlx-wrapper").length > 0) {
          let prlxT = $(".prlx-wrapper").offset().top;
        }

        if ($(".announcement-bar").length > 0) {
          if($(".announcement-bar").visible( false, true ) && $(".main-header").visible( false, true )) {
            let mcst = ($(".announcement-bar").outerHeight(true) + $(".main-header").outerHeight(true)) - stv;
            if(mcst > 0) {
              $(".mini-cart").css("top",mcst);
              // $(".mobile-nav").css("top",mcst);
              // $(".mobile-nav").css("height","calc(90vh - "+mcst+"px)");
            }
          }
          else {
            let mcst = $(".announcement-bar").outerHeight(true) + $(".main-header").outerHeight(true);
            if(stv < mcst) {
              let mcstf = mcst - stv;
              $(".mini-cart").css("top",mcstf);
              // $(".mobile-nav").css("top",mcstf);
              // $(".mobile-nav").css("height","calc(90vh - "+mcstf+"px)");
            }
            else {
              if($(".main-header").hasClass("make-small")) {
                $(".mini-cart").css("top",$(".main-header").outerHeight(true));
                // $(".mobile-nav").css("top",$(".main-header").outerHeight(true));
                // let mvh = $(window).height() - $(".main-header").outerHeight(true);
                // $(".mobile-nav").css("height",mvh);
              }
            }
          }
          let abh = $(".announcement-bar").outerHeight(true);
          let dtp = $(".main-header").height();
          $(".content-wrapper").css("padding-top",dtp+abh);
        }
        else {
          $(".content-wrapper").css("padding-top",$(".main-header").outerHeight(true));
          if($(".main-header").visible( false, true )) {
            let mcst = $(".main-header").outerHeight(true) - stv;
            if(mcst > 0) {
              $(".mini-cart").css("top",mcst);
              $(".mobile-nav").css("top",mcst);
              $(".mobile-nav").css("height","calc(90vh - "+mcst+"px)");
            }
          }
          else {
            let mcst = $(".main-header").outerHeight(true);
            if(stv < mcst) {
              let mcstf = mcst - stv;
              $(".mini-cart").css("top",mcstf);
              $(".mobile-nav").css("top",mcstf);
              $(".mobile-nav").css("height","calc(90vh - "+mcstf+"px)");
            }
            else {
              if($(".main-header").hasClass("make-small")) {
                $(".mini-cart").css("top",$(".main-header").outerHeight(true));
                $(".mobile-nav").css("top",$(".main-header").outerHeight(true));
                let mvh = $(window).height() - $(".main-header").outerHeight(true);
                $(".mobile-nav").css("height",mvh);
              }
            }
          }
        }
      });
    }

    equalheight = function(container){
      var currentTallest = 0,
           currentRowStart = 0,
           rowDivs = new Array(),
           $el,
           topPosition = 0;
       $(container).each(function() {

         $el = $(this);
         $($el).height('auto')
         topPostion = $el.position().top;

         if (currentRowStart != topPostion) {
           for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
             rowDivs[currentDiv].height(currentTallest);
           }
           rowDivs.length = 0;
           currentRowStart = topPostion;
           currentTallest = $el.height();
           rowDivs.push($el);
         } else {
           rowDivs.push($el);
           currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
           rowDivs[currentDiv].height(currentTallest);
         }
       });
    }

    if($(".announcement-carousel").length > 0) {
      $(".announcement-carousel").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 1000,
        responsive:{
          0: {
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 9800,
            autoplayHoverPause: true
          }
        }
      });
    }

    if($(".in-the-news .itn-content").length > 0) {
      $(".in-the-news .itn-content.owl-carousel.standard").addClass("nocrsl");
    }
    if($(".in-the-news.itn-2").length > 0 && !$(".in-the-news.itn-2").hasClass("extra-details")) {
      $(".in-the-news.itn-2 .itn-content").owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        smartSpeed: 1000,
        onInitialized: setClass,
        onDragged: setClass,
        onDrag: setClass,
        onChanged: setClass,
        responsive:{
          0: {
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true
          },
          1024: {
            items: 4
          }
        }
      });
      function setClass(event){
        let idx = event.item.index;
        $('.in-the-news .itn-content .owl-item').eq(idx).removeClass('visible-quote');
        $('.in-the-news .itn-content .owl-item').eq(idx).addClass('visible-quote');
        let aquote = $('.in-the-news.itn-2 .itn-content .owl-item .itnc-entry').eq(idx).attr("data-quote");
        $(".itn-content-copy .itncc-entry").removeClass("active");
        $(".itn-content-copy").find("#"+aquote).addClass("active");
      };
    }


    if($(".in-the-news.itn-2.extra-details").length > 0) {
      $(".in-the-news.itn-2.extra-details .itn-content").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        smartSpeed: 1000,
        onInitialized: setClass,
        onDragged: setClass,
        onDrag: setClass,
        onChanged: setClass,
        responsive:{
          0: {
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true
          },
          1024: {
            items: 4
          }
        }
      });
      function setClass(event){
        let idx = event.item.index;
        $('.in-the-news .itn-content .owl-item').eq(idx).removeClass('visible-quote');
        $('.in-the-news .itn-content .owl-item').eq(idx).addClass('visible-quote');
        let aquote = $('.in-the-news.itn-2.extra-details .itn-content .owl-item .itnc-entry').eq(idx).attr("data-quote");
        $(".itn-content-copy .itncc-entry").removeClass("active");
        $(".itn-content-copy").find("#"+aquote).addClass("active");
      };
    }
    /*
    if($("#butt-body-scrub-exfoliating-booty-scrub-future-method").length > 0) {
      window.setTimeout(function() {
        $(".pos-frequency-select .option.one-time").trigger("click");
      }, 800);
    }
    */

    $(document).on("click",".in-the-news.itn-2 .itn-content .itnc-entry", function(){
      let aquote = $(this).attr("data-quote");
      $(".itn-content-copy .itncc-entry").removeClass("active");
      $(".itn-content-copy").find("#"+aquote).addClass("active");
      $(".in-the-news.itn-2 .owl-item").removeClass("visible-quote");
      $(this).parent().addClass("visible-quote");
    });

    function setCLH() {
      var ww = jQuery(window).width();
      if (ww > 740 && $(".shopify-section.blog-wrapper").length > 0) {
        //equalheight('.shopify-section.blog-wrapper .blog-entry .be-copy');
      }
      if (ww > 1190 && $(".sproduct-left").length > 0) {
        let pih = $(".sproduct-left").height();
        $(".sproduct-left .pc-img-entry").each(function(){
          $(this).css("height","0");
          $(this).css("height",pih);
        })
      }
      if (ww <= 1190 && $(".sproduct-left").length > 0) {
        let pih = $(".sproduct-left").height() + 32;
        $(".sproduct-left .pc-img-entry").each(function(){
          $(this).css("height","");
          // $(this).css("height",pih);
        })
      };
      if(ww < 480 && $("#shopify-section-home-hero-carousel")) {
        $(".hp-buy-btn").css("display","none");
      }

      if($(".announcement-bar").is(':visible')) {
        let abh = $(".announcement-bar").outerHeight(true);
        let dtp = $(".main-header").height();
        if($(".announcement-bar").visible( false, true )) {
          $(".main-header").css("top",abh);
        } 
        $(".content-wrapper").css("padding-top",dtp+abh);
      }
      else {
        let dtp = $(".main-header").height();
        $(".content-wrapper").css("padding-top",dtp);
      }
      if(ww < 1024 && $(".in-the-news .itn-content").length > 0) {
        $(".in-the-news .itn-content").removeClass("nocrsl");
        $(".in-the-news .itn-content").owlCarousel({
          stagePadding: 54,
          loop: true,
          nav: false,
          dots: false,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          items: 1,
          onInitialized: setClass,
          onDragged: setClass,
          onDrag: setClass,
          onChanged: setClass
        });
        function setClass(event){
          let idx = event.item.index;
          $('.in-the-news .itn-content .owl-item').eq(idx).removeClass('peak-through').removeClass('right').removeClass('left');
          $('.in-the-news .itn-content .owl-item').eq(idx+1).addClass('peak-through right');
          $('.in-the-news .itn-content .owl-item').eq(idx-1).addClass('peak-through left');
        };
      }
      if(ww < 841 && $(".pci-wrapper.scrub-details.dilator").length > 0) {
        $(".pci-wrapper.scrub-details.dilator .container .sbb-nav").empty();
        $(".pci-wrapper.scrub-details.dilator .container .sb-block").addClass("hidden");
        $(".pci-wrapper.scrub-details.dilator .container .sb-block:first").removeClass("hidden");
        let ccount = 0;
        $(".pci-wrapper.scrub-details.dilator .container .sb-block").each(function(){
          $(this).attr("id","sbb-block-"+ccount);
          $(".pci-wrapper.scrub-details.dilator .container .sbb-nav").append("<a href='#sbb-block-"+ccount+"'>"+ccount+"</a>");
          ccount++;
        });
        $(".pci-wrapper.scrub-details.dilator .container .sbb-nav a:first").addClass("active");
      }
      if(ww < 841 && $(".product-w-image-details").length > 0) {
        $(".product-w-image-details .sbb-nav").empty();
        $(".product-w-image-details .sb-block").addClass("hidden");
        $(".product-w-image-details .sb-block:first").removeClass("hidden");
        let ccount = 0;
        $(".product-w-image-details .sb-block").each(function(){
          $(this).attr("id","sbb-block-"+ccount);
          $(".product-w-image-details .sbb-nav").append("<a href='#sbb-block-"+ccount+"'>"+ccount+"</a>");
          ccount++;
        });
        $(".product-w-image-details .sbb-nav a:first").addClass("active");
      }
    }

    $(document).on("click",".sbb-nav a",function(){
      let target = $(this).attr("href");
      $(".sbb-nav a").removeClass("active");
      $(".sb-block").addClass("hidden");
      $(this).addClass("active");
      $(target).removeClass("hidden"); 
      return false;
    })

    $(window).on('resize',function() {
      setCLH();
      cscroll();
    }).trigger('resize');

    $("body").addClass("loaded-content");

    if($(".subscription-frequency.visible").length > 0) {
      let defsubf = $(".subscription-frequency.visible .pos-pack-delivery .active").text();
      $(".subscription-frequency.visible").append('<p class="subscription-frequency-value"><strong>'+defsubf+'</strong> (tap above for options)</p>')
    }
    $(document).on("click",".subscription-frequency.visible h5", function(){
      $(this).parent().toggleClass("visible-options");
    })
  })($);
}
