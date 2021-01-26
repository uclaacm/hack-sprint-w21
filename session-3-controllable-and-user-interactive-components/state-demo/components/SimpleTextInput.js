import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


function SimpleTextInput() {
  const [ text, setText ] = useState('');

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
        style={styles.textInput}
        placeholder='type a message'
        onChangeText={input => setText(input)}
        value={text}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    padding: 8,
    borderColor: 'grey',
    borderWidth: 1
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SimpleTextInput;