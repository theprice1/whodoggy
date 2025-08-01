import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConsentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consent & Privacy</Text>
      <Text style={styles.text}>
        Please read and accept our privacy policy to continue using the app.
      </Text>
      <Button
        title="Accept"
        onPress={() => {
          // Handle consent acceptance, e.g. navigation to next screen
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    marginBottom: 24,
  },
});

export default ConsentScreen;
