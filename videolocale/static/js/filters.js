$(document).ready(function() {
  // Initialize datetimepickers.
  $('#datetimepicker-beginning').datetimepicker({
    useCurrent: false
  });
  $('#datetimepicker-end').datetimepicker({
    useCurrent: false
  });
  
  // Set minimum datetime of beginning time picker to the date of the
  // first ever YouTube video (April 23, 2005).
  // https://youtube.com/watch?v=jNQXAC9IVRw
  $('#datetimepicker-beginning').data('DateTimePicker').minDate(new Date('April 23, 2005'));
  
  // Set maximum datetime of ending time picker to the current datetime.
  $('#datetimepicker-end').data('DateTimePicker').maxDate(new Date());
  

  // Link the two datetimepickers together to ensure that no illegal
  // date ranges can be selected.
  $('#datetimepicker-beginning').on('dp.change', function(e) {
    $('#datetimepicker-end').data('DateTimePicker').minDate(e.date);
    assessGenerateButton();
  });
  $('#datetimepicker-end').on('dp.change', function(e) {
    $('#datetimepicker-beginning').data('DateTimePicker').maxDate(e.date);
    assessGenerateButton();
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
    
    assessGenerateButton();
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
    
    assessGenerateButton();
  });

  // Disable generate button until text is entered into search box (if enabled).
  $('#search-query').on('keyup', function() {
    assessGenerateButton();
  });
  
  // assessGenerateButton validates all input fields to ensure that valid data
  // is entered. If the data is valid the generate button is enabled, otherwise
  // the generate button is disabled.
  function assessGenerateButton() {
    if ($('.filter-control:visible').length === 0) {
      // No filters are enabled. 
      // Disable the generate button!
      $('#generate-button').prop('disabled', true);
      return;
    }
    if ($('#search-query-control').is(':visible')) {
      if ($('#search-query').val().length === 0) {
        // The search query filter has been enabled but no text has been entered.
        // Disable the generate button!
        $('#generate-button').prop('disabled', true);
        return;
      }
    }
    if ($('#upload-date-control').is(':visible')) {
      if ($('#datetimepicker-beginning > :input').val().length === 0 || $('#datetimepicker-end > :input').val().length === 0) {
        // The upload date filter has been enabled but both dates have not been selected yet.
        // Disable the generate button!
        $('#generate-button').prop('disabled', true);
        return;
      }
    }
    // If we make it to this point, then everything looks fine.
    // Enable the generate button!
    $('#generate-button').prop('disabled', false);
  }
});
