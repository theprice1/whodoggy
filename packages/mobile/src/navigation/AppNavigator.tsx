import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import SearchScreen from '../screens/SearchScreen';
import ResultsScreen from '../screens/ResultsScreen.tsx';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  QRScanner: undefined;
  Search: { microchipId: string };
  Results: { dogInfo: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
