function check() {
  var type = document.getElementsByName('mailType');
  var selection = "none";
  for(var i = 0; i < type.length; i++) {
    if (type[i].checked) {
      selection = type[i].value;
      break;
    }
  }
  document.getElementById('selection').value = selection;
  document.getElementById('test').innerHTML = document.getElementById('selection').value;
}
