import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
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
          />
        <Stack.Screen 
          name="Fireside Chats"
          component={MyTab}
        />
      </Stack.Navigator>
    </KeyboardAvoidingView>
  )
}

const Tab = createBottomTabNavigator();
function MyTab() {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({color}) => {
              return <Ionicons name="ios-chatbubbles" size={24} color={color} />
            }
          }}
        />
        <Tab.Screen 
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color}) => {
              return <FontAwesome name="user-circle-o" size={24} color={color} />
            }
          }}
        />
      </Tab.Navigator>
  );
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
