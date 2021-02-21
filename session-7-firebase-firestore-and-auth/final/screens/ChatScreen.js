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
import firebase from 'firebase';

import { db } from '../firebase/config';
import ChatMessage from '../components/ChatMessage';

import AsyncStorage from '@react-native-async-storage/async-storage';

function ChatScreen() {
    const [currentUser, setCurrentUser] = useState(0);
    const getCurrentUser = async () => {
        // Post-Firebase TODO: get current user id from local storage
        try {
            const id = await AsyncStorage.getItem('user');
            if (id !== null && id !== '') {
                setCurrentUser(id);
            }
        } catch (e) {
            console.log(e);
        }

        /* Pre-Authentication implementation
            setCurrentUser(0);
        */
    }
    useEffect(() => {
        getCurrentUser();
    }, [])

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const getNewMessages = async () => {
        try {
            const query = db.collection('chatroom').orderBy('timestamp', 'desc').limit(20);
            const querySnapshot = await query.get();
            
            let messageArr = [];
            querySnapshot.forEach((doc) => {
                const { uid, messageText, displayName, photoURL } = doc.data();
                messageArr.push({
                    messageId: doc.id,
                    uid,
                    messageText,
                    displayName,
                    photoURL
                });
            });
            setMessages(messageArr);
        } catch (error) {
            console.log(error);
        }

        /* Pre-firebase implementation
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
        */
    }
    
    const addNewMessage = async (uid, messageText) => {
        try { 
            // Post-Firebase TODO: get display name from local storage
            const name = await AsyncStorage.getItem('displayName');
            const docRef = await db.collection('chatroom').add({
                uid,
                messageText,
                displayName: name || 'Anonymous',
                photoURL: null,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Document written with ID: " + docRef.id);
        } catch (error) {
            console.log(error)
        }

        /* Pre-firebase implementation
        setMessages((prev) => {
            return [
                {
                    uid: CURRENT_USER,
                    messageId: prev[0].messageId + 1,
                    messageText,
                    displayName: 'Miles',
                    photoURL: null
                },
                ...prev
            ];
        }); 
        */
    }

    const listenForUpdates = () => {
        // Listen for database changes in real time
        const query = db.collection('chatroom').limit(20).orderBy('timestamp', 'desc');
        const unsubscribe = query.onSnapshot((querySnapshot) => {
            let messageArr = [];
            querySnapshot.forEach((doc) => {
                const { uid, messageText, displayName, photoURL } = doc.data();
                messageArr.push({
                    messageId: doc.id,
                    uid,
                    messageText,
                    displayName,
                    photoURL
                });
                setMessages(messageArr);
            });

        });

        return unsubscribe;

        /* Unsatisfactory implementation: gets new messages every ten seconds
        setInterval(() => {
            getNewMessages();
        }, 1000 * 10); 
        */
    }

    useEffect(() => {
        // getNewMessages();
        return listenForUpdates();
    }, [])
    
    const handleChange = (update) => {
        setMessage(update);
    }

    const handleSend = async () => {
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
