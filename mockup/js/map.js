var map;
var drawingManager;
function initMap() {
  // Starting coordinates are Seattle, WA.
  var startingCoordinates = new google.maps.LatLng(47.6097, -122.3331);

  var mapOptions = {
    zoom: 6,
    center: startingCoordinates,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var styleArray = [
    {
      featureType: "all",
      stylers: [
        { saturation: -50 }
      ]
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  map.setOptions({styles: styleArray});

  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    rectangleOptions: {
      fillColor: "#ff4d4d",
      fillOpacity: 0.4,
      strokeWeight: 1,
      editable: true,
      draggable: true
    }
  });
  drawingManager.setMap(map);

  /*google.maps.event.addListener(drawingManager, "overlaycomplete", function(event) {
    var element = event.overlay;
    google.maps.event.addListener(element, "click", function(e) {
      element.setMap(null);
    });
  });*/

  var customDeleteToolDiv = document.createElement("div");
  var customDeleteTool = new CustomControl(customDeleteToolDiv, map);

  customDeleteToolDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(customDeleteToolDiv);
}

function CustomControl(controlDiv, map) {

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#ffffff';
  controlUI.style.height = '24px';
  controlUI.style.width = '24px';
  controlUI.style.marginTop = '5px';
  controlUI.style.marginLeft = '-6px';
  controlUI.style.paddingTop = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.onmouseover = function() { controlUI.style.backgroundColor = '#f2f2f2'};
  controlUI.onmouseleave = function() { controlUI.style.backgroundColor = '#ffffff'};
  // TODO: Figure out how to reset the opacity to 0.5 after clicking one of the other buttons.
  controlUI.onclick = function() { controlText.innerHTML = '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>' }
  controlUI.title = 'Delete regions';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.style.marginTop = '3px';
  controlText.innerHTML = '<span class="glyphicon glyphicon-ban-circle" style="opacity: 0.5;" aria-hidden="true"></span>';
  controlUI.appendChild(controlText);

  // Setup the click event listeners
  google.maps.event.addDomListener(controlUI, 'click', function (event) {
      drawingManager.setDrawingMode(null);
      // TODO: Enable use of click to delete regions.
  });
}
