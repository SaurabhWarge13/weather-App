import { WeatherData, Forecast3hResponse } from '../types/weather';

export class WeatherModel {
  private currentWeather: WeatherData | null = null;
  private forecast3h: Forecast3hResponse | null = null;

  setCurrentWeather(weather: WeatherData) {
    this.currentWeather = weather;
  }

  setForecast3h(forecast: Forecast3hResponse) {
    this.forecast3h = forecast;
  }

  getCurrentWeather(): WeatherData | null {
    return this.currentWeather;
  }

  getForecast3h(): Forecast3hResponse | null {
    return this.forecast3h;
  }

  getTodayForecasts() {
    if (!this.currentWeather || !this.forecast3h) return [];

    const today = new Date();
    const todayStr = today.toLocaleDateString('en-CA');

    const nowForecastItem = {
      dt: this.currentWeather.dt,
      temp: this.currentWeather.main.temp,
      main: this.currentWeather.weather[0].main,
      description: this.currentWeather.weather[0].description,
    };

    const restTodayForecasts = this.forecast3h.list
      .filter(item => {
        const localDate = new Date(item.dt_txt + 'Z').toLocaleDateString('en-CA');
        return localDate === todayStr;
      })
      .map(item => ({
        dt: item.dt,
        temp: item.main.temp,
        main: item.weather[0].main,
        description: item.weather[0].description,
      }));

    return [nowForecastItem, ...restTodayForecasts];
  }
} 