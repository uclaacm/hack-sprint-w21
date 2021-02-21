import React from 'react';
import { 
    SafeAreaView,
    Keyboard,
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        paddingBottom: 10
    }
  });

function HomeScreen({ navigation }) {
    const handleLogin = () => {
        
        navigation.navigate('Fireside Chats');
    }
    return (
        <SafeAreaView style={styles.container}>
             <Text style={styles.title}>Welcome to Fireside Chats 🔥</Text>
             <TouchableOpacity onPress={handleLogin}>
                 <Text>Login with Google</Text>
             </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen;