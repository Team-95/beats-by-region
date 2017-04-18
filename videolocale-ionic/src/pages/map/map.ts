
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StateService } from '../../providers/state.service';
import { Region } from '../../shared/region';

declare var L: any;
declare var $: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {

    map: any;
    markers: any [] = [];

    constructor(public navCtrl: NavController, private _stateService: StateService) {

        var instance = this;

        this._stateService.loadingEvent.subscribe(function (results) {

            var minLat = 90;
            var maxLat = -90;
            var minLon = 180;
            var maxLon = -180;
            var haveAnyCoordinates = false;

            instance.markers.forEach(function (mk) {
                instance.map.removeLayer(mk);
            });

            results.forEach(function (result) {
                if (result.latitude != null && result.longitude != null) {
                    haveAnyCoordinates = true;
                    var tempLat = result.latitude;
                    var tempLong = result.longitude;

                    instance.markers.forEach(function (mark) {
                        var oldLoc = mark.getLatLng();
                        if (oldLoc.lat == tempLat && oldLoc.lng == tempLong){
                            tempLat = tempLat + 0.0001;
                        }
                    });

                    if (tempLat < minLat) {
                        minLat = tempLat;
                    }
                    if (tempLat > maxLat) {
                        maxLat = tempLat;
                    }
                    if (tempLong < minLon) {
                        minLon = tempLong;
                    }
                    if (tempLong > maxLon) {
                        maxLon = tempLong;
                    }

                    var marker = L.marker([tempLat, tempLong], {
                        videoId: result.id,
                        icon: L.mapbox.marker.icon({
                            'marker-color': '#7BB14E'
                        })
                    });
                    marker.on('click', function (e) {
                        window.open('https://youtube.com/watch?v=' + e.target.options.videoId);
                    });
                    marker.addTo(instance.map);
                    instance.markers.push(marker);
                }
            });
            if (haveAnyCoordinates) {
                var buff = (maxLat - minLat) / 50;
                instance.map.fitBounds([[minLat - buff, minLon - buff], [maxLat + buff, maxLon + buff]]);
            }
        });
    };

    searchClicked(): void {
        //this.navCtrl.parent.select(2);
        this._stateService.search();
    };

    ngOnInit(): void {

        var instance = this;
        // Maximum radius for searching, as stated in the YouTube API (1000 km):
        // https://developers.google.com/youtube/v3/docs/search/list#location
        var MAXIMUM_RADIUS_METERS = 1000000;
        var MAXIMUM_NUM_REGIONS = 5;

        L.mapbox.accessToken = 'pk.eyJ1IjoidGVhbTk1IiwiYSI6ImNpbmhyeGo2ZjB3and1MmtqMnF1MGNzZDkifQ.a4TonppNKAMvi13iEUnp3A';
        this.map = L.mapbox.map('map', '', { worldCopyJump: true })
            .setView([35, -105], 2);
        L.mapbox.styleLayer('mapbox://styles/team95/cinl2xhb6000ab1lzaofjjfqz').addTo(this.map);
        var featureGroup = L.featureGroup().addTo(this.map);

         //Set titles and tooltips for map controls
        L.drawLocal.draw.toolbar.buttons.circle = 'Select a region.';
        L.drawLocal.draw.handlers.circle.tooltip.start = 'Click and drag to select a region.';
        L.drawLocal.edit.toolbar.buttons.edit = 'Edit regions.';
        L.drawLocal.edit.toolbar.buttons.editDisabled = 'No regions to edit.';
        L.drawLocal.edit.toolbar.buttons.remove = 'Delete regions.';
        L.drawLocal.edit.toolbar.buttons.removeDisabled = 'No regions to delete.';
        L.drawLocal.edit.handlers.edit.tooltip.text = 'Drag handles to edit region.';
        L.drawLocal.edit.handlers.remove.tooltip.text = 'Click on a region to remove.';

        var drawControlCircleEnabled = new L.Control.Draw({
            draw: {
                polygon: false,
                polyline: false,
                rectangle: false,
                circle: {
                    /*change circle style here*/
                    shapeOptions: {
                        fillColor: 'hsl(0,0%,90%)',
                        color: 'hsl(93,39%,50%)',
                        fillOpacity: .3
                    }
                },
                marker: false
            },
            edit: {
                featureGroup: featureGroup,
                /* included to keep style on selection edit*/
                edit: {
                    selectedPathOptions: {
                        maintainColor: true,
                        opacity: 0.3
                    }
                }
            }
        }).addTo(this.map);

        var drawControlCircleDisabled = new L.Control.Draw({
            draw: {
                polygon: false,
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false
            },
            edit: {
                featureGroup: featureGroup
            }
        });

        this.map.on('draw:created', function (e) {
            if (e.layer.getRadius() > MAXIMUM_RADIUS_METERS) {
                e.layer.setRadius(MAXIMUM_RADIUS_METERS);
                e.layer.bindPopup('Your region has been resized as the maximum radius is 1000 km.');
            }
            featureGroup.addLayer(e.layer);
            e.layer.openPopup();

            var latlng = e.layer.getLatLng();
            var radius = e.layer.getRadius();

            var region = new Region(latlng.lat, latlng.lng, radius);
            instance._stateService.addRegion(region);

            if (featureGroup.getLayers().length === MAXIMUM_NUM_REGIONS) {
                drawControlCircleEnabled.removeFrom(this.map);
                drawControlCircleDisabled.addTo(this.map);
                featureGroup.bindPopup('The maximum number of regions is ' + MAXIMUM_NUM_REGIONS + '. Delete a region to re-enable the drawing tool.');
                featureGroup.openPopup();
            }
        });

        this.map.on('draw:edited', function (e) {
            // Reset the coordinates input and repopulate it.
            instance._stateService.clearRegions();

            e.layers.eachLayer(function (layer) {
                if (layer.getRadius() > MAXIMUM_RADIUS_METERS) {
                    layer.setRadius(MAXIMUM_RADIUS_METERS);
                    layer.bindPopup('Your region has been resized as the maximum radius is 1000 km.');
                    layer.openPopup();
                }

                var latlng = layer.getLatLng();
                var radius = layer.getRadius();

                var region = new Region(latlng.lat, latlng.lng, radius);
                instance._stateService.addRegion(region);
            });
        });

        this.map.on('draw:deleted', function (e) {
            try {
                drawControlCircleDisabled.removeFrom(this.map);
                drawControlCircleEnabled.addTo(this.map);
            } catch (err) {
                // Draw control is already enabled, ignore the thrown exception.
            }

            // Remove deleted regions from the input field.
            e.layers.eachLayer(function (layer) {
                var latlng = layer.getLatLng();
                var radius = layer.getRadius();

                var region = new Region(latlng.lat, latlng.lng, radius);
                instance._stateService.removeRegion(region);
            });
        });

        navigator.geolocation.getCurrentPosition(function (position) {
            instance.map.setView([position.coords.latitude, position.coords.longitude], 11, { animation: true });
        });

    }

    onLink(url: string) {
        window.open(url);
    }
}
