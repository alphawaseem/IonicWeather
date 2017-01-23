import { Component } from '@angular/core';
import { WeatherProvider } from '../../providers/weather-provider';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather : any;
  inCel : boolean = true;
  constructor(public navCtrl: NavController
  ,private weatherProvider : WeatherProvider) {
    this.weatherProvider.getWeather().subscribe(weather => {
      console.log(weather);
      this.weather = weather;
    });
  }

}
