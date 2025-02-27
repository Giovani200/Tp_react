import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { URL } from '../constants/api';
import axios from 'axios';

export default function Home({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, status } = await axios.get(URL.FETCH_USERS);
      if (status === 200) {
        console.log('Succès de la requête');
        setUsers(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.message);
    }
  };

  const handleUserDeleted = () => {
    fetchUsers(); // Rafraîchir la liste des utilisateurs après suppression
  };

  const handleUserUpdated = () => {
    fetchUsers(); // Rafraîchir la liste des utilisateurs après mise à jour
  };

  const renderItem = ({ item }) => {
    const { _id, prenom, email } = item;
    return (
      <Pressable style={styles.itemContainer} onPress={() => navigation.navigate("Detail", { id: _id, onUserDeleted: handleUserDeleted, onUserUpdate: handleUserUpdated })}>
        <View>
          <Text style={styles.itemText}>{prenom} : {email}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'écran  home</Text>
      <FlatList
        data={users}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#495057',
  },
});