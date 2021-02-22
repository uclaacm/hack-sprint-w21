import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="Fireside"
          component={ChatScreen}
          options={{
            headerTitle: "Welcome to the Fireside"
          }}
        />
      </Stack.Navigator>
    </KeyboardAvoidingView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: '#FFF'
  },
});
