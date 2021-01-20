import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
    return (
    // all content wrapped by SafeAreaView
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={[styles.row, styles.rowTop, styles.rowStart]}>
            <View style={[styles.col, styles.colTop]}>
              <Text>Hello</Text>
              <Text>1</Text>
            </View>
            <View style={[styles.col]}>
              <Text>Hello</Text>
              <Text>2</Text>
            </View>
            <View style={[styles.col, styles.colBottom]}>
              <Text>Hello</Text>
              <Text>3</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={[styles.col, styles.colStart]}>
              <Text>Hello</Text>
              <Text>1</Text>
            </View>
            <View style={[styles.col]}>
              <Text>Hello</Text>
              <Text>2</Text>
            </View>
            <View style={[styles.col, styles.colEnd]}>
              <Text>Hello</Text>
              <Text>3</Text>
            </View>
        </View>
        <View style={[styles.row, styles.rowBottom, styles.rowEnd]}>
            <View style={[styles.col, styles.colBottom, styles.colLeft]}>
              <Text>Hello</Text>
              <Text>1</Text>
            </View>
            <View style={[styles.col, styles.colWide]}>
              <Text>Hello</Text>
              <Text>2</Text>
            </View>
            <View style={[styles.col, styles.colTop, styles.colRight]}>
              <Text>Hello</Text>
              <Text>3</Text>
            </View>
        </View>
        <View style={[styles.row, styles.rowFull]}>
            <View style={[styles.col, styles.col1]}>
              <Text>Hello</Text>
              <Text>1</Text>
            </View>
            <View style={[styles.col, styles.col3]}>
              <Text>Hello</Text>
              <Text>2</Text>
            </View>
            <View style={[styles.col, styles.col1]}>
              <Text>Hello</Text>
              <Text>3</Text>
            </View>
        </View>
    </SafeAreaView>
    );
}


// Create styles object
const styles = StyleSheet.create({
    container: {
        flex: 1, // ensures that the container takes up all available space
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowStart: {
      justifyContent: 'flex-start'
    },
    rowEnd: {
      justifyContent: 'flex-end'
    },
    rowTop: {
      alignItems: 'flex-start'
    },
    rowBottom: {
      alignItems: 'flex-end'
    },
    col: {
      width: 100,
      height: 100,
      padding: 10,
      marginLeft: 5,
      marginRight: 5,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    colStart: {
      alignItems: 'flex-start'
    },
    colEnd: {
      alignItems: 'flex-end'
    },
    colTop: {
      justifyContent: 'flex-start'
    },
    colBottom: {
      justifyContent: 'flex-end'
    },
    colLeft: {
      alignItems: 'flex-start'
    },
    colRight: {
      alignItems: 'flex-end'
    },
    col1: {
      flex: 1
    },
    col3: {
      flex: 3
    }
});
