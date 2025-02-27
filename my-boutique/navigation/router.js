import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserStack from './UserStack'
import Add from '../screen/add'

// Création d'une instance de tab navigation (navigation par onglets)
const Tabs = createBottomTabNavigator();



// L'option options={{ headerShown: false }} retirera le titre "home" de l'en-tête de vos écrans.



// Cette fonction déclare le composant de navigation principal "AppNavigation"
export default function AppNavigation() {
    return (
    // Le composant de navigation global est enveloppé dans
    // "NavigationContainer".
    <NavigationContainer>
    {/* Configuration des onglets de navigation */}
    <Tabs.Navigator>
    {/*
   Onglet "Home" Utilise le composant "PlayerStack"
   pour la navigation et cache la barre de navigation (header).
   */}
    <Tabs.Screen name='Home' component={UserStack} options={{ headerShown: false }} />
    <Tabs.Screen name='Add' component={Add}  />
   
    </Tabs.Navigator>
    </NavigationContainer>
    );
   }
      