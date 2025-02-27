import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screen/home'
import Detail from '../screen/detail'
import Update from '../screen/update';



// Import de la fonction de création de stack de navigation
// à partir de la bibliothèque React Navigation.
const Stack = createNativeStackNavigator();

// Cette fonction déclare le composant "PlayerStack"
// qui est un composant de navigation.
export default function UserStack() {
    return (
    // Utilisation de la composante de navigation Stack.Navigator
    // pour gérer la navigation entre les écrans.
    <Stack.Navigator>
    {/*
    Écran nommé "Home" qui affiche le composant "Home"
    lorsque la navigation atteint cet écran.
    */}
    <Stack.Screen name='List' component={Home} />
    {/*
    Écran nommé "Detail" qui affiche le composant "Detail"
    lorsque la navigation atteint cet écran.
    */}
   <Stack.Screen name='Detail' component={Detail} />

   <Stack.Screen name='Update' component={Update} />
    </Stack.Navigator>
    );
   }
   