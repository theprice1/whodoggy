import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

type SettingOption = {
  title: string;
  onPress: () => void;
};

const SettingsScreen = ({ navigation }: any) => {
  // Define the settings options with navigation actions
  const settingsOptions: SettingOption[] = [
    { title: 'Profile', onPress: () => navigation.navigate('Profile') },
    { title: 'Accessibility Options', onPress: () => navigation.navigate('AccessibilityOptions') },
    { title: 'Privacy Policy', onPress: () => navigation.navigate('PrivacyPolicy') },
    { title: 'Terms of Use', onPress: () => navigation.navigate('TermsOfUse') },
    { title: 'About', onPress: () => navigation.navigate('About') },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Settings</Text>
      {settingsOptions.map(({ title, onPress }) => (
        <TouchableOpacity
          key={title}
          onPress={onPress}
          style={styles.optionButton}
          accessibilityRole="button"
          accessibilityLabel={`Navigate to ${title}`}
        >
          <Text style={styles.optionText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB', // gray-300
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
