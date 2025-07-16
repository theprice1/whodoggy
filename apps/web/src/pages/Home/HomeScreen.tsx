import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        Welcome to WhoDoggy?
      </Text>
      <Button
        title="Scan Microchip"
        onPress={() => navigation.navigate('QRScanner')}
      />
      <Button
        title="Search Microchip"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
};

export default HomeScreen;
