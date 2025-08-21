import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ContactSupportScreen() {
  return (
    <View style={styles.container}>
      <Text>ContactSupportScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
