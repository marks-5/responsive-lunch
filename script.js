

$(document).ready(function() {
  $('#tuesday').hide();
  $('#right-arrow').click(function() {
    $('#monday').hide();
    $('#tuesday').show();
  });
  $('#left-arrow').click(function() {
    $('#tuesday').hide();
    $('#monday').show();
  });
})