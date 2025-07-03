import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchMicrochipData } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'QRScanner'>;

const QRScannerScreen: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);

    // Assuming data is microchip ID
    try {
      const results = await fetchMicrochipData(data);
      if (results.length === 0) {
        Alert.alert('No Data Found', 'No dog information found for this microchip.');
        setScanned(false);
      } else {
        navigation.navigate('Results', { dogInfo: results[0] });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch dog data.');
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please allow camera permissions.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QRScannerScreen;
