import {
  WeatherResponse,
  ForecastResponse,
  Forecast3hResponse,
} from '../types/weather';

const API_KEY = 'e9fab70cbb3d722bc82d83c812419053';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();
    return {data};
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchForecast3h = async (
  lat: number,
  lon: number,
): Promise<Forecast3hResponse> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching 3h forecast:', error);
    throw error;
  }
};
