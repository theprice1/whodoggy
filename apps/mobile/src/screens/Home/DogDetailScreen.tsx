import React from "react";
import { StyleSheet, Text, View } from "...";

export default function DogDetailScreen() {
	return (
		<View style={styles.container}>
			<Text>DogDetailScreen</Text>
		</View>
	);
}

const _styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
