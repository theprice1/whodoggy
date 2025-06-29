// mobile/src/screens/UserSettings.tsx
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

export default function UserSettings() {

  const reportMisuse = () => {
    Alert.alert(
      "Report Misuse",
      "To report misuse, please email abuse@whodoggy.com or contact support through the website.",
      [{ text: "OK" }]
    );
  };

  const deleteData = () => {
    Alert.alert(
      "Delete My Data",
      "Are you sure you want to request deletion of your personal data? This action is irreversible.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => handleDeleteRequest() }
      ]
    );
  };

  const handleDeleteRequest = async () => {
    try {
      // Replace URL with your backend endpoint
      const response = await fetch('https://your-backend-api.com/api/delete-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming you have an auth token stored somewhere
          'Authorization': 'Bearer YOUR_AUTH_TOKEN'
        },
        body: JSON.stringify({ /* userId or user info if needed */ })
      });

      if (response.ok) {
        Alert.alert("Request Sent", "Your data deletion request has been received and will be processed within 30 days.");
      } else {
        Alert.alert("Error", "Failed to send deletion request. Please try again later.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Report Misuse" onPress={reportMisuse} />
      <Button title="Delete My Data" color="red" onPress={deleteData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
});
// This file is part of the WhoDoggy app, which is licensed under the GNU General Public License v3.0.
// You can redistribute it and/or modify it under the terms of the GPL-3.0 License.