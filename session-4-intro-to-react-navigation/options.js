import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Home({ navigation }) {
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
        name="Wilderness Explorers"
        component={Home}
        options={{
            
        }}
      />
      <Stack.Screen
        name="My Explorer Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Explorer Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Explore" component={MyStack}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
  );
}
