import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import 'rxjs/add/operator/map';

import { RestServiceProvider } from './../../providers/rest-service/rest-service';

declare var plugin: any;
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //url:string = 'https://api.foursquare.com/v2/venues/search';
  @ViewChild('map') theMap: ElementRef;
  map: any;
  entries:any;
  credentials: { search?:string} = {}

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, 
        public platform: Platform, public resService: RestServiceProvider) {
          this.resService = resService;
          platform.ready().then(() => {
            this.loadMap();
          });
  }

  loadMap() {
    let mapEle = this.theMap.nativeElement;
    this.map = plugin.google.maps.Map.getMap(mapEle, {});
    this.map.one(plugin.google.maps.event.MAP_READY, () => {
    });
  }

  loadPoint(_credentials) {
    if (_credentials.valid){
      this.resService.load(_credentials.value.search).subscribe(
        data => {
          this.entries = data;
        }
      );
    }

    if (this.entries){

      for (let obj of this.entries) {    
        let markerOptions: MarkerOptions = {
          position: new LatLng(obj.location.lat,obj.location.lng),
          title: obj.name
        };

        this.map.addMarker(markerOptions);
      }

      // const marker: Marker = this.map.addMarker(markerOptions)
      //   .then((marker: Marker) => {marker.showInfoWindow();});

      }

    }

  }