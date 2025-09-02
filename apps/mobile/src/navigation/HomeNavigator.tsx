import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import QRScannerScreen from "../screens/Home/QRScannerScreen";
import SearchScreen from "../screens/Home/SearchScreen";
import SearchResultsScreen from "../screens/Home/SearchResultsScreen";
import DogDetailScreen from "../screens/Home/DogDetailScreen";
import SettingsNavigator from "./SettingsNavigator";
import ReportsNavigator from "./ReportsNavigator";
import HistoryNavigator from "./HistoryNavigator";

export type HomeStackParamList = {
  Home: undefined;
  QRScanner: undefined;
  Search: undefined;
  SearchResults: { results?: any };
  DogDetail: { dogId: string };
  SettingsStack: undefined;
  ReportsStack: undefined;
  HistoryStack: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "WhoDoggy?" }} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: "Scan Microchip" }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Search Microchip" }} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: "Search Results" }} />
      <Stack.Screen name="DogDetail" component={DogDetailScreen} options={{ title: "Dog Details" }} />
      <Stack.Screen name="SettingsStack" component={SettingsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ReportsStack" component={ReportsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryStack" component={HistoryNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
