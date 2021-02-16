import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

export default function NewItemScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  
  // Adding a new Todo using AsyncStorage
  const addTodo = async () => {
    try {
      // Add new todo
      const newTodo = {
        title: title,
        details: details,
        done: false,
      };
      navigation.navigate('To-do List', { todo: newTodo });
    } catch (e) {
      console.log(e);
    }
  }
  
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
      <Button title='Create' onPress={addTodo}/>
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