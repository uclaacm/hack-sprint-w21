import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function App() {
    const recipes = [
        {
            id: 0,
            title: 'Roasted Oolong Boba Milk Tea',
            cook_time: '15 min',
            img_uri: 'https://cdn.shopify.com/s/files/1/0263/4812/6298/products/Capture_419f3671-7cf8-4020-a095-99faa3db0ee4_1005x.png?v=1589699475',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        },
        {
            id: 1,
            title: 'Niku Udon',
            cook_time: '1 hr, 40 min',
            img_uri: 'https://tarasmulticulturaltable.com/wp-content/uploads/2014/02/Niku-Udon-Japanese-Meat-Udon-4-of-5-e1573750889431.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        },
        {
            id: 2,
            title: 'Saag Paneer',
            cook_time: '25 min',
            img_uri: 'https://www.sainsburysmagazine.co.uk/uploads/media/2400x1800/07/7337-Saag-Paneer.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        },
        {
            id: 3,
            title: 'Chicken Fettuccine Alfredo',
            cook_time: '30 min',
            img_uri: 'https://www.modernhoney.com/wp-content/uploads/2019/04/Chicken-Fettucine-Alfredo-6.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        },
        {
            id: 4,
            title: 'Peposa Dell\'Impruneta',
            cook_time: '3 hr, 40 min',
            img_uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4642945.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        },
        {
            id: 5,
            title: 'Crock Pot Beef Stew',
            cook_time: '8 hr, 30 min',
            img_uri: 'https://www.thechunkychef.com/wp-content/uploads/2018/01/Crockpot-Beef-Stew.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        },
        {
            id: 6,
            title: 'Kimchi Fried Rice',
            cook_time: '15 min',
            img_uri: 'https://omnivorescookbook.com/wp-content/uploads/2020/08/200806_Kimchi-Fried-Rice_550.jpg',
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, est?'
        }
    ];

    return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FlatList 
            contentContainerStyle={styles.cardList}
            data={recipes}
            renderItem={(obj) => {
                return (
                    <View style={styles.card}>
                        <Image
                            style={styles.cardImg}
                            source={{
                                uri: obj.item.img_uri
                            }} 
                        />
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{obj.item.title}</Text>
                            <Text>{obj.item.desc}</Text>
                            <Text style={styles.cookTime}>
                                <Text style={styles.cookTimeLabel}>Cook Time <FontAwesome5 name="clock" size={12} />:</Text> {obj.item.cook_time}
                            </Text>
                        </View>
                    </View>
                );
            }}
            keyExtractor={(item) => {return item.id.toString();}}
        />

    </SafeAreaView>
    );
}

// Create styles object
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        flex: 1, // container grows to fit available space
    },
    cardList: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
          width: 5,
          height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.15,
        flexDirection: 'row',
        width: '95%',
        padding: 20,  
        marginTop: 10,
        marginBottom: 10
    },
    cardImg: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: 'center'
    },
    cardBody: {
        paddingLeft: 10,
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    cookTime: {
      fontSize:  14
    },
    cookTimeLabel: {
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: '700',
        color: 'orange'
    }
});