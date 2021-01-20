import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image } from 'react-native';

export default function App() {
    const cookTime = '30 min';

    return (
    <View>
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
                  uri: 'https://tarasmulticulturaltable.com/wp-content/uploads/2014/02/Niku-Udon-Japanese-Meat-Udon-4-of-5-e1573750889431.jpg'
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
    </View>
    );
}