import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function HelpScreen() {
  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold">Help & Responsible Use</Text>
      <Text className="mt-2">
        WhoDoggy? is a prototype for scanning QR-coded dog tags. 
        Do not scan real dogs in public or private areas without consent.
        Never approach a guide or service dog.
      </Text>
    </ScrollView>
  );
}