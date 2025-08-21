import axios from "axios";
import type React from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SearchScreen: React.FC = () => {
  const [chipId, setChipId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    if (!chipId.trim()) {
      Alert.alert("Error", "Please enter a microchip ID.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post("http://localhost:3000/api/search", {
        microchipId: chipId,
      }); // Change localhost to your LAN IP if testing on device
      setResult(response.data);
    } catch (err: any) {
      Alert.alert("Search Failed", err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Search Microchip</Text>

      <TextInput
        placeholder="Enter microchip number"
        value={chipId}
        onChangeText={setChipId}
        style={styles.input}
      />

      <button title="Search" onPress={onSearch} disabled={loading} / type="button">

      {loading && <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Dog Info</Text>
          <Text>
            <Text style={styles.label}>Name:</Text> {result.dog?.name}
          </Text>
          <Text>
            <Text style={styles.label}>Breed:</Text> {result.dog?.breed}
          </Text>
          <Text>
            <Text style={styles.label}>Microchip ID:</Text> {result.dog?.microchip_id}
          </Text>
          <Text>
            <Text style={styles.label}>Owner:</Text> {result.owner?.name}
          </Text>
          <Text>
            <Text style={styles.label}>Registry:</Text> {result.registry?.name}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
});

export default SearchScreen;

