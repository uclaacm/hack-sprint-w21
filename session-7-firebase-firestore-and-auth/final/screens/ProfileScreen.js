import React, { useState } from 'react';
import { 
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet 
} from 'react-native';

function ProfileScreen() {
    const [name, setName] = useState('');

    const handleChange = (update) => {
        setName(update);
    }

    const handleSubmit = () => {
        // TODO: Allow updating of display name via Firebase
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{alignSelf: 'stretch', flex: 1}}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.header}>Your Fireside Avatar</Text>
                        <View style={styles.cardContent}>
                            <Image
                                source={require('../images/unknown-user-light.png')}
                                style={styles.cardImg}
                                />
                            
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Display Name</Text>
                                <TextInput
                                    style={styles.nameInput}
                                    placeholder='Set Display Name'
                                    value={name}
                                    onChangeText={handleChange}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.saveBtn}
                                disabled={name === ''}
                                onPress={handleSubmit}
                            >
                                <Text>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffcb2b',
        padding: 20,
        height: 450,
        width: 300,
        borderRadius: 20,
        alignItems: 'stretch',
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    cardContent: {
        alignItems: 'center'
    },
    cardImg: {
        width: 150,
        height: 150,
        borderRadius: 100,
        margin: 20
    },
    inputWrapper: {
        alignSelf: 'stretch',
        alignItems: 'stretch'
    },
    inputLabel: {
        color: 'white',
        margin: 5
    },
    nameInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    saveBtn: {
        margin: 20,
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        backgroundColor: 'white'
    }
});

export default ProfileScreen;
