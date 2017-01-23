import { Component } from '@angular/core';
import { WeatherProvider } from '../../providers/weather-provider';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController
  ,private weatherProvider : WeatherProvider) {
    this.weatherProvider.getWeather().subscribe(weather => {
      console.log(weather);
    });
  }

}
