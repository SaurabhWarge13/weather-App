import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Forecast3hResponse } from '../types/weather';

interface WeatherContextType {
  forecast3h: Forecast3hResponse | null;
  setForecast3h: (forecast: Forecast3hResponse | null) => void;
}

const WeatherContext = createContext<WeatherContextType>({
  forecast3h: null,
  setForecast3h: () => {},
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [forecast3h, setForecast3h] = useState<Forecast3hResponse | null>(null);

  return (
    <WeatherContext.Provider value={{ forecast3h, setForecast3h }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext); 