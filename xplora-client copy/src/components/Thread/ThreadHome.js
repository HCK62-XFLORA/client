import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ThreadHome = ({ item }) => {
    // console.log(item);
    return (
        <View style={styles.container}>
            <Image source={item.image}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.threadTitle}>{item.title}</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={styles.threadParagraph}>{item.description}</Text>
                <Text style={styles.threadParagraph}>{item.category}</Text>
            </View>
        </View>
    )
}

export default ThreadHome

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 8
    },
    container: {
        // width:357,
        // height: 90,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEF3EC',
        gap: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'start',
        padding: 8,
        borderRadius: 10,
        marginRight: 8,
        marginBottom: 8
    },
    textContainer: {
        justifyContent: 'space-between',
        gap:4,
        width: 260
    },
    threadTitle: {
        fontFamily: "Karla_500Medium",
        fontSize: 14
    },
    threadParagraph: {
        fontFamily: "Karla_500Medium",
        fontSize: 12
    }
})