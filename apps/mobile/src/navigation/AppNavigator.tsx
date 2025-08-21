// src/navigation/AppNavigator.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import HomeScreen from "../screens/Home/HomeScreen.js";
import QRScannerScreen from "../screens/Home/QRScannerScreen.js";
import SearchScreen from "../screens/Home/SearchScreen.js";
// import SearchResultsScreen from '../screens/SearchResultsScreen.js'.ts; // Uncomment when implemented

export type RootStackParamList = {
  Home: undefined;
  QRScanner: undefined;
  Search: undefined;
  // SearchResults: { results: any }; // Define params if needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "WhoDoggy?" }} />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{ title: "Scan Microchip" }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Microchip" }}
      />
      {/* <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ title: 'Search Results' }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
