import React, { useState } from 'react';
import { View, Dimensions, FlatList, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen')

const ChatRoom = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (text) {
            setMessages([...messages, { text, id: messages.length }]);
            setText('');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your message here"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Image
                        style={styles.sendIcon}
                        source={require('../../assets/button/sent.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        // padding: 16,
    },
    messageContainer: {
        padding: 12,
        backgroundColor: '#EEF3EC',
        // margin: 4,
        borderRadius: 8,
        marginLeft: 60,
        // marginBottom: 8,
        marginTop: 12,
        marginRight: 8,
        // width: width * 0.8 ,
        // justifyContent: 'flex-end',
        // alignContent: 'flex-end',
        alignItems: 'flex-end',
        // margin: 16
    },
    messageText: {
        fontSize: 16,
        // alignItems: 'flex-end'
        maxWidth: width * 0.8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6.22,
        elevation: 3,
        paddingBottom: 34,
        paddingTop: 14,
        width,
        justifyContent: 'center',
        gap: 8
    },
    input: {
        // flex: 0.8,
        height: 40,
        borderColor: 'gray',
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: '#EEF3EC',
        width: width * 0.8,

    },
    sendIcon: {
        width: 32,
        height: 32,
    },
});

export default ChatRoom;