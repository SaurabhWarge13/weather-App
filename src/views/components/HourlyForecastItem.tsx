import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

interface HourlyForecastItemProps {
  time: string;
  temperature: number;
  icon: React.ReactNode;
  now?: boolean;
}

const HourlyForecastItem: React.FC<HourlyForecastItemProps> = ({ time, temperature, icon, now }) => {
  return (
    <View style={[styles.container, now && styles.nowContainer]}>
      <Text style={[styles.time, now && styles.nowText]}>{time}</Text>
      <View style={styles.icon}>{icon}</View>
      <Text style={[styles.temp, now && styles.nowText]}>{temperature}°</Text>
      {now && <Text style={styles.nowLabel}>Now</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 6,
    minWidth: 60,
    elevation: 2,
  },
  nowContainer: {
    backgroundColor: '#3686F7',
  },
  time: {
    fontSize: 13,
    color: '#222',
    marginBottom: 2,
  },
  nowText: {
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    marginVertical: 2,
  },
  temp: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  nowLabel: {
    fontSize: 11,
    color: 'white',
    marginTop: 2,
    fontWeight: 'bold',
  },
});

export default HourlyForecastItem; 