import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type NavigationProp = any; // Replace with your actual navigation type
type RootStackParamList = {
  Profile: undefined;
  Notifications: undefined;
  Privacy: undefined;
  Support: undefined;
};

const colors = {
  gray300: "#D1D1D6",
};

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleNavigation("Profile")}
      >
        <Text style={styles.optionText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleNavigation("Notifications")}
      >
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleNavigation("Privacy")}
      >
        <Text style={styles.optionText}>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => handleNavigation("Support")}
      >
        <Text style={styles.optionText}>Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
