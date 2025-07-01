import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SearchScreen: React.FC = () => {
  const [chipId, setChipId] = useState('');

  const onSearch = () => {
    // TODO: Call backend API and show results
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Search Microchip</Text>
      <TextInput
        placeholder="Enter microchip number"
        value={chipId}
        onChangeText={setChipId}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          marginVertical: 16,
          borderRadius: 4,
        }}
      />
      <Button title="Search" onPress={onSearch} />
    </View>
  );
};

export default SearchScreen;
