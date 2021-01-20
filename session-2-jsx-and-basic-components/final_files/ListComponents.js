import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { ScrollView, FlatList } from 'react-native'; // make sure you import the FlatList component

export default function App() {
    const recipes = [
        {
            id: 0,
            title: 'Roasted Oolong Boba Milk Tea',
            cook_time: '15 min',
            img_uri: 'https://cdn.shopify.com/s/files/1/0263/4812/6298/products/Capture_419f3671-7cf8-4020-a095-99faa3db0ee4_1005x.png?v=1589699475',
        },
        {
            id: 1,
            title: 'Niku Udon',
            cook_time: '1 hr, 40 min',
            img_uri: 'https://tarasmulticulturaltable.com/wp-content/uploads/2014/02/Niku-Udon-Japanese-Meat-Udon-4-of-5-e1573750889431.jpg',
        },
        {
            id: 2,
            title: 'Saag Paneer',
            cook_time: '25 min',
            img_uri: 'https://www.sainsburysmagazine.co.uk/uploads/media/2400x1800/07/7337-Saag-Paneer.jpg',
        },
        {
            id: 3,
            title: 'Chicken Fettuccine Alfredo',
            cook_time: '30 min',
            img_uri: 'https://www.modernhoney.com/wp-content/uploads/2019/04/Chicken-Fettucine-Alfredo-6.jpg',
        },
        {
            id: 4,
            title: 'Peposa Dell\'Impruneta',
            cook_time: '3 hr, 40 min',
            img_uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4642945.jpg',
        },
        {
            id: 5,
            title: 'Crock Pot Beef Stew',
            cook_time: '8 hr, 30 min',
            img_uri: 'https://www.thechunkychef.com/wp-content/uploads/2018/01/Crockpot-Beef-Stew.jpg',
        },
        {
            id: 6,
            title: 'Kimchi Fried Rice',
            cook_time: '15 min',
            img_uri: 'https://omnivorescookbook.com/wp-content/uploads/2020/08/200806_Kimchi-Fried-Rice_550.jpg',
        }
    ];

    const renderRecipes = recipes.map((recipe) => {
        return (
            <View>
                <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={{
                        uri: recipe.img_uri
                    }}
                />
                <Text>{recipe.title}</Text>
                <Text>Cook Time: {recipe.cook_time}</Text>
            </View>
        );
    });

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            {/* Avoid using ScrollView, only here for demonstration purposes */}
            {/* <ScrollView>
            {renderRecipes}
        </ScrollView> */}

            <FlatList
                data={recipes}
                renderItem={(obj) => {
                    return (
                        <View>
                            <Image
                                style={{
                                    width: 100,
                                    height: 100
                                }}
                                source={{
                                    uri: obj.item.img_uri
                                }}
                            />
                            <Text>{obj.item.title}</Text>
                            <Text>Cook Time: {obj.item.cook_time}</Text>
                        </View>
                    );
                }}
            />

        </SafeAreaView>
    );
}
