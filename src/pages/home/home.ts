import { Component,OnInit } from '@angular/core';
import { WeatherProvider } from '../../providers/weather-provider';
import { NavController } from 'ionic-angular';
import { MyWeatherInfo,MyLocation } from '../../model/myweather.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  weather : MyWeatherInfo;
  inCel : boolean = true;
  forecasts : MyWeatherInfo[];
  location : MyLocation ;
  searchResults : any[] = [];
  ngOnInit(){
    this.weatherProvider.getHourlyWeather().subscribe(res => {
      this.forecasts=res;
      this.weather = this.forecasts[0];
    }); 
    this.weatherProvider.getCity().subscribe(res => {
      if(res){
      this.location = {
        city : res.city,
        state : res.state,
        country : res.country
      }
      }
    });
  }
  constructor(public navCtrl: NavController
  ,private weatherProvider : WeatherProvider) {
    
  }

  searchCities(query){
    this.weatherProvider.searchCities(query).subscribe(res => {
      this.searchResults = res.RESULTS;
    });
  }

}
