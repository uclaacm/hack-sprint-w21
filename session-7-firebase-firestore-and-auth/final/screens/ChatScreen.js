import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ChatMessage from '../components/ChatMessage';

function ChatScreen() {
    const CURRENT_USER = 0;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                uid: 1,
                name: 'The World',
                messageId: 1,
                message: 'Hello...'                 
            },
            {
                uid: 0,
                name: 'Me',
                messageId: 0,
                message: 'Hello, World!'             
            }
        ]);
        return () => {
            setMessages([]);
        }
    }, [])
    
    const handleChange = (update) => {
        setMessage(update)
    }

    const handleSend = () => {
        setMessages((prev) => {
            return [
                {
                    uid: CURRENT_USER,
                    messageId: prev[0].messageId + 1,
                    message
                },
                ...prev
            ];
        });
        setMessage('');
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.chatArea}>
                        <FlatList 
                            data={messages}
                            renderItem={({ item }) => {
                                return <ChatMessage 
                                    sent={item.uid === CURRENT_USER}
                                    name={item.name}
                                    message={item.message}
                                />
                            }}
                            inverted={true}
                            keyExtractor={item => item.messageId.toString()}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.inputArea}>
                    <View style={styles.inner}>
                        <TextInput 
                            placeholder="Aa" 
                            style={styles.messageInput} 
                            value={message}
                            onChangeText={handleChange}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendBtn}
                            disabled={message === ''}
                        >
                            <FontAwesome name="send" size={24} color={message ? "#ee6123" : 'gray'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#FFF'
    },
    chatArea: {
        flex: 10,
        margin: 10
    },
    inputArea: {
        height: 40
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    messageInput: {
        flex: 8,
        borderRadius: 20,
        backgroundColor: '#F3F3F3',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        paddingLeft: 10,
        marginRight: 10,
        marginLeft: 10
    },
    sendBtn: {
        padding: 5
    }
});

export default ChatScreen;
