/*
    INSTRUCTIONS:
    1. On a new folder, run the commands: expo init twitter-app
    2. Select the "minimal workflow" option. (Do not select the TypeScript option)
    3. Copy and paste the contents of this file into your App.js file.

*/

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import TwitterPost from './twitter.js';

export default function App() {
  const lst = [
    {
      id: 1,
      profileName: 'Lee Ji-un',
      profileHandle: '@xxxIUxxx',
      profilePic: "https://media.allure.com/photos/5d601b3e531caa0008cbc17c/3:4/w_1279,h_1705,c_limit/IU%20at%20a%20press%20conference.jpg",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://static.billboard.com/files/2020/05/iu-feb-2020-billboard-1548-1589305869-1024x677.jpg"
    },
    {
      id: 2,
      profileName: 'CatCafe',
      profileHandle: '@catcafe23',
      profilePic: "https://www.animeoutline.com/wp-content/uploads/2018/07/anime_cat.png",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg"
    },
    {
      id: 3,
      profileName: 'Anime Art',
      profileHandle: '@paimondraws',
      profilePic: "https://i.pinimg.com/474x/50/70/10/5070101ae7cc267a1ba03d30abdd38e9.jpg",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://i.pinimg.com/originals/f7/fe/c0/f7fec03ec36ff391848b5bc607c0578c.jpg"
    },
    {
      id: 4,
      profileName: 'Doggo',
      profileHandle: '@mr.doggo',
      profilePic: "https://www.animeoutline.com/wp-content/uploads/2018/05/anime_dog_drawing.png",
      postContent: "Lorem ipsum dolor` sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://filmdaily.co/wp-content/uploads/2020/05/dog-videos-lede-1300x868.jpg"
    }
  ]
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lst}
        renderItem={(obj) => {
          console.log(obj.item);
          return(
            <TwitterPost 
              profileName={obj.item.profileName}
              profileHandle={obj.item.profileHandle}
              profilePic={obj.item.profilePic}
              postContent={obj.item.postContent}
              postPic={obj.item.postPic}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
