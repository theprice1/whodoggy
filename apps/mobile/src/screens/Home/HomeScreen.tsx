// src/screens/HomeScreen.tsx

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to WhoDoggy?</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Scan Microchip"
          onPress={() => navigation.navigate("QRScanner")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Search Microchip"
          onPress={() => navigation.navigate("Search")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#2563eb",
  },
  buttonContainer: {
    marginBottom: 16,
  },
});

export default HomeScreen;
