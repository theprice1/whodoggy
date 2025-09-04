import {
	Alert,
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
} from "../../../../../";
import { useState } from "../../../../../";

// Define colors as constants to avoid color literals in styles
const _COLORS = {
	gray300: "#D1D5DB",
};

const _ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const _handleSave = () => {
		Alert.alert("Profile Saved", `Name: ${name}\nEmail: ${email}`);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Your Profile</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="Enter your name"
				style={styles.input}
				accessibilityLabel="Name input"
			/>

			<Text style={styles.label}>Email</Text>
			<TextInput
				value={email}
				onChangeText={setEmail}
				placeholder="Enter your email"
				keyboardType="email-address"
				style={styles.input}
				accessibilityLabel="Email input"
			/>

			<Button
				title="Save Profile"
				onPress={handleSave}
				accessibilityLabel="Save profile button"
			/>
		</ScrollView>
	);
};

const _styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
	},
	input: {
		borderColor: COLORS.gray300,
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 16,
		padding: 8,
	},

	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
});

export default ProfileScreen;
