import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native'; // make sure you import StyleSheet

export default function App() {
    return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Text>Unstyled text</Text>
          <Text style={styles.danger}>Make this text red</Text>
          <Text style={styles.chonky}>Make this text large</Text>
          <Text style={styles.textBox}>Put space around this text</Text>
          <Text style={[styles.danger, styles.chonky]}>Red and large</Text>
          <Text style={[styles.chonky, styles.lowercase]}>Large then lowercase</Text>
          <Text style={[styles.lowercase, styles.chonky]}>Lowercase then large</Text>
        </View>
        <View style={styles.box}>
            {/* Take image source from local machine */}
            <Image
                style={styles.roundedImage}
                source={require('./images/roasted_oolong.jpg')} 
            />
            <Text>Let's put a border around this box</Text>
        </View>
        <View style={[styles.box, styles.crazyBox]}>
            {/* Take image source from online URI */}
            <Image
                style={styles.circleImage}
                source={{
                  uri: 'https://tarasmulticulturaltable.com/wp-content/uploads/2014/02/Niku-Udon-Japanese-Meat-Udon-4-of-5-e1573750889431.jpg'
                }}
            />
            <Text>Let's make this container super crazy!</Text>
        </View>
    </SafeAreaView>
    );
}

// Create styles object
const styles = StyleSheet.create({
    danger: {
        color: 'red'
    },
    chonky: {
        fontSize: 30,
        textTransform: 'uppercase'
    },
    lowercase: {
        textTransform: 'lowercase'
    },
    textBox: {
        margin: 20,
        // equivalent to the following four style rules
        // marginTop: 20,
        // marginBottom: 20,
        // marginLeft: 20,
        // marginRight: 20,
    },
    box: {
        padding: 30,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2,
    },
    crazyBox: {
      borderWidth: 10,
      borderColor: 'red',
      borderStyle: 'dotted',
      backgroundColor: 'lavender'
    },
    circleImage: {
      width: 100,
      height: 100,
      borderRadius: 50 // should be half of the width and height to make a circle
    },
    roundedImage: {
      width: 100,
      height: 100,
      borderRadius: 10
    }
})