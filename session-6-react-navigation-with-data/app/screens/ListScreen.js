import React, { useState } from "react";
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

  return (
    <SafeAreaView>
      <Button
        title='New Item'
        onPress={() => navigation.navigate("New Item")}
      />
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            title={item.title}
            done={item.done}
            toggleDone={() => {
              let newTodos = [...todos];
              newTodos[index].done = !newTodos[index].done;
              setTodos(newTodos);
            }}
            goToDetails={() => navigation.navigate("List Item", item)}
          />
        )}
      />
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
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  done: {
    textDecorationLine: "line-through",
  },
});
