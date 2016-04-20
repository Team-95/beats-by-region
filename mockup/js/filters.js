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
    $(parentId).find('input').prop('disabled', true);
    $(parentId).find('select').prop('disabled', true);
    var dropdownId = '#' + parentId.replace('control', 'menu');
    $(dropdownId).removeClass('disabled');
    $(dropdownId).removeClass('not-active');
    $(dropdownId).prop('disabled', false);
    
    // If all filters are now disabled, disable the generate button.
    if ($('.filter-control:enabled').length == 0) {
      $('#generate-button').prop('disabled', true);
    }
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
    $(controlId).find('input').prop('disabled', false);
    $(controlId).find('select').prop('disabled', false);
    
    // Enable generate button.
    $('#generate-button').prop('disabled', false);
    
    // Check if enabled filter is a search query. If so, the generate button
    // needs to be disabled until text is entered.
    if ($(this).attr('id') == 'search-query-menu') {
      $('#generate-button').prop('disabled', true);
    }
  });

  // Disable generate button until text is entered into search box (if enabled).
  $('#search-query').on('keyup', function() {
    if ($('#search-query').val().length > 0) {
      $('#generate-button').prop('disabled', false);
    } else {
      $('#generate-button').prop('disabled', true);
    }
  });
});
