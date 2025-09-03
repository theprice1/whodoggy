import React from "react";
import { StyleSheet, Text, View } from "...";

export default function ForgotPasswordScreen() {
	return (
		<View style={styles.container}>
			<Text>ForgotPasswordScreen</Text>
		</View>
	);
}

const _styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
