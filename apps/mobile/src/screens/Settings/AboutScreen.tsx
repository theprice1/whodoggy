import { StyleSheet, Text, View } from "react-native";

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About WhoDoggy</Text>
    <Text style={styles.version}>Version 1.0.0</Text>
    <Text style={styles.description}>
      WhoDoggy helps reunite lost dogs with their owners through microchip scanning and registry searching.
    </Text>
    <Text style={styles.copyright}>
      © 2025 WhoDoggy. All rights reserved.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  copyright: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default AboutScreen;
