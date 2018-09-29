let hours = 0;
let mins = 0;
let seconds = 0;
let misses = 3;

$(document).ready(function() {
  startTimer();
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
    }
    if (mins > 59) {
      mins = 0;
    }

    if (mins < 10) {
      $("#mins").text('0' + mins + ':');
    } else {
      $("#mins").text(mins + ':');
    }

    if (seconds < 10) {
      $("#seconds").text('0' + seconds);
    } else {
      $("#seconds").text(seconds);
    }

    startTimer();

    if (seconds == 5 && misses > 0) {
      seconds = -1;
      misses--;
      if (misses == 0) {
        window.location.href = 'gameOver.html';
      }
        
      if(misses == 2){
        $("#lifeOne").addClass("dead"); 
      }
      if(misses == 1){
        $("#lifeTwo").addClass("dead"); 
      }        
    }
  }, 1000)
}
