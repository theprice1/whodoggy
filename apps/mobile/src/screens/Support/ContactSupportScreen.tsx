import { StyleSheet, Text, View } from "react-native";

const ContactSupportScreen = () => (
	<View style={styles.container}>
		<Text style={styles.title}>Contact Support</Text>
		<Text style={styles.description}>
			Need help? Get in touch with our support team.
		</Text>

		<View style={styles.contactMethod}>
			<Text style={styles.label}>Email:</Text>
			<Text style={styles.value}>support@whodoggy.com</Text>
		</View>

		<View style={styles.contactMethod}>
			<Text style={styles.label}>Phone:</Text>
			<Text style={styles.value}>1-800-WHO-DGGY</Text>
		</View>

		<View style={styles.contactMethod}>
			<Text style={styles.label}>Hours:</Text>
			<Text style={styles.value}>Monday - Friday, 9AM - 6PM EST</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		marginBottom: 30,
		color: "#666",
	},
	contactMethod: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
	},
	value: {
		fontSize: 16,
		color: "#007AFF",
	},
});

export default ContactSupportScreen;
