import {
	colors,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useNavigation,
} from "../../../../../";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation.js";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Settings">;

const _SettingsScreen = () => {
	const _navigation = useNavigation<NavigationProp>();

	const _handleNavigation = (route: keyof RootStackParamList) => {
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

const _styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	option: {
		borderBottomColor: colors.gray300,
		borderBottomWidth: 1,
		paddingVertical: 12,
	},
	optionText: {
		fontSize: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
});

export default SettingsScreen;
