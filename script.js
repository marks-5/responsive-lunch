

$(document).ready(function() {
  $('#tuesday').hide();
  $('#next-day').click(function() {
    $('#monday').hide();
    $('#tuesday').show();
  });
  $('#previous-day').click(function() {
    $('#tuesday').hide();
    $('#monday').show();
  });
})