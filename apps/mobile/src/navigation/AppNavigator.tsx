import type React from "react";
import { NavigationContainer } from "...";
import { createNativeStackNavigator } from "...";
import { useAuth } from "...";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

export type RootStackParamList = {
	Auth: undefined;
	Main: undefined;
};

const _Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return null; // Replace with SplashScreen if you have one
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{!user ? (
					<Stack.Screen name="Auth" component={AuthNavigator} />
				) : (
					<Stack.Screen name="Main" component={HomeNavigator} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
