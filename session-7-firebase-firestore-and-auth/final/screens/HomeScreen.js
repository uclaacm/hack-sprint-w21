import React, { useState } from 'react';
import { 
    SafeAreaView,
    Keyboard,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Text
} from 'react-native';
import UUID from '../utils/uuid';

function HomeScreen({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const handlePress = () => {
        navigation.navigate('Fireside', {
            displayName,
            uid: UUID()
        });
    }

    const handleChange = (update) => {
        if (update.length <= 20)
            setDisplayName(update);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Fireside Chats</Text>
                <Image 
                    source={require('../images/fire-icon.png')}
                    style={styles.image}
                />
                <TextInput
                    style={styles.nameInput}
                    placeholder='Set Display Name'
                    value={displayName}
                    onChangeText={handleChange}
                />
                <TouchableOpacity 
                    onPress={handlePress}
                    style={styles.btn}
                    disabled={displayName === ''}
                >
                    <Text style={{color: displayName === '' ? 'gray' : '#ffa611'}}>Start Chatting</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        marginTop: 60,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    nameInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        minWidth: 100,
        maxWidth: 200,
        textAlign: 'center'
    }
});

export default HomeScreen;