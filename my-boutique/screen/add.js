import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import axios from 'axios';
import { URL } from '../constants/api';
import { useState } from 'react';

export default function Add() {
  const [user, setUser] = useState({
    prenom: '',
    email: '',
    password: ''
  });

  const _onChangeText = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const _handleSubmit = async () => {
    try {
      const data = await axios.post(URL.POST_USER, user, {
        withCredentials: true
      });
      if (data.status === 201) {
        console.log("SUCCES CREATION");
        setUser({
          prenom: '',
          email: '',
          password: ''
        }); // Réinitialiser les champs de saisie
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error.message);
    }
  };

  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder="prenom"
        maxLength={20}
        value={user.prenom}
        onChangeText={(val) => _onChangeText("prenom", val)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="email"
        maxLength={40}
        value={user.email}
        onChangeText={(val) => _onChangeText("email", val)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="password"
        secureTextEntry={true}
        maxLength={20}
        value={user.password}
        onChangeText={(val) => _onChangeText("password", val)}
      />
      <Button title="valider" onPress={_handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 7,
  },
});