import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native'; // make sure we import the SafeAreaView component

export default function App() {
    const cookTime = '30 min';

    return (
    // all content wrapped by SafeAreaView
    <SafeAreaView>
        <StatusBar style="auto" />
        <View>
            {/* Take image source from local machine */}
            <Image
                style={{
                  width: 100,
                  height: 100
                }}
                source={require('./images/roasted_oolong.jpg')} 
            />
            <Text>Roasted Oolong Boba Milk Tea</Text>
            <Text>Cook Time: {cookTime}</Text>
        </View>
        <View>
            {/* Take image source from online URI */}
            <Image
                style={{
                  width: 100,
                  height: 100
                }}
                source={{
                  uri: 'https://www.seriouseats.com/recipes/images/20110320-127355-dinner-tonight-niku-udon.jpg'
                }}
            />
            <Text>Niku Udon</Text>
            <Text>Cook Time: {cookTime}</Text>
        </View>
        <View>
            <Image
                style={{
                  width: 100,
                  height: 100
                }}
                source={{
                  uri: 'https://www.sainsburysmagazine.co.uk/uploads/media/2400x1800/07/7337-Saag-Paneer.jpg'
                }}
            />
            <Text>Saag Paneer</Text>
            <Text>Cook Time: {cookTime}</Text>
        </View>
    </SafeAreaView>
    );
}
