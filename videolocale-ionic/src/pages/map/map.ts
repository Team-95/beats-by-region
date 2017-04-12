
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

    constructor(public navCtrl: NavController, private _stateService : StateService) {
        
    };

    searchClicked(): void {
        this.navCtrl.parent.select(2);
        this._stateService.search();
    };

    ngOnInit(): void {

        var instance = this;
        // Maximum radius for searching, as stated in the YouTube API (1000 km):
        // https://developers.google.com/youtube/v3/docs/search/list#location
        var MAXIMUM_RADIUS_METERS = 1000000;

        // Maximum number of regions. A maximum must be set as each region
        // requires its own YouTube API call.
        var MAXIMUM_NUM_REGIONS = 5;

        L.mapbox.accessToken = 'pk.eyJ1IjoidGVhbTk1IiwiYSI6ImNpbmhyeGo2ZjB3and1MmtqMnF1MGNzZDkifQ.a4TonppNKAMvi13iEUnp3A';
        var map = L.mapbox.map('map', '', { worldCopyJump: true })
            .setView([47.6097, -122.3331], 6);
        L.mapbox.styleLayer('mapbox://styles/team95/cinl2xhb6000ab1lzaofjjfqz').addTo(map);
        var featureGroup = L.featureGroup().addTo(map);

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
        }).addTo(map);

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

        map.on('draw:created', function (e) {
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
                drawControlCircleEnabled.removeFrom(map);
                drawControlCircleDisabled.addTo(map);
                featureGroup.bindPopup('The maximum number of regions is ' + MAXIMUM_NUM_REGIONS + '. Delete a region to re-enable the drawing tool.');
                featureGroup.openPopup();
            }
        });

        map.on('draw:edited', function (e) {
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

        map.on('draw:deleted', function (e) {
            try {
                drawControlCircleDisabled.removeFrom(map);
                drawControlCircleEnabled.addTo(map);
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
    }

    onLink(url: string) {
        window.open(url);
    }
}
