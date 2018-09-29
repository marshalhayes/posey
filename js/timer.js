var hours =0;
var mins =0;
var seconds =0;
var misses = 3;

$( document ).ready(function(){
      startTimer();
      /*
      while(true) {
        if(seconds == 5) {
          misses--;
          console.log(misses);
          break;
        }
      }
      */
      //else if match, increment point and reset timer

});

$('#stop').click(function() {
  clearTimeout(timex);
});

$('#reset').click(function() {
  hours = 0;
  mins = 0;
  seconds = 0;
  $('#hours', '#mins').html('00:');
  $('#seconds').html('00');
});

function startTimer() {
  timex = setTimeout(function() {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      mins++;
      if (mins > 59) {
        mins = 0;
        hours++;
        if (hours < 10) {
          $("#hours").text('0' + hours + ':')
        } else $("#hours").text(hours + ':');
      }


      startTimer();

      if(seconds == 5 && misses > 0){
        seconds = -1;
        misses--;
        if(misses == 0) {
          window.location.href = 'gameOver.html';
        }
      }
  , 1000);

}
