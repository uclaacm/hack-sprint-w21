import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

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
