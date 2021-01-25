import React, { useState } from 'react';

import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 


function StatePlayGround() {
  const [ heartCount, setHeartCount ] = useState(0);
  const [ heartColor, setHeartColor ] = useState('pink');

  const incrementHeartCount = () => {
    setHeartCount(heartCount + 1);
  }

  return (
    <View style={styles.container}>
      <Text>Tap the heart</Text>
      <TouchableOpacity
        onPress={incrementHeartCount}
      >
        <AntDesign name="hearto" size={48} color={heartColor} />
      </TouchableOpacity>

      <Text style={styles.counter}>heart count: {heartCount}</Text>
      <View>
        <Text>Pick heart color:</Text>
        {['pink', 'cyan', 'gold'].map((color) => 
          <Button
            key={color}
            onPress={() => setHeartColor(color)}
            title={color}
            color={color}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* uncomment these to see the borders of the View */
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default StatePlayGround;