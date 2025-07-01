import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      {/* TODO: Add email/password inputs and login logic */}
      <Button title="Sign In" onPress={() => {}} />
    </View>
  );
};

export default LoginScreen;
