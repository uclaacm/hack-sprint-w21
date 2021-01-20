import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
    const cookTime = '30 min';

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {/* We can change the flexbox of this outer View to change how the components inside are laid out */}
        <View style={[styles.outlineRed, styles.col]}>
            <View style={[styles.outlineBlue, styles.box]}>
                {/* Take image source from local machine */}
                <Image
                    style={{
                      width: 100,
                      height: 100
                    }}
                    source={require('./images/roasted_oolong.jpg')} 
                />
                <Text>Title</Text>
                <Text>Cook Time: {cookTime}</Text>
            </View>
            <View style={[styles.outlineBlue, styles.box]}>
                {/* Take image source from online URI */}
                <Image
                    style={{
                      width: 100,
                      height: 100
                    }}
                    source={{
                      uri: 'https://tarasmulticulturaltable.com/wp-content/uploads/2014/02/Niku-Udon-Japanese-Meat-Udon-4-of-5-e1573750889431.jpg'
                    }}
                />
                <Text>Title</Text>
                <Text>Cook Time: {cookTime}</Text>
            </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // make sure you have this so that your components take up the full amount of available space
        // backgroundColor: 'pink', // you can uncomment this to show the difference between no flex: 1 and flex: 1
    },
    row: {
        // flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
        height: 300
    },
    col: {
        // flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10,
    },
    box: {
        // flex: 1, // will make boxes take up all the space available on the parent component's main axis (corresponds to flexDirection)
    },
    outlineRed: {
        borderWidth: 5,
        borderColor: 'red'
    },
    outlineBlue: {
        borderWidth: 4,
        borderColor: 'blue'
    }
});