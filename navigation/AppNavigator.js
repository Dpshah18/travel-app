import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../components/Landing';
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import MapPage from '../components/MapPage';
import RealTimeTranslationPage from './../components/RealTimeTranslationPage';
import EmergencyPage from '../components/EmergencyPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} />
\      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="MapPage" component={MapPage} />
      <Stack.Screen name="RealTimeTranslationPage" component={RealTimeTranslationPage} />
      <Stack.Screen name="EmergencyPage" component={EmergencyPage} />
    </Stack.Navigator>
  );
}