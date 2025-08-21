// src/screens/QRScannerScreen.tsx

import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

type QRScannerScreenProps = {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
};

const QRScannerScreen: React.FC<QRScannerScreenProps> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    Alert.alert("Microchip scanned!", `ID: ${data}`, [
      {
        text: "Search",
        onPress: () => navigation.navigate("SearchResults", { microchipId: data }),
      },
      {
        text: "OK",
        onPress: () => setScanned(false),
      },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRScannerScreen;
