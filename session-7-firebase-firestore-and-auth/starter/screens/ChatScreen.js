import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView,
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
    const [currentUser, setCurrentUser] = useState('0');
    const getCurrentUser = () => {
        // Post-Firebase TODO: get current user id from local storage
        setCurrentUser('0');
    }
    useEffect(() => {
        getCurrentUser();
    }, [])

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const getNewMessages = () => {
        // TODO: Fetch messages from Firestore
        setMessages([
            {
                uid: '1',
                displayName: 'The World',
                messageId: 1,
                messageText: 'Hello...'                 
            },
            {
                uid: '0',
                displayName: 'Anonymous',
                messageId: 0,
                messageText: 'Hello, World!'             
            }
        ]); 
    }

    const addNewMessage = async (uid, messageText) => {
        // TODO: Add new message to Firestore whenever user sends
        setMessages((prev) => {
            return [
                {
                    uid,
                    messageId: prev[0] ? prev[0].messageId + 1 : 0,
                    messageText,
                    displayName: 'Anonymous',
                    photoURL: null
                },
                ...prev
            ];
        }); 
    }


    const listenForUpdates = () => {
        // TODO: Retreive new messages as they come
    }

    useEffect(() => {
        getNewMessages();
    }, [])
    
    const handleChange = (update) => {
        setMessage(update);
    }

    const handleSend = () => {
        addNewMessage(currentUser, message);
        setMessage('');
    }

    return (
        <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.chatArea}>
                        <FlatList 
                            data={messages}
                            renderItem={({ item }) => {
                                return <ChatMessage 
                                    sent={item.uid === currentUser}
                                    displayName={item.displayName}
                                    messageText={item.messageText}
                                    photoURL={item.photoURL}
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
