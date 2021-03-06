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
// Import Firebase
import firebase from 'firebase';
// Import database
import { db } from '../firebase/config';

function ChatScreen({ route }) {
    const [currentUser, setCurrentUser] = useState('0');
    useEffect(() => {
        setCurrentUser(route.params.uid);
    }, []);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const addNewMessage = async (uid, messageText) => {
        try { 
            // Add new document with auto-generated ID (returns a document reference)
            const docRef = await db.collection('chatroom').add({
                uid,
                messageText,
                displayName: route.params.displayName || 'Anonymous',
                photoURL: null,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Document written with ID: " + docRef.id);
        } catch (error) {
            console.log(error)
        }
    }

    const getNewMessages = async () => {
        try {
            // Create and execute query for latest 20 messages
            const query = db.collection('chatroom').orderBy('timestamp', 'desc').limit(20);
            const querySnapshot = await query.get();
            
            // Push each result doc's data to temporary message array
            let messageArr = [];
            querySnapshot.forEach((doc) => {
                const { uid, messageText, displayName, photoURL } = doc.data();

                // This is JavaScript shorthand, if the property and the variable you are using have the same name you can just use the variable name
                messageArr.push({
                    messageId: doc.id,
                    uid,
                    messageText,
                    displayName,
                    photoURL
                });
            });

            // After processing all documents, set state
            setMessages(messageArr);
        } catch (error) {
            console.log(error);
        }
    }

    const listenForUpdates = () => {
        // Listen for database changes in real time
        const query = db.collection('chatroom').limit(20).orderBy('timestamp', 'desc');

        // query.onSnapshot creates a listerner that runs a function whenever changes occur in database
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
