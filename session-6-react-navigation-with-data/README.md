# Hacksprint Session 6: React Navigation with Data

**Date**: February 17, 2021

**Location**: Zoom

**Teachers**: [Kristie](https://github.com/kristielim), [Eugene](https://github.com/euglo)

## Resources

- [React Navigation Docs](https://reactnavigation.org/docs/params#passing-params-to-a-previous-screen)
- [Example To-do List App from Stanford's CS47](https://snack.expo.io/@aabuhashem/a9e8d7)

## What we'll be learning today

Today we'll be walking through step-by-step how you might create a To-do list app. We'll start from the very beginning and review everything we've learned so far.

## Getting started

First, make sure [Node](https://nodejs.org/en/download/) and [Expo](https://docs.expo.io/) are installed. Then to start a new app, run this command in your terminal:

```
expo init TodoApp
```

This will install what you need to get started on an Expo app.

Now we're ready to make a To-do List app! What are some screens we might want? How about a list screen, list item screen, and create item screen.

TODO: insert screenshots of each completed screen

Apps usually have different folders to organize the code. This is better than keeping all your files in the top level folder or even more chaotic, all code in a single file. Let's set up a simple directory structure. You might want to create folders for shared constants (colors, sizes), assets (images, fonts), or [more](https://swairaq.medium.com/react-native-app-structure-f281e69d895d).

TODO: insert picture of directory structure

Then add the screen files with some filler code just to get started:

```js
import React from "react";
import { View, Text } from "react-native";

export default function ListScreen() {
  return (
    <View>
      <Text>List screen</Text>
    </View>
  );
}
```

## Object Destructuring

In the examples below, I will be using a Javascript feature called "object destructuring." This is very common in Javascript but it can be a bit confusing when you first see it.

TODO: fill in an object destructuring example here, also do one where the object is a parameter

## Review props

First let's review props. On my to-do list, I will want to have multiple list items. Each list item will have the same structure and styling, so it will be useful to break that out into a separate component. Then the content can be determined by props. Here I have two props: `title` and `done`. `title` is the text of the list item and `done` determines if the style should be crossed out or not. `done && styles.done` means that if `done` is true then the expression is `styles.done` otherwise it is nothing. This is a Javascript feature but very commonly found in React. Also notice here that I am pulling out the props in the parameters of the function here `function ListItem({ title, done }) {`. This is a shorthand so that you can just use `title` instead of `props.title`.

```js
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function ListItem({ title, done }) {
  return (
    <View style={styles.listItem}>
      <Text style={[styles.listItemTitle, done && styles.done]}>{title}</Text>
    </View>
  );
}

export default function ListScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.heading}>To-do List</Text>
      <ListItem title='Practice serve' done={false} />
      <ListItem title='Learn how to spike' done={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  listItem: {
    padding: 30,
    backgroundColor: "#ef863d",
    margin: 4,
  },
  listItemTitle: {
    fontSize: 20,
  },
  done: {
    textDecorationLine: "line-through",
  },
});
```

## Review FlatList

These list items should be in a FlatList so that we can scroll through them. Let's review how to do that. First let's put the data that we want into an array:

```js
const todos = [
  { title: "Practice serve", done: false },
  { title: "Learn how to spike", done: true },
];
```

This array will be used in the `data` prop of the `FlatList`. Then let's render a `ListItem` in the `renderItem` prop.

```js
<FlatList
  data={todos}
  renderItem={({ item, index }) => (
    <ListItem title={item.title} done={item.done} />
  )}
  keyExtractor={(item, index) => index.toString()}
/>
```

## Review state

Why can't I do something like this?

```js
function ListItem({ title, done }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        done = !done;
      }}
    >
      <Text style={[styles.listItemTitle, done && styles.done]}>{title}</Text>
    </TouchableOpacity>
  );
}
```

I can't change `done` to the opposite of `done` because `done` is a prop. In order to change `done`, I need to use _state_ instead of props. I could have a state inside of `ListItem` that controls whether or not that list item is done.

```js
function ListItem({ title }) {
  const [done, setDone] = useState(false);
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setDone(!done);
      }}
    >
      <Text style={[styles.listItemTitle, done && styles.done]}>{title}</Text>
    </TouchableOpacity>
  );
}
```

This would appear to work, but something is actually a little wrong. If we put state inside of the `ListItem`, we don't change the `todos` array. So instead, we will keep `done` as a prop and instead, pass in a `toggleDone` prop function that will update the `todos` state.

Change todos into state for the `ListScreen`.

```js
const [todos, setTodos] = useState([]);
```

Pass in a function that updates the `todos` to each `ListItem`.

```jsx
<ListItem
  title={item.title}
  done={item.done}
  toggleDone={() => {
    let newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }}
/>
```

## Review TextInput

Now that we have our `ListScreen` complete, let's fill out the other screens too. In the `NewItemScreen`, we will need some text inputs to say what the new to-do list item will be.

```js
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

export default function NewItemScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={setTitle}
        accessible={true}
        accessibilityLabel='Title of to-do list item'
      />
      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={[styles.textInput, styles.paragraphInput]}
        value={details}
        onChangeText={setDetails}
        multiline={true}
        accessible={true}
        accessibilityLabel='Details of to-do list item'
      />
      <Button title='Create' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    paddingLeft: 20,
    paddingBottom: 8,
  },
  textInput: {
    fontSize: 20,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderColor: "grey",
    borderWidth: 1,
    margin: 16,
  },
  paragraphInput: {
    height: 100,
  },
  container: {
    height: "100%",
    justifyContent: "center",
  },
});
```

Nothing happens when you click the button right now.

## Review React Navigation

Let's add the `ListItemScreen`:

```js
import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function ListItemScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Practice serve</Text>
      <Text style={styles.done}>Not done yet</Text>
      <Text style={styles.details}>
        The Pinch Servers are switched into the game to get an advantage over
        the opponents or at crucial times, usually near match point. They have
        to perform risky serves to gain points for the team. The serves usually
        have to be extremely powerful or unique, such as the "Jump Float Serve,
        or the underhand Ceiling Serve (Tokyo Spring Nationals).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    padding: 20,
  },
  done: {
    fontSize: 24,
    fontStyle: "italic",
    paddingLeft: 20,
    paddingBottom: 20,
  },
  details: {
    fontSize: 20,
    padding: 20,
  },
});
```

TODO: insert gif with desired navigation pattern

Now let's add some navigation between the three screens.

```
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
```

Add a button to the `ListScreen` to allow you to get to the `NewItemScreen`.

```js
<Button title='New Item' onPress={() => navigation.navigate("New Item")} />
```

Add a function to the `ListItem` that allows you to get to the `ListItemScreen`.

```js
<ListItem
  title={item.title}
  done={item.done}
  toggleDone={() => {
    let newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }}
  goToDetails={() => navigation.navigate("List Item")}
/>
```

Add a button to the `ListItem` and call the new `goToDetails` prop.

```js
import { AntDesign } from "@expo/vector-icons";

function ListItem({ title, done, toggleDone, goToDetails }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={toggleDone}>
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemTitle, done && styles.done]}>{title}</Text>
        <AntDesign name='right' size={24} color='black' onPress={goToDetails} />
      </View>
    </TouchableOpacity>
  );
}
```

## Finally, let's pass data between the screens

This is done using the second argument of `navigation.navigate`.

```js
() => navigation.navigate("List Item", item);
```

Recall that `item` is a Javascript object that looks like:

```
{
  title: "Practice serve",
  done: false,
  details:
    "Underhand: a serve in which the player strikes the ball below the waist instead of tossing it up and striking it with an overhand throwing motion. ",
}
```

Then in `ListItemScreen`, we have access to that `item` object through the `route` object passed in props. `route` has a property called `params` that contains the parameters that we passed from the `ListScreen`.

```js
export default function ListItemScreen({ route }) {
  const { title, done, details } = route.params;
  return (
    <SafeAreaView>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.done}>{done ? "Done" : "Not done yet"}</Text>
      <Text style={styles.details}>{details}</Text>
    </SafeAreaView>
  );
}
```

## Challenges

- Allow users to edit the list item from the list item screen.
- Add due dates to the to-do list
