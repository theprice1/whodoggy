import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  // Example profile state (you might fetch/update from backend or Firebase)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Replace with real save logic
    Alert.alert('Profile Saved', `Name: ${name}\nEmail: ${email}`);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
      <Text style={styles.title}>Your Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={styles.input}
        accessibilityLabel="Name input"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.input}
        accessibilityLabel="Email input"
      />

      <Button title="Save Profile" onPress={handleSave} accessibilityLabel="Save profile button" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default ProfileScreen;
