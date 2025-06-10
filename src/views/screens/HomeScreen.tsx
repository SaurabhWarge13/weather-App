import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  AppState,
  AppStateStatus,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/weather';
import {formatTime} from '../../utils/weatherUtils';
import WeatherCard from '../components/WeatherCard';
import {
  CloudIcon,
  RainIcon,
  SunIcon,
  HamburgerIcon,
  MoreIcon,
} from '../components/WeatherIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import {WeatherModel} from '../../models/WeatherModel';
import {WeatherController} from '../../controllers/WeatherController';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const getWeatherSvg = (main: string) => {
  switch (main.toLowerCase()) {
    case 'rain':
      return <RainIcon size={32} />;
    case 'clear':
      return <SunIcon size={32} />;
    case 'clouds':
      return <CloudIcon size={32} />;
    default:
      return <CloudIcon size={32} />;
  }
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null);
  
  const model = new WeatherModel();
  const controller = new WeatherController(model);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextState => {
      if (appStateRef.current.match(/inactive|background/) && nextState === 'active') {
        if (location) {
          setLoading(true);
          try {
            await controller.fetchWeatherData(location);
          } catch (err) {
            setError('Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        }
      }
      appStateRef.current = nextState;
    });

    return () => subscription.remove();
  }, [location]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const locationData = await controller.fetchLocation();
        if (locationData) {
          setLocation(locationData);
          await controller.fetchWeatherData(locationData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const renderHourlyForecast = ({item, index}: {item: any; index: number}) => {
    const isNow = index === 0;
    return (
      <View style={[styles.hourlyCard, isNow && styles.hourlyCardNow]}>
        <Text style={[styles.hourlyTime, isNow && styles.hourlyTimeNow]}>
          {formatTime(item.dt)}
        </Text>
        <View style={styles.hourlyIcon}>{getWeatherSvg(item.main)}</View>
        {!isNow && (
          <Text style={[styles.hourlyTemp, isNow && styles.hourlyTempNow]}>
            {Math.round(item.temp)}°
          </Text>
        )}
        {isNow && <Text style={styles.nowLabel}>Now</Text>}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F7" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const currentWeather = controller.getCurrentWeather();
  if (!currentWeather) {
    return null;
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.headerIconsRow}>
        <HamburgerIcon />
        <MoreIcon />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerCity}>
          {currentWeather.name},{' '}
          <Text style={styles.headerCountry}>{currentWeather.sys.country}</Text>
        </Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{paddingBottom: 24}}>
        <WeatherCard
          city={currentWeather.name}
          country={currentWeather.sys.country}
          weatherMain={currentWeather.weather[0].main}
          weatherDesc={currentWeather.weather[0].description}
          date={new Date(currentWeather.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
          })}
          temperature={Math.round(currentWeather.main.temp)}
          wind={`${currentWeather.wind.speed} km/j`}
          feelsLike={Math.round(currentWeather.main.feels_like)}
          pressure={currentWeather.main.pressure}
          uvIndex={1}
        />
        <View style={styles.hourlySection}>
          <View style={styles.hourlyHeader}>
            <Text style={styles.hourlyTitle}>Today</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forecast')}
              style={styles.next7Button}>
              <Text style={styles.next7Text}>Next 5 Days &gt;</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={controller.getTodayForecasts()}
            renderItem={renderHourlyForecast}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.dt.toString()}
            style={styles.hourlyList}
            contentContainerStyle={{paddingHorizontal: 8}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.lightBlueBackground,
  },
  headerIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerRow: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
  },
  headerCity: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  headerCountry: {
    fontWeight: '400',
    color: COLORS.black,
    opacity: 0.6,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.errorRed,
    textAlign: 'center',
    fontSize: 16,
  },
  hourlySection: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  hourlyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  hourlyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  next7Button: {
    padding: 4,
  },
  next7Text: {
    color: COLORS.next7Text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  hourlyList: {
    marginTop: 0,
  },
  hourlyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.pink,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 6,
    minWidth: 64,
    elevation: 1,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  hourlyCardNow: {
    backgroundColor: COLORS.hourlyCardNow,
  },
  hourlyTime: {
    fontSize: 13,
    color: COLORS.black,
    marginBottom: 2,
  },
  hourlyTimeNow: {
    color: COLORS.hourlyCardNowText,
    fontWeight: 'bold',
  },
  hourlyIcon: {
    marginVertical: 2,
  },
  hourlyTemp: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  hourlyTempNow: {
    color: COLORS.hourlyCardNowText,
    fontWeight: 'bold',
  },
  nowLabel: {
    fontSize: 11,
    color: COLORS.hourlyCardNowText,
    marginTop: 2,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
