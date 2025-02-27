import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../constants/api';

export default function Update({ route, navigation }) {

    // initialisation des states
  const [user, setUser] = useState({});
  const { id, onUserUpdate } = route.params;

  // Récupérer les informations de l'utilisateur par son identifiant
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, status } = await axios.get(`${URL.FETCH_USER_BYID}/${id}`);
        if (status === 200) {
          console.log('Succès de la requête');
          setUser(data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
      }
    };
    fetchUser();
  }, [id]);

  // Fonction pour mettre à jour un utilisateur
  const _onChangeText = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  // Fonction pour mettre à jour un utilisateur
  const _handleSubmit = async () => {
    try {
      const { data, status } = await axios.put(`${URL.UPDATE_USER}/${id}`, user);
      if (status === 200) {
        onUserUpdate(); // Appeler la fonction de rappel pour rafraîchir la liste des utilisateurs
        navigation.goBack(); // Retourner à l'écran précédent après la mise à jour
        console.log("User Updated !");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier l'utilisateur</Text>
      <TextInput
        style={styles.textInput}
        defaultValue={user.prenom}
        maxLength={18}
        onChangeText={(val) => _onChangeText("prenom", val)}
      />
      <TextInput
        style={styles.textInput}
        defaultValue={user.email}
        maxLength={20}
        onChangeText={(val) => _onChangeText("email", val)}
      />
      <Button title="Valider" onPress={_handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});