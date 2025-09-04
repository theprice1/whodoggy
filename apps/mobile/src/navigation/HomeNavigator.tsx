import { createStackNavigator } from "@react-navigation/stack";
import DogDetailScreen from "../screens/Home/DogDetailScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import QRScannerScreen from "../screens/Home/QRScannerScreen";
import SearchResultsScreen from "../screens/Home/SearchResultsScreen";
import SearchScreen from "../screens/Home/SearchScreen";
import SettingsNavigator from "./SettingsNavigator";

// Define proper types for your search results
interface DogResult {
	id: string;
	name: string;
	breed: string;
	owner?: string;
	microchipId?: string;
	// Add other properties as needed
}

export type RootStackParamList = {
	Home: undefined;
	QRScanner: undefined;
	Search: undefined;
	SearchResults: { results?: DogResult[] };
	DogDetail: { dogId: string };
	SettingsStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function HomeNavigator() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "WhoDoggy" }}
			/>
			<Stack.Screen
				name="QRScanner"
				component={QRScannerScreen}
				options={{ title: "Scan QR Code" }}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{ title: "Search" }}
			/>
			<Stack.Screen
				name="SearchResults"
				component={SearchResultsScreen}
				options={{ title: "Search Results" }}
			/>
			<Stack.Screen
				name="DogDetail"
				component={DogDetailScreen}
				options={{ title: "Dog Details" }}
			/>
			<Stack.Screen
				name="SettingsStack"
				component={SettingsNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
