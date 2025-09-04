// src/screens/SearchScreen.tsx

import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	useState,
	View,
} from "../../../../../";
import type React from "react";

type SearchScreenProps = {
	navigation: {
		goBack: () => void;
	};
};

const SearchScreen: React.FC<SearchScreenProps> = ({
	navigation: _navigation,
}) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<string[]>([]); // Replace string[] with your data type

	const _handleSearch = () => {
		// TODO: Implement actual search logic here, e.g., API call
		// For demo, just simulate a result with the query string:
		if (query.trim()) {
			setResults([`Simulated result for: ${query.trim()}`]);
		} else {
			setResults([]);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Search Microchip</Text>

			<TextInput
				style={styles.input}
				placeholder="Enter microchip ID or info"
				value={query}
				onChangeText={setQuery}
			/>

			<Button title="Search" onPress={handleSearch} />

			<FlatList
				data={results}
				keyExtractor={(_item, index) => index.toString()}
				style={styles.resultsList}
				renderItem={({ item }) => (
					<View style={styles.resultItem}>
						<Text>{item}</Text>
					</View>
				)}
				ListEmptyComponent={
					<Text style={styles.noResults}>No results found.</Text>
				}
			/>
		</View>
	);
};

const _styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 20,
		marginBottom: 12,
		color: "#2563eb",
		fontWeight: "600",
	},
	input: {
		borderWidth: 1,
		borderColor: "#d1d5db",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
	},
	resultsList: {
		marginTop: 16,
	},
	resultItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#e5e7eb",
	},
	noResults: {
		marginTop: 20,
		color: "#6b7280",
		fontStyle: "italic",
		textAlign: "center",
	},
});

export default SearchScreen;
