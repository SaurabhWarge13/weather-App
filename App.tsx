/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/weather';
import HomeScreen from './src/views/screens/HomeScreen';
import ForecastScreen from './src/views/screens/ForecastScreen';
import { WeatherProvider } from './src/context/WeatherContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  console.log("App");
  
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
          headerShown:false
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Weather App',
            }}
          />
          <Stack.Screen 
            name="Forecast" 
            component={ForecastScreen}
            options={{
              title: '7-Day Forecast',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
}

export default App;
