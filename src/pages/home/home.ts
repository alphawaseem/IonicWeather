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
  searchStr : string = '' ;

  constructor(public navCtrl: NavController,private weatherProvider : WeatherProvider) {
  }

  ngOnInit(){
    let defaultCityZMW = '00000.36.43263';
    let cityZMW = localStorage.getItem('defaultCity');
    if(!cityZMW){
      this.setDefaultCity(defaultCityZMW);
      cityZMW = localStorage.getItem('defaultCity');
    }
    this.getCity(cityZMW);
    this.getForecast(cityZMW); 
  }

  
  getForecast(zmw:string){
    this.forecasts = [];
    this.weatherProvider.getHourlyWeather(zmw).subscribe(res => {
      if(res){
        this.forecasts=res;
        this.weather = this.forecasts[0];
      }
    }); 
  }

  setDefaultCity(zmw:string){
    localStorage.setItem('defaultCity',zmw);
  }

  getCity(zmw:string){
    this.weatherProvider.getCity(zmw).subscribe(res => {
      if(res){
        this.location = {
          city : res.city,
          state : res.state,
          country : res.country
        }
      }
    });
  }
  

  searchCities(query){
    this.weatherProvider.searchCities(query).subscribe(res => {
      this.searchResults = res.RESULTS;
    });
  }

  selectCity(city){
    this.getForecast(city.zmw);
    this.getCity(city.zmw);
    this.searchStr = '';
  }

}
