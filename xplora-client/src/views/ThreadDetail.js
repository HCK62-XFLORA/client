import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import ThirdButton from '../components/Buttons/ThirdButton';
import LikeButton from '../components/Buttons/LikeButton';
import DislikeButton from '../components/Buttons/DislikeButton';
import CommentCard from '../components/Comments/CommentCard';
// import { TextInput } from "react-native-paper";

const { width, height } = Dimensions.get('screen')

const ThreadDetail = () => {
    const route = useRoute()
    const id = route.params.id

    const [text, setText] = React.useState("");


    const forumData =
    {
        id: 1,
        image: require('../../assets/MyPlantCard/card1.png'),
        text: 'My Plant 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue. Vivamus dapibus sed quam a fermentum. Nulla sit amet est in quam congue tempus. Praesent feugiat suscipit purus, non interdum quam venenatis nec. Vestibulum non massa eget ex interdum fermentum. Nullam vehicula arcu sed mi iaculis, vel cursus eros sollicitudin. Aliquam nec justo vel nisl posuere vehicula. Cras vestibulum a nunc ac euismod. Fusce tincidunt libero in erat dapibus, vel tincidunt purus eleifend.'
    }

    const comments = [
        {
            id: 1,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
        },
        {
            id: 2,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
        },
        {
            id: 3,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
        },
        {
            id: 4,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
        },
    ]



    // const [text, setText] = React.useState("");

    // const [password, setPassword] = React.useState("");

    // const [showPassword, setShowPassword] = React.useState(false);

    // let [fontsLoaded, fontError] = useFonts({
    //     Karla_500Medium, Karla_400Regular
    // });

    // if (!fontsLoaded && !fontError) {
    //     return null;
    // }

    // console.log(id, '<<<<');
    return (
        <>
            <View style={styles.mainContainer}>
                <FlatList
                    data={comments}
                    renderItem={({ item }) =>
                        <CommentCard item={item} />
                    }
                    style={{
                        // flex:1, 
                        overflow: 'hidden',
                        marginBottom: 16,
                        // paddingLeft: 16,
                        paddingRight: 16,
                        height,
                    }}
                    ListHeaderComponent={
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{forumData.text}</Text>
                            <Text style={styles.contributor}>John Doe</Text>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.plantImage}
                                    // source={{ uri: `${forumData.image}` }}
                                    source={require('../../assets/MyPlantCard/card1.png')}
                                    resizeMethod='contain'
                                />
                            </View>
                            <Text style={styles.paragraph}>{forumData.description}</Text>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16,
                                marginBottom: 16,
                                gap: 8,
                            }}>
                                <LikeButton />
                                <DislikeButton />
                            </View>
                            <Text style={styles.commentTitle}>Comments</Text>
                        </View>
                    }
                />
            </View>
            <View style={{
                // marginBottom: 24,
                // width,
                // borderWidth: 1,
                marginTop:-30,
                backgroundColor: 'white',
                // height:86,
                paddingTop:14,
                paddingBottom:34,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
                shadowOpacity: 0.12,
                shadowRadius: 6.22,
                elevation: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                // alignContent: 'center',
                alignItems: 'center',
                gap: 8
            }}>
                <TextInput
                    style={styles.input}
                    activeOutlineColor="#898989"
                    mode="outlined"
                    label="comment"
                    placeholder="Write your comment here"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <TouchableOpacity>
                    <Image
                        style={{
                            width: 32,
                            height: 32
                        }}
                        source={require('../../assets/button/sent.png')} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ThreadDetail

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        height,
        // gap: 8
    },
    title: {
        color: "#000",
        // color: "#898989",
        fontSize: 20,
        letterSpacing: 0,
        fontFamily: "Karla_500Medium",
        marginBottom: 8
    },
    contributor: {
        // color: "#000",
        color: "#898989",
        fontSize: 16,
        letterSpacing: 0,
        fontFamily: "Karla_500Medium",
        marginBottom: 16
    },
    imageContainer: {
        // justifyContent:'center',
        alignSelf: 'center'
        // alignContent: 'center'
        // marginTop: 8
    },
    plantImage: {
        width: width * 0.9,
        height: 200,
        borderRadius: 8,
        marginBottom: 16
    },
    paragraph: {
        color: "#000",
        // color: "#898989",
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 16,
        fontFamily: "Karla_400Regular",
        // fontFamily: "Karla_500Medium",
    },
    buttonImage: {
        height: 26,
        width: 26
    },
    buttonText: {
        color: '#06674B',
        fontFamily: 'Karla_500Medium'
    },
    commentTitle: {
        fontSize: 18,
        fontFamily: 'Karla_500Medium'
    },
    input: {
        // flex: 1,a
        borderRadius: 10,
        // height: 45,
        // borderWidth: 1,
        width: width * 0.8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft:12,
        // justifyContent: 'center',
        // alignContent:'center',
        // alignItems:'center',
        alignSelf: 'center',
        backgroundColor:'#EEF3EC'

    },
})