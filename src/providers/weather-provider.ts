import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MyWeatherInfo,MyLocation } from '../model/myweather.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherProvider {

  private hourlyForecastUrl = 'http://api.wunderground.com/api/373a5cf6b3655712/hourly/q/zmw:';
  private autoSearchUrl = 'http://autocomplete.wunderground.com/aq?query=';
  private cityUrl = 'http://api.wunderground.com/api/373a5cf6b3655712/geolookup/q/zmw:';
  private forecasts : any[] = [];

  constructor(public http: Http) {
    console.log('Hello WeatherProvider');
  }
  getHourlyWeather(zmw? : string) {
    zmw = zmw || '00000.36.43263';
    return this.http.get(this.hourlyForecastUrl+zmw+'.json').map(res => {
      let forecasts :any[];
     res.json().hourly_forecast.forEach(forecast => {
         this.forecasts.push(this.parseRequiredFields(forecast));
     });
     return this.forecasts;
    });
  }

  getCity(zmw?: string){
    zmw = zmw || '00000.36.43263';
    return this.http.get(this.cityUrl+zmw+'.json').map(res => {
      return res.json().location;
    });

  }

  searchCities(query){
    return this.http.get(this.autoSearchUrl+query).map(res => res.json());
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
