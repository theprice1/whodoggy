import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";

const _colors = {
  gray300: "#D1D5DB",
};

const SubmitFeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");

  const _handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert("Error", "Please enter your feedback before submitting.");
      return;
    }
    Alert.alert("Thank you!", "Your feedback has been submitted.");
    setFeedback("");
  };

  return (
    <ScrollView contentContainerStyle={_styles.container}>
      <Text style={_styles.headerText}>Submit Feedback</Text>

      <Text style={_styles.descriptionText}>
        We appreciate your feedback to improve WhoDoggy?. Please share your thoughts below.
      </Text>

      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        multiline
        placeholder="Enter your feedback here..."
        style={_styles.feedbackInput}
        accessibilityLabel="Feedback input"
      />

      <Button
        title="Submit"
        onPress={_handleSubmit}
        accessibilityLabel="Submit feedback button"
      />
    </ScrollView>
  );
};

const _styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  descriptionText: {
    marginBottom: 16,
  },
  feedbackInput: {
    borderColor: _colors.gray300,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
    minHeight: 100,
    padding: 12,
    textAlignVertical: "top",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
});

export default SubmitFeedbackScreen;
