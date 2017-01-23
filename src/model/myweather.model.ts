export interface MyWeatherInfo {
    temp_f:string,
    temp_c:string,
    feelslike_f : string,
    feelslike_c : string,
    condition : string,
    icon_url : string,
    time_string : string,
    humidity : string
}

export interface MyLocation {
    city : string,
    state? :string,
    country : string
}

export interface MoonPhase{
    percentIlluminated : number,
    ageOfMoon : number 
}

export interface Sunset {
    hour : number,
    min : number
}

export interface Sunrise extends Sunset{
    
}

export interface WeatherForecast  {
    weatherData : MyWeatherInfo,
    locationData : MyLocation,
    moonPhaseData : MoonPhase,
    sunriseData : Sunrise,
    sunsetData : Sunset
}