import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native'; // Added SafeAreaView for better UI on notched devices
import AppNavigator from './src/navigation/AppNavigator'; // Make sure the import path is correct

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {' '}
      {/* Ensuring the app's content is not hidden behind notches or the status bar */}
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  );
}
