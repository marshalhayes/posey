var modal = document.getElementById('usernameModal');
var btn = document.getElementById('playbutton');
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display ="block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if(event.target == model) {
    model.style.display = "none";
  }
}
