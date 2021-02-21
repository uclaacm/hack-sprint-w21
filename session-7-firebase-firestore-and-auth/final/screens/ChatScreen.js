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

function ChatScreen() {
    const CURRENT_USER = 0;
    const [messageText, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const addNewMessage = async (uid) => {
        try { 
            const docRef = await db.collection('chatroom').add({
                uid,
                messageText: message,
                displayName: 'Miles Wu',
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

    const getNewMessages = async () => {
        try {
            const query = db.collection('chatroom').limit(20).orderBy('timestamp', 'desc');
            const querySnapshot = await query.get();
            
            let temp = [];
            querySnapshot.forEach((doc) => {
                const { uid, messageText, displayName, photoURL } = doc.data();
                temp.push({
                    messageId: doc.id,
                    uid,
                    messageText,
                    displayName,
                    photoURL
                });
            });
            setMessages(temp);
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

    useEffect(() => {
        getNewMessages();
        // Gets new messages every ten seconds
        // setInterval(() => {
        //     getNewMessages();
        // }, 1000 * 10);
    }, [])
    
    const handleChange = (update) => {
        setMessage(update);
    }

    const handleSend = async () => {
        addNewMessage(CURRENT_USER);
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
                            value={messageText}
                            onChangeText={handleChange}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendBtn}
                            disabled={messageText === ''}
                        >
                            <FontAwesome name="send" size={24} color={messageText ? "#ee6123" : 'gray'} />
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
