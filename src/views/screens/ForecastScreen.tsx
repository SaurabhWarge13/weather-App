import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';
import {Forecast3hItem} from '../types/weather';
import {getWeatherIcon} from '../utils/weatherUtils';
import DailyForecastItem from '../components/DailyForecastItem';
import {SafeAreaView as SafeAreaViewRN} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useWeather} from '../context/WeatherContext';
import COLORS from '../constants/colors';

interface DailySummary {
  date: string;
  day: string;
  maxTemp: number;
  minTemp: number;
  icon: React.ReactNode;
}

const groupForecastByDay = (list: Forecast3hItem[]): DailySummary[] => {
  const days: {[date: string]: Forecast3hItem[]} = {};
  list.forEach(item => {
    const date = item.dt_txt.slice(0, 10);
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.entries(days)
    .slice(0, 5)
    .map(([date, items]) => {
      const maxTemp = Math.max(...items.map(i => i.main.temp_max));
      const minTemp = Math.min(...items.map(i => i.main.temp_min));
      const noon = items.find(i => i.dt_txt.includes('12:00:00')) || items[0];
      const icon = (
        <Text style={{fontSize: 24}}>
          {getWeatherIcon(noon.weather[0].main)}
        </Text>
      );
      const day = format(new Date(date), 'EEEE');
      return {date, day, maxTemp, minTemp, icon};
    });
};

const ForecastScreen = () => {
  const navigation = useNavigation();
  const {forecast3h} = useWeather();

  if (!forecast3h) {
    return null;
  }

  const dailySummaries = groupForecastByDay(forecast3h.list);

  return (
    <SafeAreaViewRN style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerCity}>
          <Text style={styles.headerCityBold}>{forecast3h.city.name}</Text>,{' '}
          <Text style={styles.headerCountry}>{forecast3h.city.country}</Text>
        </Text>
      </View>
      <Text style={styles.title}>Next 5 Days</Text>
      <FlatList
        data={dailySummaries}
        renderItem={({item}) => (
          <DailyForecastItem
            day={item.day}
            date={format(new Date(item.date), 'd MMM')}
            maxTemp={Math.round(item.maxTemp)}
            minTemp={Math.round(item.minTemp)}
            icon={item.icon}
          />
        )}
        keyExtractor={item => item.date}
        style={styles.list}
        contentContainerStyle={{paddingBottom: 24}}
      />
    </SafeAreaViewRN>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primaryBlue,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: COLORS.primaryBlue,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerCity: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    textAlign: 'center',
  },
  headerCityBold: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerCountry: {
    fontWeight: '400',
    color: COLORS.white,
    opacity: 0.7,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primaryBlue,
  },
  errorText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ForecastScreen;
