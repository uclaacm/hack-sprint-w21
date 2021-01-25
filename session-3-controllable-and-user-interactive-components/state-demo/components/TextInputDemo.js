import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';


function Message(props) {
  return <View style={styles.messageBubble}>
    <Text style={styles.messageText}>{props.text}</Text>
  </View>
}

function TextInputDemo() {

  const [ text, setText ] = useState('');
  const [ messages, setMessages ] = useState([]);

  const sendMessage = () => {
    /* 
    'key' 
        - a prop required for all items in a list. 
          Must be a string and must be unique
    ...messages
        - shorthand meaning "take all items of the messages array and copy them here"
    */
    setMessages([...messages, <Message key={text} text={text}/>]);
    setText(''); // reset input text to empty
  }

  return (
    <View style={styles.container}>
      <View>
        {messages}
      </View>
      <Text style={styles.textLine}>
        {text}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder='type a message'
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button 
        onPress={sendMessage}
        title='send'
        color='violet'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textLine: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'pink' 
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '100%',
    height: 40,
    padding: 8
  },
  messageBubble: {
    width: '30%',
    height: 30,
    backgroundColor: 'purple',
    borderRadius: 16,
    paddingHorizontal: 12,
    justifyContent: 'center'
  },
  messageText: {
    color: 'white',
  }  
})

export default TextInputDemo;