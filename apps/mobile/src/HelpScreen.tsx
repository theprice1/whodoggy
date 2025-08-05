// apps/mobile/src/screens/HelpScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import InfoDialog from '../components/InfoDialog.js';

const HelpScreen = () => {
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>WhoDoggy Help & Support</Text>

        <Text style={styles.sectionTitle}>How to Use WhoDoggy</Text>
        <Text style={styles.text}>
          - Scan your dog’s microchip using the mobile scanner available in the app.{'\n'}
          - Search dog records by entering the microchip ID.{'\n'}
          - View details about the dog and its owner.{'\n'}
          - Use the info button below for additional app information.
        </Text>

        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <Text style={styles.text}>
          Your data is securely handled in compliance with privacy laws. Only authorized users can access sensitive data.
        </Text>

        <Button title="More Info" onPress={() => setInfoVisible(true)} />
      </ScrollView>

      <InfoDialog
        visible={infoVisible}
        onClose={() => setInfoVisible(false)}
        title="About WhoDoggy"
        message="WhoDoggy helps you identify lost dogs quickly by scanning their microchip or searching our trusted registries. Always ensure you have permission to use the app's scanning features."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  scrollContent: { paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 24, color: '#333' },
});

export default HelpScreen;
