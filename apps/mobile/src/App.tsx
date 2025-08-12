import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator.js';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Ensures content is not obscured by device notches or status bar */}
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
