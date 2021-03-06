window.onload = function() {
  (function($){
    var songToPlay = document.getElementsByTagName("audio")[0];
    var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = $('#minutes');
      this.secondsDom = $('#seconds');
      this.fillerDom = $('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      $('#work').click(function(){
        self.startWork.apply(self);
      });
      $('#shortBreak').click(function(){
        self.startShortBreak.apply(self);
      });
      $('#longBreak').click(function(){
        self.startLongBreak.apply(self);
      });
      $('#stop').click(function(){
        self.stopTimer.apply(self);
      });
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.text(this.toDoubleDigit(this.minutes));
      this.secondsDom.text(this.toDoubleDigit(this.seconds));
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.css('height', this.fillerHeight + 'px');
      songToPlay.currentTime = 0;
      songToPlay.pause();
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
      songToPlay.currentTime = 0;
      songToPlay.play();
    }
};
$(document).ready(function(){
  pomodoro.init();
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
