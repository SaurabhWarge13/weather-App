import { WeatherModel } from '../models/WeatherModel';
import { fetchCurrentWeather, fetchForecast3h } from '../services/weatherService';
import { checkLocationPermission, requestLocationPermission } from '../services/location';
import Geolocation from '@react-native-community/geolocation';

export class WeatherController {
  private model: WeatherModel;

  constructor(model: WeatherModel) {
    this.model = model;
  }

  async fetchLocation(): Promise<{ lat: number; lon: number } | null> {
    try {
      const hasPermission = await checkLocationPermission();
      if (!hasPermission) {
        const granted = await requestLocationPermission();
        if (!granted) {
          throw new Error('Location permission denied');
        }
      }

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => reject(new Error('Failed to get location')),
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );
      });
    } catch (error) {
      throw error;
    }
  }

  async fetchWeatherData(location: { lat: number; lon: number }) {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchCurrentWeather(location.lat, location.lon),
        fetchForecast3h(location.lat, location.lon),
      ]);

      this.model.setCurrentWeather(weatherResponse.data);
      this.model.setForecast3h(forecastResponse);
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }

  getCurrentWeather() {
    return this.model.getCurrentWeather();
  }

  getForecast3h() {
    return this.model.getForecast3h();
  }

  getTodayForecasts() {
    return this.model.getTodayForecasts();
  }
} 