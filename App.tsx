import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnterJob from './src/pages/enterJob';
import ListJobs from './src/pages/listJobs';
import HomePage from './src/pages/homePage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomePage} />
        <Stack.Screen name="enterJob" component={EnterJob} />
        <Stack.Screen name="listJobs" component={ListJobs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;