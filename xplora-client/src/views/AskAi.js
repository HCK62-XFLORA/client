import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, FlatList, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { generateResponse } from '../helpers/ChatGPT';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../stores/UserContext';
const { width, height } = Dimensions.get('screen')

const ChatRoom = () => {

    const route = useRoute();
    // const { questionAi } = route.params;
    // console.log(route, '<<askAi');
    const { user } = useContext(UserContext);

    // console.log(questionAi, '<<<<askAi');
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

    // console.log(messages.length, '<<<<length message');

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
            setMessages((prev) => {
                // console.log(prev.length, "<-- user nanya")
                return [...prev, { text, id: prev.length, type: "question" }, 
                // {
                //     text: "lagiapakek", id: prev.length + 1, type: "answer"
                // }
            ]
            });
            setText('');
            const botResponse = await generateResponseFromChatGPT(text);
            // console.log(botResponse, '<<<<respon');
            const res = botResponse[0].message.content
            setMessages((prev) => {
                // prev nya dihilangin object yang terakhir
                // console.log(prev.length, "<--- dijawab bot")
                return [...prev, { text: res, id: prev.length, type: "answer" }]
            }); 
           
        }
    };

    const generateResponseFromChatGPT = async (userInput) => {
        try {
            // const response = await axios.post('https://wadinodev.com/threads/ask', {
            //     prompt: userInput,
            //     max_tokens: 60
            // }, {
            //     headers: {
            //         'Authorization': `Bearer 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`, // Replace with your actual API key
            //         'Content-Type': 'application/json'
            //     }
            // });

            // return response.data.choices[0].text;
            const { data } = await axios({
                url: `https://wadinodev.com/threads/ask`,
                headers: { access_token: user.access_token },
                method: 'POST',
                data: { questionType: 'masalah', message: userInput }
            })
            return data

        } catch (error) {
            console.error(error);
            return 'Error occurred while fetching a response.';
        }
    };

    useEffect(() => {
        if (route.params) {
            const { questionAi } = route.params;
            // console.log(route, '<<askAi');
            setText(questionAi)
        }
    }, [route])

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={messages}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={item.type === 'question' ? styles.userMessageContainer : styles.botMessageContainer}>
                        <Text style={item.type === 'answer' ? styles.userMessageText : styles.botMessageText}>{item.text}</Text>
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
    userMessageContainer: {
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
    botMessageContainer: {
        padding: 12,
        backgroundColor: '#E6E6E6', // Change to your preferred bot message background color
        borderRadius: 8,
        marginRight: 60, // Adjust the position to distinguish it from user messages
        marginTop: 12,
        marginLeft: 8,
        alignItems: 'flex-start', // Align bot messages to the left
    },
    userMessageText: {
        fontSize: 16,
        // alignItems: 'flex-end'
        maxWidth: width * 0.8,
    },
    botMessageText: {
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