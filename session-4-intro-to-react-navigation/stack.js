import React from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function WildernessExplorer({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Wilderness Explorers Screen</Text>
      <Button
        title="Go to Explorer Profile"
        onPress={() => navigation.navigate('My Explorer Profile')}
      />
    </View>
  );
}

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Explorer Profile Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wilderness Explorers!"
        component={WildernessExplorer}
      />
      <Stack.Screen
        name="My Explorer Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}

export default MyStack;