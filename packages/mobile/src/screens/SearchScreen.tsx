import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { fetchMicrochipData, DogInfo } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [microchipId, setMicrochipId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async () => {
    if (!microchipId.trim()) {
      setError('Please enter a microchip ID');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const results = await fetchMicrochipData(microchipId.trim());
      if (results.length === 0) {
        setError('No data found for this microchip ID');
      } else {
        navigation.navigate('Results', { dogInfo: results[0] });
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Enter Microchip ID:</Text>
      <TextInput
        value={microchipId}
        onChangeText={setMicrochipId}
        placeholder="e.g. 1234567890"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Search" onPress={onSearch} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default SearchScreen;
