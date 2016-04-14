$(document).ready(function() {
  // Initialize datetimepickers.
  $('#datetimepicker-beginning').datetimepicker();
  $('#datetimepicker-end').datetimepicker({
    useCurrent: false
  });

  // Link the two datetimepickers together to ensure that no illegal
  // date ranges can be selected.
  $('#datetimepicker-beginning').on('dp.change', function(e) {
    $('#datetimepicker-end').data('DateTimePicker').minDate(e.date);
  });
  $('#datetimepicker-end').on('dp.change', function(e) {
    $('#datetimepicker-beginning').data('DateTimePicker').maxDate(e.date);
  });

  // Remove filter that the clicked remove button is associated with.
  $('.remove-filter').click(function() {
    $(this).parent().toggle();
  });

  // Setup click events for dropdown menu items.
  $('#num-results-menu').click(function() {
    $('#num-results-control').toggle();
  });

  $('#video-type-menu').click(function() {
    $('#video-type-control').toggle();
  });

  $('#result-order-menu').click(function() {
    $('#result-order-control').toggle();
  });

  $('#upload-date-menu').click(function() {
    $('#upload-date-control').toggle();
  });

  $('#safe-search-menu').click(function() {
    $('#safe-search-control').toggle();
  });

  $('#captions-menu').click(function() {
    $('#captions-control').toggle();
  });

  $('#category-menu').click(function() {
    $('#category-control').toggle();
  });

  $('#definition-menu').click(function() {
    $('#definition-control').toggle();
  });

  $('#dimension-menu').click(function() {
    $('#dimension-control').toggle();
  });

  $('#duration-menu').click(function() {
    $('#duration-control').toggle();
  });

  // Disable generate button until a search query is entered.
  $('#video-query').on('keyup', function() {
    if ($('#video-query').val().length > 0) {
      $('#generate-button').prop('disabled', false);
    } else {
      $('#generate-button').prop('disabled', true);
    }
  });
});
