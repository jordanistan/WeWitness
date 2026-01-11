import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { IncidentDetailScreenProps } from '../navigation/types';
import api from '../api/api';

interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
}

const IncidentDetailScreen = ({ route }: IncidentDetailScreenProps) => {
  const { incidentId } = route.params;
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/incidents/${incidentId}`);
        setIncident(response.data);
      } catch (error) {
        console.error('Failed to fetch incident details:', error);
        Alert.alert('Error', 'Could not load incident details.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [incidentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!incident) {
    return <Text style={styles.errorText}>Incident not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{incident.title}</Text>
      <Text style={styles.status}>Status: {incident.status}</Text>
      <Text style={styles.description}>{incident.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
  },
  description: {
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default IncidentDetailScreen;
