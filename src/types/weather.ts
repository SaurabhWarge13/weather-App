export interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
}

export interface ForecastData {
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind_speed: number;
    wind_deg: number;
    clouds: number;
    pop: number;
    uvi: number;
  }>;
}

export interface WeatherResponse {
  data: WeatherData;
}

export interface ForecastResponse {
  data: ForecastData;
}

export interface Forecast3hItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: { all: number };
  wind: { speed: number; deg: number; gust?: number };
  visibility: number;
  pop: number;
  rain?: { '3h': number };
  dt_txt: string;
}

export interface Forecast3hCity {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Forecast3hResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast3hItem[];
  city: Forecast3hCity;
}

export type RootStackParamList = {
  Home: undefined;
  Forecast: undefined;
}; 


export type TodayForecastItem = {
  dt: number;
  temp: number;
  main: string;
  description: string;
};