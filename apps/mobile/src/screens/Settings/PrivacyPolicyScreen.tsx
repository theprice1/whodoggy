import { ScrollView, StyleSheet, Text, View } from "react-native";

const PrivacyPolicyScreen = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Privacy Policy</Text>

    <Text style={styles.paragraph}>
      This Privacy Policy describes how WhoDoggy collects, uses, and protects your personal information.
    </Text>

    <Text style={styles.subheading}>Information We Collect</Text>
    <Text style={styles.paragraph}>
      We collect information you provide when registering pets, including microchip numbers, pet details, and contact information.
    </Text>

    <Text style={styles.subheading}>How We Use Your Information</Text>
    <Text style={styles.paragraph}>
      Your information is used to help reunite lost pets with their owners and maintain our pet registry database.
    </Text>

    <Text style={styles.subheading}>Data Security</Text>
    <Text style={styles.paragraph}>
      We implement appropriate security measures to protect your personal information against unauthorized access.
    </Text>

    <Text style={styles.subheading}>Your Rights</Text>
    <Text style={styles.paragraph}>
      You have the right to access, update, or delete your personal information at any time.
    </Text>

    <Text style={styles.subheading}>Contact Us</Text>
    <Text style={styles.paragraph}>
      If you have questions about this Privacy Policy, please contact us at privacy@whodoggy.com
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#333',
  },
});

export default PrivacyPolicyScreen;
