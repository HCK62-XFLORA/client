import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CommentCard = ({ item }) => {
    // console.log(item);
    return (
        <View style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 8,
            marginBottom: 8,
        }}>
            <Image
                style={styles.userImage}
                source={{
                    uri: "https://c.animaapp.com/T4jp7odP/img/ellipse-5-1@2x.png",
                }}
            />
            <View style={{
                padding: 8,
                borderRadius: 10,
                backgroundColor: '#EEF3EC',
                width: 315,
                gap: 4
            }}>
                <Text style={styles.paragraph}>John Doe</Text>
                <Text style={styles.text}>{item.comment}</Text>
            </View>
        </View>
    )
}

export default CommentCard

const styles = StyleSheet.create({
    userImage: {
        position: "relative",
        width: 32,
        height: 32,
        borderRadius: 48,
    },
    paragraph: {
        color: "#000",
        // color: "#898989",
        fontSize: 16,
        letterSpacing: 0,
        lineHeight: 16,
        fontFamily: "Karla_400Regular",
        // fontFamily: "Karla_500Medium",}
    },
    text: {
        color: "#000",
        // color: "#898989",
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 16,
        fontFamily: "Karla_400Regular",
        // fontFamily: "Karla_500Medium",}
    }
})