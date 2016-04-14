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

  // Remove filter that the clicked remove button is associated with,
  // and re-enable the dropdown menu item for that filter.
  $('.remove-filter').click(function() {
    $(this).parent().toggle();
    var parentId = $(this).parent().attr('id');
    var dropdownId = '#' + parentId.replace('control', 'menu');
    $(dropdownId).removeClass('disabled');
    $(dropdownId).removeClass('not-active');
    $(dropdownId).prop('disabled', false);
  });

  // Disable the dropdown menu item for the selected filter, and toggle
  // the visibility of the filter div to show the filter.
  $('.filter-menu-item').click(function() {
    $(this).prop('disabled', true);
    $(this).addClass('disabled');
    $(this).addClass('not-active');
    var itemId = $(this).attr('id');
    var controlId = '#' + itemId.replace('menu', 'control');
    $(controlId).toggle();
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
