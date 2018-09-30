
let mins = 0;
let seconds = 11;
let misses = 3;

$(document).ready(function() {
  startTimer();
});

$('#stop').click(function() {
  clearTimeout(timex);
});

$('#reset').click(function() {
  seconds = 0;
  $('#seconds').html('00');
});

function startTimer() {
  timex = setTimeout(function() {
    seconds--;
    if (seconds < 10) {
      $("#seconds").text('0' + seconds);
    } else {
      $("#seconds").text(seconds);
    }

    startTimer();
     
      var audio = new Audio("./assets/beep-02.mp3"); 
      
      switch(seconds){
        case 5:
            $("#timer").addClass("dead");
            audio.play();
            break;
        case 4:
            $("#timer").removeClass("dead");
            audio.play();
            break;
        case 3:
            $("#timer").addClass("dead");
            audio.play();
            break;
        case 2:
            $("#timer").removeClass("dead");
            audio.play();
            break;
        case 1:
            $("#timer").addClass("dead");
            audio.play();
            break; 
        case 0:
            $("#timer").removeClass("dead");
            audio.play();
            break;               
        default:
            $("#seconds").removeClass("dead");  
      }       

    if (seconds == 0  && misses > 0) {
      seconds = 11 ;
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
  }, 1000);
}

