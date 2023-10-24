import React, { useState } from 'react';
import { View, Dimensions, FlatList, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { generateResponse } from '../helpers/ChatGPT';
const { width, height } = Dimensions.get('screen')

const ChatRoom = () => {

    // const OpenAI = require("openai");

    // const openai = new OpenAI({
    //     apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
    // });


    // const instance = axios({
    //     baseURL: 'https://api.openai.com/v1/engines/davinci-codex/completions',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${OPENAI_KEY}`
    //     }
    // });

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    // const chatGpt = axios.create({
    //         url: "https://api.openai.com/v1/engines/davinci-codex/completions",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer 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`
    //         }
    //     });

    //  const generateResponse = async (messages) => {
    //     try {
    //       const response = await chatGpt.post('', {
    //         prompt: messages,
    //         max_tokens: 60
    //       });
    //       return response.data.choices[0].text;
    //     } catch (error) {
    //       console.error(error);
    //       return '';
    //     }
    //   }

    // export const generateResponse = async (message) => {
    //     try {
    //         const response = await instance.post('', {
    //             prompt: message,
    //             max_tokens: 60
    //         });
    //         return response.data.choices[0].text;
    //     } catch (error) {
    //         console.error(error);
    //         return '';
    //     }
    // };

    // import { generateResponse } from './ChatGPTService';

    // // ...previous code
    
    // const sendMessage = async () => {
    //   if (!userInput) return;
    
    //   setMessages(prevMessages => [...prevMessages, `User: ${userInput}`]);
    //   const botResponse = await generateResponse(userInput);
    //   setMessages(prevMessages => [...prevMessages, `ChatGPT: ${botResponse}`]);
    //   setUserInput('');
    // };
  
    const sendMessage = async () => {
        if (text) {
            setMessages([...messages, { text, id: messages.length }]);
            const botResponse = await generateResponse(text)
            setMessages([...messages, { text, id: messages.length }])
            setText('');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={messages}
                // keyExtractor={(item) => item.id.toString()}
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