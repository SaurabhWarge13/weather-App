import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface dummy {
  value: string;
}

interface DailyForecastItemProps {
  day: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  icon: React.ReactNode;
}

const DailyForecastItem: React.FC<DailyForecastItemProps> = ({
  day,
  date,
  maxTemp,
  minTemp,
  icon,
}) => {
  const dummydATA: dummy = {value: 'SAURABH'};
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>

      <View style={styles.middle}>
        <Text style={styles.day}>
          {day} {dummydATA.value}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.temps}>
        <Text style={styles.maxTemp}>{maxTemp}°</Text>
        <Text style={styles.minTemp}> / {minTemp}°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    // paddingHorizontal: 16,
  },
  iconWrapper: {
    width: 30,
    alignItems: 'center',
    marginRight: 20,
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  day: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    fontSize: 13,
    opacity: 0.7,
    marginLeft: 5,
  },
  temps: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  maxTemp: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  minTemp: {
    color: 'white',
    fontSize: 15,
    opacity: 0.7,
    marginLeft: 4,
  },
});

export default DailyForecastItem;
