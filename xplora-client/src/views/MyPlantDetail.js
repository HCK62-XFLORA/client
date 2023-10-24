import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import {
    useFonts,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_400Regular
} from "@expo-google-fonts/karla";
import ThirdButton from '../components/Buttons/ThirdButton';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { UserContext } from '../stores/UserContext';


const { width } = Dimensions.get('screen')



const MyPlantDetail = ({ navigation }) => {
    const route = useRoute()
    const id = route.params.id
    const { user } = useContext(UserContext);
    

    // console.log(id, '<<<myplant');
    //   const [image, setImage] = useState(null);

    const fetchPlantById = async () => {
        try {
            const { data } = await axios({
                url: "https://wadinodev.com/users/my-plants/",
                method: "GET",
            });
            setThreads(data);
            return data
        } catch (error) {
            console.log(error);
        }
    }




    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData()
            console.log(result.uri);
            formData.append('image', { uri: result.uri, name: filename, type })
            const { data } = await axios({
                url: "https://wadinodev.com/users/predict",
                method: "post",
                headers: {
                    access_token: user.access_token,
                    "Content-Type": 'multipart/form-data'
                },
                data: formData
            })

            console.log(data, '<<<<<<data predict');
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error, '<<<predicr');
        }
        // No permissions request is necessary for launching the image library

    };


    const myPlantData =
    {
        id: 1,
        image: require('../../assets/MyPlantCard/card1.png'),
        text: 'My Plant 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue. Vivamus dapibus sed quam a fermentum. Nulla sit amet est in quam congue tempus. Praesent feugiat suscipit purus, non interdum quam venenatis nec. Vestibulum non massa eget ex interdum fermentum. Nullam vehicula arcu sed mi iaculis, vel cursus eros sollicitudin. Aliquam nec justo vel nisl posuere vehicula. Cras vestibulum a nunc ac euismod. Fusce tincidunt libero in erat dapibus, vel tincidunt purus eleifend.'
    }

    const [text, setText] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);

    let [fontsLoaded, fontError] = useFonts({
        Karla_500Medium, Karla_400Regular
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    // console.log(id, '<<<<');
    return (
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{myPlantData.text}</Text>
                <Text style={styles.contributor}>John Doe</Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.plantImage}
                        // source={{ uri: `${myPlantData.image}` }}
                        source={require('../../assets/MyPlantCard/card1.png')}
                        resizeMethod='contain'
                    />
                </View>
                <Text style={styles.paragraph}>{myPlantData.description}</Text>
                <TouchableOpacity
                    style={{ alignItems: 'center', marginTop: 16 }}
                    onPress={pickImage}
                >
                    <ThirdButton title={'Diagnose Plant'} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ alignItems: 'center', marginTop:16 }}>
                    <View style={{
                        borderWidth: 1,
                        // width: 175,
                        // height: 45,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#06674B',
                        flexDirection: 'row',
                        gap: 8,
                        padding: 12
                    }}>
                        <Image
                            style={styles.buttonImage}
                            resizeMethod='contain'
                            source={require('../../assets/button/plant-scan.png')}
                        />
                        <Text
                        style={styles.buttonText}
                        >
                            Add My Plant
                        </Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default MyPlantDetail

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
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
    }
})