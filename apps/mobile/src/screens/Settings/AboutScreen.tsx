import React from "react";
import { StyleSheet, Text, View } from "...";

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Text>AboutScreen</Text>
		</View>
	);
}

const _styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
