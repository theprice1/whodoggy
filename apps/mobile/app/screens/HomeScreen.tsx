import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Welcome to WhoDoggy!</Text>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('Scanner')}
      />
    </View>
  );
}
