import React, { useEffect } from 'react';
import { 
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

function HomeScreen({ navigation }) {
    // TODO: Handle login with Firebase Auth
    const handleLogin = () => {
        navigation.navigate('Fireside Chats');
    }

    // TODO: Handle logout with Firebase Auth
    const handleLogout = () => {}

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Fireside Chats</Text>
            <Image 
                source={require('../images/fire-icon.png')}
                style={styles.image}
            />
            <TouchableOpacity 
                onPress={handleLogin}
                style={styles.btn}
            >
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleLogout}
                style={styles.btn}
            >
                <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcb2b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    },
    image: {
        width: 300,
        height: 300
    }, 
    btn: {
        margin: 5,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    btnText: {
        color: '#ffa611'
    }
});

export default HomeScreen;