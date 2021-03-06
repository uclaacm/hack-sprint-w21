import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function ChatMessage(props) {
    const { sent, messageText, displayName, photoURL } = props;
    const messageStyles = [styles.message];
    if (sent) {
        messageStyles.push(styles.sent);
    } else {
        messageStyles.push(styles.received)
    }

    return (
        <View style={{alignSelf: sent ? 'flex-end' : 'flex-start', marginTop: 2, marginBottom: 2}}>
            <View style={styles.messageWrapper}>
                {!sent && (photoURL ?
                        <Image
                        source={{
                            uri: photoURL
                        }}
                        style={styles.photo}
                        /> :
                        <Image 
                            source={require('../images/unknown-user-3.jpg')}
                            style={styles.photo}
                        />)
                    }
                <View>
                    { !sent && <Text style={styles.nameText}>{displayName}</Text>}
                    <View style={messageStyles}>
                        <Text style={sent ? styles.sent : styles.received}>{messageText}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nameText: {
        marginLeft: 8,
        color: 'gray'
    },
    messageWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    message: {
        maxWidth: 300,
        padding: 10,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 15,
        alignSelf: 'center',
    },
    photo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 10,
        marginBottom: 5
    },
    sent: {
        backgroundColor: '#ffa611',
        color: 'white'
    },
    received: {
        backgroundColor: '#F3F3F3',
        color: 'black'
    }
});

export default ChatMessage;
