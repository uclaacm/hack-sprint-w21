import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import StatePlayGround from './components/StatePlayground';
import TextInputDemo from './components/TextInputDemo';
import SimpleTextInput from './components/SimpleTextInput';

export default function App() {

  return (
    <View style={styles.container}>
      {/* Uncomment one of these to play with the component*/}
      <SimpleTextInput />
      {/* <StatePlayGround /> */}
      {/* <TextInputDemo /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
