import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CloudIcon, RainIcon, SunIcon} from './WeatherIcons';
import WeatherInfoGrid from './WeatherInfoGrid';
import COLORS from '../constants/colors';

interface WeatherCardProps {
  city: string;
  country: string;
  weatherMain: string;
  weatherDesc: string;
  date: string;
  temperature: number;
  wind: string;
  feelsLike: number;
  pressure: number;
  uvIndex?: number;
}

const getWeatherSvg = (main: string) => {
  switch (main.toLowerCase()) {
    case 'rain':
      return <RainIcon size={64} />;
    case 'clear':
      return <SunIcon size={64} />;
    case 'clouds':
      return <CloudIcon size={64} />;
    default:
      return <CloudIcon size={64} />;
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherMain,
  weatherDesc,
  date,
  temperature,
  wind,
  feelsLike,
  pressure,
  uvIndex,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.weatherIcon}>{getWeatherSvg(weatherMain)}</View>
      <Text style={styles.weatherMain}>
        {weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}
      </Text>
      <Text style={styles.weatherDate}>{date}</Text>
      <Text style={styles.temperature}>{temperature}°</Text>
      <WeatherInfoGrid
        wind={wind}
        feelsLike={feelsLike + '°'}
        uvIndex={uvIndex !== undefined ? String(uvIndex) : '-'}
        pressure={pressure + ' mbar'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 24,
    padding: 24,
    marginVertical: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  headerRow: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  country: {
    fontWeight: '400',
    color: 'white',
    opacity: 0.7,
  },
  weatherIcon: {
    marginVertical: 8,
  },
  weatherMain: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  weatherDate: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    marginBottom: 8,
    textAlign: 'center',
  },
  temperature: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  infoBox: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    paddingVertical: 12,
    borderColor: 'rgba(255,255,255,0.15)',
    borderWidth: 0.5,
  },
  infoLabel: {
    color: 'white',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeatherCard;
