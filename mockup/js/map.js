L.mapbox.accessToken = '';
var map = L.mapbox.map('map', 'mapbox.streets')
      .setView([47.6097, -122.3331], 6);

var featureGroup = L.featureGroup().addTo(map);

// Define rectangle options
// http://leafletjs.com/reference.html#rectangle
var rectangle_options = {
  color: '#ff4d4d',
  opacity: '0.4',
  weight: 2,
  fillColor: '#000',
  fillOpacity: '0.4'
};

var drawControl = new L.Control.Draw({
  draw: {
    polygon: false,
    polyline: false,
    rectangle: true,
    circle: false,
    marker: false
  },
  edit: {
    featureGroup: featureGroup
  }
}).addTo(map);

map.on('draw:created', function(e) {
  featureGroup.addLayer(e.layer);
});
