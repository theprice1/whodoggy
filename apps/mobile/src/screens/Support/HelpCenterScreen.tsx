import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const HelpCenterScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Help Center</Text>
      <Text>
        Here you can find answers to frequently asked questions and contact support.
      </Text>
      {/* Add FAQ, contact info, or links */}
    </ScrollView>
  );
};

export default HelpCenterScreen;
