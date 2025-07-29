import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

const SubmitFeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
      return;
    }
    // TODO: Connect to backend or send feedback via API
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setFeedback('');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Submit Feedback</Text>

      <Text style={{ marginBottom: 16 }}>
        We appreciate your feedback to improve WhoDoggy?. Please share your thoughts below.
      </Text>

      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        multiline
        placeholder="Enter your feedback here..."
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB', // Tailwind gray-300
          borderRadius: 8,
          padding: 12,
          marginBottom: 24,
          minHeight: 100,
        }}
        accessibilityLabel="Feedback input"
      />

      <Button title="Submit" onPress={handleSubmit} accessibilityLabel="Submit feedback button" />
    </ScrollView>
  );
};

export default SubmitFeedbackScreen;
