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
      profileName: 'Lee Ji-un',
      profileHandle: '@xxxIUxxx',
      profilePic: "https://media.allure.com/photos/5d601b3e531caa0008cbc17c/3:4/w_1279,h_1705,c_limit/IU%20at%20a%20press%20conference.jpg",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://static.billboard.com/files/2020/05/iu-feb-2020-billboard-1548-1589305869-1024x677.jpg"
    },
    {
      id: 3,
      profileName: 'Lee Ji-un',
      profileHandle: '@xxxIUxxx',
      profilePic: "https://media.allure.com/photos/5d601b3e531caa0008cbc17c/3:4/w_1279,h_1705,c_limit/IU%20at%20a%20press%20conference.jpg",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://static.billboard.com/files/2020/05/iu-feb-2020-billboard-1548-1589305869-1024x677.jpg"
    },
    {
      id: 4,
      profileName: 'Lee Ji-un',
      profileHandle: '@xxxIUxxx',
      profilePic: "https://media.allure.com/photos/5d601b3e531caa0008cbc17c/3:4/w_1279,h_1705,c_limit/IU%20at%20a%20press%20conference.jpg",
      postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel dolor quis mauris mollis congue vitae a nibh. ",
      postPic: "https://static.billboard.com/files/2020/05/iu-feb-2020-billboard-1548-1589305869-1024x677.jpg"
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
