import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyWeatherInfo } from '../model/myweather.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherProvider {

  private conditions = 'http://api.wunderground.com/api/373a5cf6b3655712/conditions/q/zmw:';
  private hourly = 'http://api.wunderground.com/api/373a5cf6b3655712/hourly/q/zmw:';
  private search = 'http://autocomplete.wunderground.com/aq?query=';
  private forecasts : any[] = [];
  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
  }
  getHourlyWeather(zmw? : string) {
    let self = this;
    zmw = zmw || '00000.36.43263';
    console.log('called');
    return this.http.get(this.hourly+zmw+'.json').map(res => {
      let forecasts :any[];
      console.log(res.json());
     res.json().hourly_forecast.forEach(forecast => {
         this.forecasts.push(self.parseRequiredFields(forecast));
     });
     return this.forecasts;
    });
  }
  

  searchCities(query){
    return this.http.get(this.search+query).map(res => res.json());
  }

  parseRequiredFields(forecast_object):MyWeatherInfo{
    let weather:MyWeatherInfo = {
        condition : forecast_object.condition,
      feelslike_c :forecast_object.feelslike.metric,
      feelslike_f :forecast_object.feelslike.english,
      humidity : forecast_object.humidity,
      temp_c : forecast_object.temp.metric,
      temp_f : forecast_object.temp.english,
      time_string : forecast_object.FCTTIME.pretty,
      icon_url : forecast_object.icon_url
    };
    
    return weather;
  }
}
