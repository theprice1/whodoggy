import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Privacy Policy</Text>

      <Text style={{ marginBottom: 16 }}>
        At WhoDoggy?, we respect your privacy and are committed to protecting your personal data.
      </Text>

      <Text style={{ marginBottom: 8, fontWeight: '600' }}>Information We Collect</Text>
      <Text style={{ marginBottom: 16 }}>
        We collect only the necessary information, such as microchip IDs and basic dog details, to provide our service. No personal owner data is stored without explicit consent.
      </Text>

      <Text style={{ marginBottom: 8, fontWeight: '600' }}>How We Use Your Information</Text>
      <Text style={{ marginBottom: 16 }}>
        Your data is used solely to match and retrieve dog identity information from trusted registries.
      </Text>

      <Text style={{ marginBottom: 8, fontWeight: '600' }}>Data Security</Text>
      <Text style={{ marginBottom: 16 }}>
        We implement strict security measures to protect your data from unauthorized access.
      </Text>

      <Text style={{ marginBottom: 8, fontWeight: '600' }}>Your Rights</Text>
      <Text style={{ marginBottom: 16 }}>
        You have the right to access, correct, or delete your personal data. Contact support for any requests.
      </Text>

      <Text style={{ marginBottom: 8, fontWeight: '600' }}>Contact Us</Text>
      <Text>
        For privacy inquiries, please contact privacy@whodoggy.com.
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
