import React from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const emergencyNumbers = [
  { id: '1', service: 'Police', number: '911' },
  { id: '2', service: 'Ambulance', number: '911' },
  { id: '3', service: 'Fire Brigade', number: '911' },
  // Add more emergency numbers as needed
];

const EmergencyPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Numbers</Text>
      <FlatList
        data={emergencyNumbers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.service}>{item.service}</Text>
            <Text style={styles.number}>{item.number}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  service: {
    fontSize: 18,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EmergencyPage;