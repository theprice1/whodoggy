import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import AccessibilityOptionsScreen from "../screens/Settings/AccessibilityOptionsScreen";
import AboutScreen from "../screens/Settings/AboutScreen";
import PrivacyPolicyScreen from "../screens/Settings/PrivacyPolicyScreen";
import TermsOfUseScreen from "../screens/Settings/TermsOfUseScreen";

export type SettingsStackParamList = {
  Settings: undefined;
  Profile: undefined;
  AccessibilityOptions: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AccessibilityOptions" component={AccessibilityOptionsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
