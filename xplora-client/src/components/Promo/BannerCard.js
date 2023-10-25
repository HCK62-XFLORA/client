import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
// import { MotiView } from 'moti'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function bannerCard({ item }) {
    // console.log(item, '<<<<bannercard');
    return (
        <View style={promoStyles.container}
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
        >
            <View style={promoStyles.content
            }>

                <Image source={{uri: item.image}}
                    resizeMode="cover"
                    style={promoStyles.image}
                />
                {/* <View style={promoStyles.text}>
                    <Text style={promoStyles.text}>{item.text}</Text>
                </View> */}
            </View>
        </View>
    )
}


const promoStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: windowWidth * 1,
        marginTop: 8
    },
    content: {
        marginLeft: 16,
        marginRight:16
        // borderWidth: 1,
        // borderColor: '#EAEAEA',
        // borderRadius: 10,

    },
    image: {
        width: '100%',
        height: 155,
        borderRadius:10,
        // borderTopLeftRadius: 7,
        // borderTopRightRadius: 7,
    },
    text: {
        margin: 8,
        fontSize: 14,
        color: '#333'
    },

})