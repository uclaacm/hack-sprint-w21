import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

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

export default function ListScreen({ navigation, route }) {
  // Change this to "secure" to use SecureStore instead.
  let storageType = "secure";

  const [todos, setTodos] = useState([
    {
      title: "Practice serve",
      done: false,
      details:
        "Underhand: a serve in which the player strikes the ball below the waist instead of tossing it up and striking it with an overhand throwing motion. ",
    },
    {
      title: "Learn how to spike",
      done: true,
      details:
        "Parallel: the ball is spiked across the other side of the net basically in a parallel direction.",
    },
  ]);

  useEffect(() => {
    fetchExistingTodos();
  }, []);

  useEffect(() => {
    if (route.params?.todo) {
      addTodo(route.params.todo);
    }
  }, [route.params?.todo]);

  // Fetch all existing todo's in local storage
  const fetchExistingTodos = async () => {
    const existingTodos = storageType === "async" ? await AsyncStorage.getItem('todos') : await SecureStore.getItemAsync('todos');
    console.log(JSON.parse(existingTodos));
    if (existingTodos) {
      setTodos(JSON.parse(existingTodos));
    } 
  }

  // Update state and local storage with new todo
  const addTodo = async (todo) => {
    try {
      const curTodos = todos.slice();
      const newTodos = [...curTodos, todo];
      setTodos(newTodos);
      if (storageType === "async") {
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      } else {
        await SecureStore.setItemAsync('todos', JSON.stringify(newTodos));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.buttons}>
        <Button
          title='New Item'
          onPress={() => navigation.navigate("New Item")}
        />
        <Button
          title='Clear all'
          onPress={async () => {
            setTodos([]);
            if (storageType === "async") {
              await AsyncStorage.clear();
            } else {
              await SecureStore.deleteItemAsync('todos');
            }
          }}
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={todos}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            done={item.done}
            toggleDone={() => {
              let newTodos = [...todos];
              newTodos[index].done = !newTodos[index].done;
              setTodos(newTodos);
            }}
            goToDetails={() => {
              // Pass id to List Item screen
              AsyncStorage.setItem(index.toString(), JSON.stringify(item))
              navigation.navigate("List Item", {id: index});
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  done: {
    textDecorationLine: "line-through",
  },
});