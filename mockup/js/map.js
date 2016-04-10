"use strict";

var map;
var drawingManager;

class CustomControl {
  constructor(title, glyphicon) {
    this.controlDiv = document.createElement('div');
    this.controlUI = document.createElement('div');
    this.controlText = document.createElement('div');

    // Set CSS for control border
    this.controlUI.style.backgroundColor = '#ffffff';
    this.controlUI.style.height = '24px';
    this.controlUI.style.width = '24px';
    this.controlUI.style.marginTop = '5px';
    this.controlUI.style.marginLeft = '-6px';
    this.controlUI.style.paddingTop = '2px';
    this.controlUI.style.cursor = 'pointer';
    this.controlUI.style.textAlign = 'center';
    this.controlUI.onmouseover = function() { this.controlUI.style.backgroundColor = '#f2f2f2' };
    this.controlUI.onmouseleave = function() { this.controlUI.style.backgroundColor = '#ffffff' };
    this.controlUI.click = function() { this.controlText.innerHTML = '<span class="glyphicon ' + glyphicon + '" style="opacity: 1;" aria-hidden="true"></span>' };
    this.controlUI.title = title;
    this.controlDiv.appendChild(this.controlUI);

    // Set CSS for control interior
    this.controlText.style.paddingLeft = '4px';
    this.controlText.style.paddingRight = '4px';
    this.controlText.style.marginTop = '3px';
    this.controlText.innerHTML = '<span class="glyphicon ' + glyphicon + '" style="opacity: 0.5;" aria-hidden="true"></span>';
    this.controlUI.appendChild(this.controlText);

    this.controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.controlDiv);

    // Setup the click event listeners
    google.maps.event.addDomListener(this.controlUI, 'click', function(event) {
      this.click();
    });
  }
}


class CustomPanControl extends CustomControl {
  constructor() {
    super('Navigate the map', 'glyphicon-hand-up');
  }

  click() {
    CustomRectangleControl.reset();
    CustomDeleteControl.reset();
    this.controlText.innerHTML = '<span class="glyphicon ' + this.glyphicon + '" style="opacity: 1;" aria-hidden="true"></span>';
    this.drawingManager.setDrawingMode(null);
  }

  static reset() {
    this.controlText.innerHTML = '<span class="glyphicon ' + this.glyphicon + '" style="opacity: 0.5;" aria-hidden="true"></span>';
  }
}


class CustomRectangleControl extends CustomControl {
  constructor() {
    super('Draw regions on the map', 'glyphicons-unchecked');
  }

  click() {
    CustomPanControl.reset();
    CustomDeleteControl.reset();
    this.controlText.innerHTML = '<span class="glyphicon ' + this.glyphicon + '" style="opacity: 1;" aria-hidden="true"></span>';
    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
  }

  static reset() {
    this.controlText.innerHTML = '<span class="glyphicon ' + this.glyphicon + '" style="opacity: 0.5;" aria-hidden="true"></span>';
  }
}


class CustomDeleteControl extends CustomControl {
  constructor() {
    super('Delete regions from the map', 'glyphicon-ban-circle');
  }

  click() {
    CustomRectangleControl.reset();
    CustomPanControl.reset();
    this.controlText.innerHTML = '<span class="glyphicon ' + this.glyphicon + '" style="opacity: 1;" aria-hidden="true"></span>';
    this.drawingManager.setDrawingMode(null);

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event) {
      var element = event.overlay;
      google.maps.event.addListener(element, 'click', function(e) {
        element.setMap(null);
      });
    });
  }

  static reset() {
    this.controlText.innerHTML = '<span class="glyphicon ' + this.glyphicon + '" style="opacity: 0.5;" aria-hidden="true"></span>';
  }
}


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

  var customPanControl = new CustomPanControl();
  var customRectangleControl = new CustomRectangleControl();
  var customDeleteControl = new CustomDeleteControl();
}
