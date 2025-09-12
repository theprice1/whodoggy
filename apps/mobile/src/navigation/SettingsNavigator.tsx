import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import AboutScreen from "../screens/Settings/AboutScreen";
import AccessibilityOptionsScreen from "../screens/Settings/AccessibilityOptionsScreen";
import PrivacyPolicyScreen from "../screens/Settings/PrivacyPolicyScreen";
import ProfileScreen from "../screens/Settings/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import TermsOfUseScreen from "../screens/Settings/TermsOfUseScreen";

export type SettingsStackParamList = {
	Settings: undefined;
	Profile: undefined;
	AccessibilityOptions: undefined;
	About: undefined;
	PrivacyPolicy: undefined;
	TermsOfUse: undefined;
};

const _Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsNavigator: React.FC = () => {
	return (
		<_Stack.Navigator initialRouteName="Settings">
			<_Stack.Screen name="Settings" component={SettingsScreen} />
			<_Stack.Screen name="Profile" component={ProfileScreen} />
			<_Stack.Screen
				name="AccessibilityOptions"
				component={AccessibilityOptionsScreen}
			/>
			<_Stack.Screen name="About" component={AboutScreen} />
			<_Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
			<_Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
		</_Stack.Navigator>
	);
};

export default SettingsNavigator;
