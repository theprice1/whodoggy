import { createNativeStackNavigator } from "../../../../";
import type React from "react";
import ConsentScreen from "../screens/Auth/ConsentScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";

export type AuthStackParamList = {
	Welcome: undefined;
	SignIn: undefined;
	SignUp: undefined;
	Consent: undefined;
	ForgotPassword: undefined;
};

const _Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
	return (
		<Stack.Navigator initialRouteName="Welcome">
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
			<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="Consent" component={ConsentScreen} />
			<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
		</Stack.Navigator>
	);
};

export default AuthNavigator;
