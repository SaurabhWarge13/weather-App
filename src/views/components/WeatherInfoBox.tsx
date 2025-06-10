// WeatherInfoBox.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import COLORS from '../constants/colors';

interface WeatherInfoBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    margin: 6,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.85,
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default WeatherInfoBox;
