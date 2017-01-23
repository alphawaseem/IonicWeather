import { Component,OnInit } from '@angular/core';
import { WeatherProvider } from '../../providers/weather-provider';
import { NavController } from 'ionic-angular';
import { MyWeatherInfo } from '../../model/myweather.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  weather : MyWeatherInfo;
  inCel : boolean = true;
  forecasts
  ngOnInit(){
    this.weatherProvider.getHourlyWeather().subscribe(res => {
      this.forecasts=res;
      this.weather = this.forecasts[0];
    }); 
  }
  constructor(public navCtrl: NavController
  ,private weatherProvider : WeatherProvider) {
    
  }

  searchCities(query){
    this.weatherProvider.searchCities(query).subscribe(res => console.log(res));
  }

}
