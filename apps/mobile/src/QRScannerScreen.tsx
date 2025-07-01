import React from 'react';
import { View, Text } from 'react-native';

const QRScannerScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>QR Scanner (mobile camera access here)</Text>
      {/* TODO: Implement QR scanning with vision-camera or react-native-camera */}
    </View>
  );
};

export default QRScannerScreen;
