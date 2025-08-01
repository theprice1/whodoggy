import React from 'react';
import { ScrollView, Text } from 'react-native';
import { styles } from './HelpCenterScreen.styles.ts';

const HelpCenterScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Help Center</Text>
      <Text>
        Here you can find answers to frequently asked questions and contact
        support.
      </Text>
      {/* Add FAQ, contact info, or links */}
    </ScrollView>
  );
};

export default HelpCenterScreen;
