class CustomPanControl {
  constructor(map, drawingManager) {
    this.controlDiv = document.createElement('div');
    this.map = map;
    this.drawingManager = drawingManager;

    this.controlUI = document.createElement('div');
    this.controlUI.className = 'custom-map-control';
    this.controlUI.title = 'Navigate the map';
    this.controlUI.onclick = function() { this.click() };
    this.controlDiv.appendChild(this.controlUI);

    this.controlText = document.createElement('div');
    this.controlText.className = 'custom-map-control-text';
    this.controlText.innerHTML = '<span class="glyphicon glyphicon-hand-up" style="opacity: 1;" aria-hidden="true"></span>';
    this.controlUI.appendChild(this.controlText);

    this.controlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.controlDiv);

    // Setup the click event listeners
    google.maps.event.addDomListener(this.controlUI, 'click', function(event) {
      this.click();
    })
  }

  click() {
    CustomRectangleControl.reset();
    CustomDeleteControl.reset();
    this.controlText.innerHTML = '<span class="glyphicon glyphicon-hand-up" style="opacity: 1;" aria-hidden="true"></span>';
    this.drawingManager.setDrawingMode(null);
  }

  static reset() {
    this.controlText.innerHTML = '<span class="glyphicon glyphicon-hand-up" style="opacity: 0.5;" aria-hidden="true"></span>';
  }
}

class CustomRectangleControl {
  constructor(map, drawingManager) {
    this.controlDiv = document.createElement('div');
    this.map = map;
    this.drawingManager = drawingManager;

    this.controlUI = document.createElement('div');
    this.controlUI.className = 'custom-map-control';
    this.controlUI.title = 'Select regions';
    this.controlUI.onclick = function() { this.click() };
    this.controlDiv.appendChild(this.controlUI);

    this.controlText = document.createElement('div');
    this.controlText.className = 'custom-map-control-text';
    this.controlText.innerHTML = '<span class="glyphicon glyphicons-unchecked" style="opacity: 0.5;" aria-hidden="true"></span>';
    this.controlUI.appendChild(this.controlText);

    this.controlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.controlDiv);

    // Setup the click event listeners
    google.maps.event.addDomListener(this.controlUI, 'click', function(event) {
      this.click();
    })
  }

  click() {
    CustomPanControl.reset();
    CustomDeleteControl.reset();
    this.controlText.innerHTML = '<span class="glyphicon glyphicons-unchecked" style="opacity: 1;" aria-hidden="true"></span>';
    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
  }

  static reset() {
    this.controlText.innerHTML = '<span class="glyphicon glyphicons-unchecked" style="opacity: 0.5;" aria-hidden="true"></span>';
  }
}

class CustomDeleteControl {
  constructor(map, drawingManager) {
    this.controlDiv = document.createElement('div');
    this.map = map;
    this.drawingManager = drawingManager;

    this.controlUI = document.createElement('div');
    this.controlUI.className = 'custom-map-control';
    this.controlUI.title = 'Delete regions';
    this.controlUI.onclick = function() { this.click() };
    this.controlDiv.appendChild(this.controlUI);

    this.controlText = document.createElement('div');
    this.controlText.className = 'custom-map-control-text';
    this.controlText.innerHTML = '<span class="glyphicon glyphicon-ban-circle" style="opacity: 0.5;" aria-hidden="true"></span>';
    this.controlUI.appendChild(this.controlText);

    this.controlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.controlDiv);

    // Setup the click event listeners
    google.maps.event.addDomListener(this.controlUI, 'click', function(event) {
      this.click();
    })
  }

  click() {
    CustomRectangleControl.reset();
    CustomPanControl.reset();
    this.controlText.innerHTML = '<span class="glyphicon glyphicon-ban-circle" style="opacity: 1;" aria-hidden="true"></span>';
    this.drawingManager.setDrawingMode(null);

    google.maps.event.addListener(this.drawingManager, "overlaycomplete", function(event) {
      var element = event.overlay;
      google.maps.event.addListener(element, "click", function(e) {
        element.setMap(null);
      });
    });
  }

  static reset() {
    this.controlText.innerHTML = '<span class="glyphicon glyphicon-ban-circle" style="opacity: 0.5;" aria-hidden="true"></span>';
  }
}


function initMap() {
  var map;
  var drawingManager;

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
    drawingControl: false,
    rectangleOptions: {
      fillColor: "#ff4d4d",
      fillOpacity: 0.4,
      strokeWeight: 1,
      editable: true,
      draggable: true
    }
  });
  drawingManager.setMap(map);

  var customPanControl = new CustomPanControl(map, drawingManager);
  var customRectangleControl = new CustomRectangleControl(map, drawingManager);
  var customDeleteControl = new CustomDeleteControl(map, drawingManager);
}
