import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherProvider {

  conditions = 'http://api.wunderground.com/api/373a5cf6b3655712/conditions/q/zmw:';

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
  }
  getWeather(zmw? : string) {
    zmw = zmw || '00000.36.43263';
    return this.http.get(this.conditions+zmw+'.json').map(res=>res.json());
  }
}
