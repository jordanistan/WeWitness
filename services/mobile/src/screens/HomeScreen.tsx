import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../state/AuthContext';
import { HomeScreenProps } from '../navigation/types';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { setToken } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Upload Video" onPress={() => navigation.navigate('VideoUpload')} />
        <Button title="Manage Incidents" onPress={() => { /* TODO: Navigate to Incident Management */ }} />
        <Button title="Log Out" onPress={() => setToken(null)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    height: 150,
  },
});

export default HomeScreen;
