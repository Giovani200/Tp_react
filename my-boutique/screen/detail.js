import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../constants/api';

export default function Detail({ route, navigation }) {
  const [user, setUser] = useState(null);

  // Extraction de la valeur "id" et de la fonction de rappel à partir des paramètres de la route actuelle
  const { id, onUserDeleted, onUserUpdate } = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, status } = await axios.get(`${URL.FETCH_USER_BYID}/${id}`);
        if (status === 200) {
          setUser(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
      }
    };
    fetchUser();
  }, [id]);

  const deleteUser = async () => {
    try {
      const { data, status } = await axios.put(`${URL.DELETE_USER}/${id}`, {});
      if (status === 200) {
        console.log(data);
        onUserDeleted(); // Appeler la fonction de rappel pour rafraîchir la liste des utilisateurs
        navigation.goBack(); // Retourner à l'écran précédent après la suppression
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error.message);
    }
  };

  if (!user) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prénom:</Text>
      <Text style={styles.value}>{user.prenom}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Supprimer" onPress={deleteUser} color="#dc3545" />
        <Button title="Modifier" onPress={() => navigation.navigate('Update', { id, onUserUpdate })} color="#007bff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});