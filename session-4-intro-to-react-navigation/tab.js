import React from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// TAB NAVIGATOR

function WildernessExplorers() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Wilderness Explorers Screen!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Explorer Profile Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Wilderness Explorers" component={WildernessExplorers} />
      <Tab.Screen name="My Explorer Profile" component={Profile} />
    </Tab.Navigator>
  );
}

