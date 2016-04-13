// Maximum radius for searching, as stated in the YouTube API (1000 km):
// https://developers.google.com/youtube/v3/docs/search/list#location
var MAXIMUM_RADIUS_METERS = 1000000

L.mapbox.accessToken = 'pk.eyJ1IjoidGVhbTk1IiwiYSI6ImNpbXV4dzNjZzAyazF3Ymx1djgwamJxYjQifQ.JoJzyplw9KMAjonxxz-4ZQ';
var map = L.mapbox.map('map', 'mapbox.streets')
      .setView([47.6097, -122.3331], 6);

var featureGroup = L.featureGroup().addTo(map);

// Set titles and tooltips for map controls
L.drawLocal.draw.toolbar.buttons.circle = 'Select a region.';
L.drawLocal.draw.handlers.circle.tooltip.start = 'Click and drag to select a region.';
L.drawLocal.edit.toolbar.buttons.edit = 'Edit regions.';
L.drawLocal.edit.toolbar.buttons.editDisabled = 'No regions to edit.';
L.drawLocal.edit.toolbar.buttons.remove = 'Delete regions.';
L.drawLocal.edit.toolbar.buttons.removeDisabled = 'No regions to delete.';
L.drawLocal.edit.handlers.edit.tooltip.text = 'Drag handles to edit region.';
L.drawLocal.edit.handlers.remove.tooltip.text = 'Click on a region to remove.';

var drawControl = new L.Control.Draw({
  draw: {
    polygon: false,
    polyline: false,
    rectangle: false,
    circle: true,
    marker: false
  },
  edit: {
    featureGroup: featureGroup
  }
}).addTo(map);

map.on('draw:created', function(e) {
  if (e.layer.getRadius() > MAXIMUM_RADIUS_METERS) {
    e.layer.setRadius(MAXIMUM_RADIUS_METERS);
    e.layer.bindPopup('Your region has been resized as the maximum radius is 1000 km.');
  }
  featureGroup.addLayer(e.layer);
  e.layer.openPopup();
});

map.on('draw:edited', function(e) {
  e.layers.eachLayer(function(layer) {
    if (layer.getRadius() > MAXIMUM_RADIUS_METERS) {
      layer.setRadius(MAXIMUM_RADIUS_METERS);
      layer.bindPopup('Your region has been resized as the maximum radius is 1000 km.');
      layer.openPopup();
    }
  });
});
