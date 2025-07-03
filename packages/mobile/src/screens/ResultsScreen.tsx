import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC<Props> = ({ route }) => {
  const { dogInfo } = route.params ?? {};

  if (!dogInfo) {
    return (
      <View style={styles.centered}>
        <Text>No dog information available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.title}>{dogInfo.dogName}</Text>
      <Text>Breed: {dogInfo.breed}</Text>
      <Text>Date of Birth: {new Date(dogInfo.dateOfBirth).toLocaleDateString()}</Text>
      <Text>Gender: {dogInfo.gender}</Text>
      <Text>Vaccinated: {dogInfo.vaccinated ? 'Yes' : 'No'}</Text>
      <Text>Last Checkup: {new Date(dogInfo.lastCheckup).toLocaleDateString()}</Text>
      <Text>Microchip ID: {dogInfo.microchipId}</Text>

      <Text style={styles.sectionTitle}>Owner Information</Text>
      <Text>Name: {dogInfo.ownerName}</Text>
      <Text>Email: {dogInfo.ownerEmail}</Text>
      <Text>Phone: {dogInfo.ownerPhone}</Text>
      <Text>City: {dogInfo.ownerCity}</Text>

      <Text style={styles.sectionTitle}>Additional Notes</Text>
      <Text>{dogInfo.notes}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ResultsScreen;
