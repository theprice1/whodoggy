import React, { useState } from "react";
import { View, Text, Switch, ScrollView, StyleSheet } from "react-native";

const AccessibilityOptionsScreen = () => {
  const [largeTextEnabled, setLargeTextEnabled] = useState(false);
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Accessibility Options</Text>

      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Enable Large Text</Text>
        <Switch
          value={largeTextEnabled}
          onValueChange={setLargeTextEnabled}
          accessibilityLabel="Toggle large text"
          accessibilityHint="Turns on larger font size for better readability"
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={styles.optionText}>Enable High Contrast</Text>
        <Switch
          value={highContrastEnabled}
          onValueChange={setHighContrastEnabled}
          accessibilityLabel="Toggle high contrast mode"
          accessibilityHint="Enhances contrast for better visibility"
        />
      </View>

      {/* Add more accessibility options as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  optionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
  },
});

export default AccessibilityOptionsScreen;
