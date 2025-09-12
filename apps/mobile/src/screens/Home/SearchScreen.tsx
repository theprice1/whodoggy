import React, { useState } from "react";
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

export default function SearchScreen() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<string[]>([]);

	const handleSearch = () => {
		// Dummy search logic: filter from a static list or call your API
		const dummyData = ["Dog 1", "Dog 2", "Dog 3", "Dog 4"];
		const filtered = dummyData.filter((dog) =>
			dog.toLowerCase().includes(query.toLowerCase()),
		);
		setResults(filtered);
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Enter dog name"
				value={query}
				onChangeText={setQuery}
			/>
			<Button title="Search" onPress={handleSearch} />

			<FlatList
				data={results}
				keyExtractor={(_item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.resultItem}>
						<Text>{item}</Text>
					</View>
				)}
				ListEmptyComponent={
					<Text style={styles.noResults}>No results found.</Text>
				}
				style={styles.resultsList}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: "#fff" },
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 8,
		marginBottom: 12,
	},
	resultItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	resultsList: {
		marginTop: 16,
	},
	noResults: {
		marginTop: 16,
		textAlign: "center",
		color: "#999",
	},
});
