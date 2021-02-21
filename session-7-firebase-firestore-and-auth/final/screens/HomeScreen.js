import React, { useEffect } from 'react';
import { 
    SafeAreaView,
    Keyboard,
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/config'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        paddingBottom: 10
    }
  });

function HomeScreen({ navigation }) {
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            const uid = user.uid;
            try {
                await AsyncStorage.setItem('user', uid);
            } catch (e) {
                console.log(e);
            }
            
        })
    }, [])

    const handleLogin = async () => {
        try {
            await auth.signInAnonymously();
            navigation.navigate('Fireside Chats');
        } catch (e) {
            console.log(e); 
        }

        /* Pre-Auth
        navigation.navigate('Fireside Chats');
        */
    }
    const handleLogout = async () => {
        try {
            await auth.signOut();
            await AsyncStorage.setItem('user', '');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
             <Text style={styles.title}>Welcome to Fireside Chats 🔥</Text>
             <TouchableOpacity onPress={handleLogin}>
                 <Text>Login with Google</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={handleLogout}>
                 <Text>Logout</Text>
             </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen;