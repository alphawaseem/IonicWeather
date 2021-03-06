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

  constructor(public http: Http) {
    console.log('Hello WeatherProvider');
  }
  getHourlyWeather(zmw: string) {
    return this.http.get(this.hourlyForecastUrl+zmw+'.json').map(res => {
      if(res.json().hourly_forecast){
        let forecasts :any[] = [];
        res.json().hourly_forecast.forEach(forecast => {
            forecasts.push(this.parseRequiredFields(forecast));
        });
        return forecasts;
      }
    });
  }

  getCity(zmw: string){
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
