import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const MyPlantHome = ({ item }) => {
    // console.log(item, '<<<');
    return (
        <View style={styles.container}>
            <Image source={item.image}
                resizeMode="cover"
                style={styles.image}
            />
            <Text>{item.text}</Text>
        </View>
    )
}

export default MyPlantHome

const styles = StyleSheet.create({
    image: {
        width: 154,
        height: 64,
        borderRadius: 5
    },
    container:{
        width:164,
        height: 108,
        backgroundColor: '#EEF3EC',
        gap:8,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        margin:4,
    }
})