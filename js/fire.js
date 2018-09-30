var d = firebase.database();

document.getElementById("firebase-form").addEventListener('submit', function() {
  let user = document.getElementById("userName").value;
  let data = {
    "name": user,
    "score": 30
  }
  d.ref('users/' + user).set(data);
});
