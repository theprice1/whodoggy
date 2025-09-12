import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const helpTopics = [
	{ title: "Getting Started", description: "Learn how to use WhoDoggy" },
	{
		title: "Scanning Microchips",
		description: "How to scan and search for pets",
	},
	{ title: "Registering Pets", description: "Add your pet to the registry" },
	{
		title: "Account Settings",
		description: "Manage your profile and preferences",
	},
	{ title: "Privacy & Security", description: "Keep your information safe" },
];

const HelpCenterScreen = () => {
	const handleTopicPress = (topic: { title: string; description: string }) => {
		console.log("Selected topic:", topic.title);
		// Navigate to specific help topic
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.heading}>Help Center</Text>

			{helpTopics.map((topic, index) => (
				<TouchableOpacity
					key={index}
					style={styles.topicItem}
					onPress={() => handleTopicPress(topic)}
				>
					<Text style={styles.topicTitle}>{topic.title}</Text>
					<Text style={styles.topicDescription}>{topic.description}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	topicItem: {
		padding: 16,
		marginBottom: 12,
		backgroundColor: "#F8F9FA",
		borderRadius: 8,
		borderLeftWidth: 3,
		borderLeftColor: "#007AFF",
	},
	topicTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 4,
	},
	topicDescription: {
		fontSize: 14,
		color: "#666",
	},
});

export default HelpCenterScreen;
