import React from 'react';
import { View, Text, StatusBar } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar barStyle="dark-content" />
      <Text className="text-2xl font-bold text-blue-600">Welcome to WhoDoggy 🐶</Text>
      <Text className="mt-2 text-base text-gray-700">Your dog ID app starts here</Text>
    </View>
  );
}
// This is the main entry point for the mobile application.
// It sets up a simple welcome screen with a status bar and some text.