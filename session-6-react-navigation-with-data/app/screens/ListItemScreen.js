import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { useEffect } from "react/cjs/react.development";

export default function ListItemScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState({});

  // Fetch the todo corresponding to the id number
  const fetchTodo = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem(id.toString()));
      setItem(value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
      fetchTodo();
  }, [])
  
  return (
    <SafeAreaView>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.done}>{item.done ? "Done" : "Not done yet"}</Text>
      <Text style={styles.details}>{item.details}</Text>
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