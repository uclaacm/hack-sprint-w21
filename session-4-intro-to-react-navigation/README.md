# Hacksprint Session 4: Intro to React Navigation

**Date**: February 3, 2021

**Location**: Zoom

**Teachers**: [Christina Tong](https://github.com/christinatong01), [Kristie Lim](https://github.com/kristielim)

## Stack Navigation 

### What is a stack navigator?
Below, you will see that the back arrow is highlighted. This is because, on a stack navigator, we add a new screen on top of another and have the option to go back. 

<img src='./images/tinder.png' height='350px'/>

### Stack navigator analogy
A stack navigator is much like a stack of books. We can add a book to the top of our stack and also remove that book. These actions are just like navigating to a new active screen and then going back to the original screen by closing the active screen. Another way to think about this is with the stack data structure. 

### Important functions
```
createStackNavigator();
```
* Provides a basic way to transition between screens
* Accepts props such as name, component, etc

```
navigation.goBack();
```
* Close active screen and return to the one below on the stack
* Function is called on navigation prop

### Code Demo
We will have two screens, one called Wilderness Explorer, and the other called Explorer Profile. 

Let's talk about our first screen, Wilderness Explorer (shown below). 
```
// stack.js 

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
```
This function takes in the navigation prop and styles it with the correct JSX tags. The Button component containes two props, one called title and one called onPress. onPress is a function that deals with how our screens will be connected. We call the navigate function on our navigation prop upon pressing the Button to route the user to 'My Explorer Profile'.

Let's talk about our second screen now, Profile(shown below).
```
// stack.js 

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Explorer Profile Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```
This function has the same concepts as the function we previously talked about. 

Now, we need a way to put these together within a stack navigation container. I will create another function called MyStack. 
```
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
```
My two screens for the stack navigator are indicated with Stack.Screen tag, and these are contained within Stack.Navigator tag. Lastly, I will export the function MyStack and import it within my App.js for it to display.

## Tab Navigation 

### What is a tab navigator?
A tab navigator is probably the most commonly used navigation technique in React Native. 

<img src='./images/ig.png' height='350px'/>

### Important functions
```
createBottomTabNavigator();
```
* Provides a basic way to transition between screens with the tab method
* Accepts props such as name, component, etc
* Very similar to the function for creating a stack navigator

### Code Demo
We will have two screens, one called Wilderness Explorer, and the other called Explorer Profile, just like we did the demo for stack navigation

Let's talk about our first screen, Wilderness Explorer (shown below). 
```
// tab.js

import React from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function WildernessExplorers() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Wilderness Explorers Screen!</Text>
    </View>
  );
}
```
This function just deals with styling the screen.

Now, onto our second screen, Profile (shown below).
```
// tab.js

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Explorer Profile Screen</Text>
    </View>
  );
}
```
Again, this function just deals with styling the screen.

Finally, we have to put these all together within a tab navigation container, so I will create one more function called MyTabs (shown below).
```
// tab.js

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Wilderness Explorers" component={WildernessExplorers} />
      <Tab.Screen name="My Explorer Profile" component={Profile} />
    </Tab.Navigator>
  );
}
```
My two screens for the stack navigator are indicated with Tab.Screen tag, and these are contained within Tab.Navigator tag. Lastly, I will export the function MyTabs import it within my App.js for it to display. 

## Drawer Navigation 
