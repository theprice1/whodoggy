import { StyleSheet, Text, View } from "react-native";

const ReportFoundDogScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Report Found Dog</Text>
    <Text style={styles.description}>
      Use this screen to report a found dog and help reunite it with its owner.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default ReportFoundDogScreen;
