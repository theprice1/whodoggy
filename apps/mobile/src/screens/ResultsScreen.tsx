import React from 'react';
import { View, Text } from 'react-native';

const ResultsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { dogInfo } = route.params || {};

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Search Results</Text>
      {dogInfo ? (
        <>
          <Text>Name: {dogInfo.dogName}</Text>
          <Text>Owner: {dogInfo.owner}</Text>
          <Text>Last Seen: {dogInfo.lastSeen}</Text>
          <Text>Source DB: {dogInfo.sourceDB}</Text>
        </>
      ) : (
        <Text>No results to display</Text>
      )}
    </View>
  );
};

export default ResultsScreen;
