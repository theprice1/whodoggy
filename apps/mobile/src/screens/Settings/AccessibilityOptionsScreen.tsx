import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

const AccessibilityOptionsScreen = () => {
	const [largeText, setLargeText] = useState(false);
	const [highContrast, setHighContrast] = useState(false);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.headerText}>Accessibility Options</Text>

			<View style={styles.optionRow}>
				<Text style={styles.optionText}>Enable Large Text</Text>
				<Switch value={largeText} onValueChange={setLargeText} />
			</View>

			<View style={styles.optionRow}>
				<Text style={styles.optionText}>Enable High Contrast</Text>
				<Switch value={highContrast} onValueChange={setHighContrast} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	optionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	optionText: {
		fontSize: 16,
	},
});

export default AccessibilityOptionsScreen;
