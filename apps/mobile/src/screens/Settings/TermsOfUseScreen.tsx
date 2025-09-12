import { ScrollView, StyleSheet, Text } from "react-native";

const TermsOfUseScreen = () => (
	<ScrollView contentContainerStyle={styles.scrollContainer}>
		<Text style={styles.title}>Terms of Use</Text>

		<Text style={styles.paragraph}>
			By using WhoDoggy, you agree to these terms of service and our privacy
			policy.
		</Text>

		<Text style={styles.sectionTitle}>1. Use of the App</Text>
		<Text style={styles.paragraph}>
			WhoDoggy is designed to help reunite lost pets with their owners. You
			agree to use this service responsibly and provide accurate information.
		</Text>

		<Text style={styles.sectionTitle}>2. Intellectual Property</Text>
		<Text style={styles.paragraph}>
			All content and functionality in WhoDoggy is owned by us and is protected
			by copyright and other laws.
		</Text>

		<Text style={styles.sectionTitle}>3. Limitation of Liability</Text>
		<Text style={styles.paragraph}>
			WhoDoggy is provided "as is" without warranties. We are not liable for any
			damages arising from use of the service.
		</Text>

		<Text style={styles.sectionTitle}>4. Changes to Terms</Text>
		<Text style={styles.paragraph}>
			We may update these terms at any time. Continued use constitutes
			acceptance of new terms.
		</Text>
	</ScrollView>
);

const styles = StyleSheet.create({
	scrollContainer: {
		padding: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 16,
		marginBottom: 8,
	},
	paragraph: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 12,
		color: "#333",
	},
});

export default TermsOfUseScreen;
