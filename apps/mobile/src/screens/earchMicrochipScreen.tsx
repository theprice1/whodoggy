import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { fetchMicrochipById } from '../services/api';

export default function SearchMicrochipScreen() {
  const [id, setId] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setResults([]);
    try {
      const data = await fetchMicrochipById(id);
      setResults(data);
      if (data.length === 0) {
        setError('No records found.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter microchip ID"
        value={id}
        onChangeText={setId}
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          padding: 8,
          marginBottom: 10,
        }}
      />
      <Button title="Search" onPress={handleSearch} />
      {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
      <ScrollView style={{ marginTop: 20 }}>
        {results.map((record, idx) => (
          <View
            key={idx}
            style={{
              marginBottom: 15,
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
          >
            <Text>Name: {record.dogName}</Text>
            <Text>Breed: {record.breed}</Text>
            <Text>Owner: {record.ownerName}</Text>
            <Text>Owner Email: {record.ownerEmail}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
