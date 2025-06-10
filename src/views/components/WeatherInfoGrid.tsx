import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeatherInfoBox from './WeatherInfoBox';
import { WindIcon, ThermometerIcon, UvIcon, PressureIcon } from './WeatherIcons';
import COLORS from '../constants/colors';

interface WeatherInfoGridProps {
  wind: string;
  feelsLike: string;
  uvIndex: string;
  pressure: string;
}

const WeatherInfoGrid: React.FC<WeatherInfoGridProps> = ({ wind, feelsLike, uvIndex, pressure }) => {
  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <WeatherInfoBox icon={<WindIcon size={28} />} label="WIND" value={wind} />
        <WeatherInfoBox icon={<ThermometerIcon size={28} />} label="FEELS LIKE" value={feelsLike} />
      </View>
      <View style={styles.row}>
        <WeatherInfoBox icon={<UvIcon size={28} />} label="INDEX UV" value={uvIndex} />
        <WeatherInfoBox icon={<PressureIcon size={28} />} label="PRESSURE" value={pressure} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeatherInfoGrid; 