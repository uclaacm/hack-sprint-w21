import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListItemScreen from "./app/screens/ListItemScreen";
import ListScreen from "./app/screens/ListScreen";
import NewItemScreen from "./app/screens/NewItemScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='To-do List' component={ListScreen} />
        <Stack.Screen name='New Item' component={NewItemScreen} />
        <Stack.Screen name='List Item' component={ListItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
