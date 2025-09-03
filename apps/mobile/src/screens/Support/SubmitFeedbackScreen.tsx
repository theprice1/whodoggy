import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "...";

const _colors = {
	gray300: "#D1D5DB", // Tailwind gray-300
};

const _SubmitFeedbackScreen = () => {
	const [feedback, setFeedback] = useState("");

	const _handleSubmit = () => {
		if (!feedback.trim()) {
			Alert.alert("Error", "Please enter your feedback before submitting.");
			return;
		}
		// TODO: Connect to backend or send feedback via API
		Alert.alert("Thank you!", "Your feedback has been submitted.");
		setFeedback("");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.headerText}>Submit Feedback</Text>

			<Text style={styles.descriptionText}>
				We appreciate your feedback to improve WhoDoggy?. Please share your
				thoughts below.
			</Text>

			<TextInput
				value={feedback}
				onChangeText={setFeedback}
				multiline
				placeholder="Enter your feedback here..."
				style={styles.feedbackInput}
				accessibilityLabel="Feedback input"
			/>

			<Button
				title="Submit"
				onPress={handleSubmit}
				accessibilityLabel="Submit feedback button"
			/>
		</ScrollView>
	);
};

const _styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
	},
	descriptionText: {
		marginBottom: 16,
	},
	feedbackInput: {
		borderColor: colors.gray300,
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 24,
		minHeight: 100,
		padding: 12,
		textAlignVertical: "top", // aligns multiline text to top on Android
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
});

export default SubmitFeedbackScreen;
