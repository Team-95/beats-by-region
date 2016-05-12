$(document).ready(function() {
    var tour = new Tour({
       steps: [
           {
               title: 'Welcome to VideoLocale!',
               content: 'It appears this is your first visit! We\'ll give you a quick tour.',
               orphan: true  
           },
           {
               element: '.leaflet-draw-draw-circle',
               title: 'Selecting regions',
               content: 'To select a region on the map, select this tool. Click/tap where you want to start the circle, and drag! You will have to select this tool again if you want to draw another region.',
               placement: 'right'    
           },
           {
               element: '.leaflet-draw-edit-edit',
               title: 'Editing regions',
               content: 'To edit a region on the map, select this tool. Use the supplied handles to tweak your regions. Once you\'re finished editing, be sure to select save!',
               placement: 'right'
           },
           {
               element: '.leaflet-draw-edit-remove',
               title: 'Deleting regions',
               content: 'To delete a region on the map, select this tool. Tap/click on the regions you want to delete, and they will disappear. Much like the edit tool, be sure to select save when finished!',
               placement: 'right'
           },
           {
               element: '#add-filter-button',
               title: 'Adding filters',
               content: 'Additional filters may be added using this button. These filters allow you to input search queries, choose desired video length, and much more!',
               placement: 'bottom'
           },
           {
               element: '#generate-button',
               title: 'Generating a playlist',
               content: 'Once you are finished selecting regions and choosing your filters, click this button. A playlist of relevant YouTube videos will be generated for you!',
               placement: 'top'
           }
       ]
    });
    
    tour.init();
    tour.start();
    
    $('#restart-tour').click(function() {
       tour.restart(); 
    });
});