import React from "react";
import { ScrollView, StyleSheet, Text } from "...";

const _TermsOfUseScreen = () => {
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Text style={styles.title}>Terms of Use</Text>

			<Text style={styles.paragraph}>
				Welcome to WhoDoggy?. By using this app, you agree to comply with and be
				bound by the following terms and conditions.
			</Text>

			<Text style={styles.sectionTitle}>1. Use of the App</Text>
			<Text style={styles.paragraph}>
				You agree to use the app only for lawful purposes and in a way that does
				not infringe the rights of others.
			</Text>

			<Text style={styles.sectionTitle}>2. Intellectual Property</Text>
			<Text style={styles.paragraph}>
				All content, trademarks, and data within the app are the property of
				WhoDoggy? and its licensors.
			</Text>

			<Text style={styles.sectionTitle}>3. Limitation of Liability</Text>
			<Text style={styles.paragraph}>
				WhoDoggy? is provided &quot;as is&quot; without warranties. We are not
				liable for any damages arising from app usage.
			</Text>

			<Text style={styles.sectionTitle}>4. Changes to Terms</Text>
			<Text style={styles.paragraph}>
				We reserve the right to update these terms at any time. Continued use
				constitutes acceptance of changes.
			</Text>

			<Text>For questions, contact support@whodoggy.com.</Text>
		</ScrollView>
	);
};

export default TermsOfUseScreen;

const _styles = StyleSheet.create({
	paragraph: {
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 16,
	},
	scrollContainer: {
		flexGrow: 1,
		padding: 16,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		marginTop: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
});
