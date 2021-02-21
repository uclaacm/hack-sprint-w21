import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

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
      <MyTab />
    </NavigationContainer>
  );
}

