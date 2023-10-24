import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const MyPlantHome = ({ item }) => {
    // console.log(item, '<<<');
    return (
        <View style={styles.container}>
            <Image source={{ uri: `${item.imgUrl}` }}
                resizeMode="cover"
                style={styles.image}
            />
            <Text  >{item?.Plant?.name}</Text>
        </View>
    )
}

export default MyPlantHome

const styles = StyleSheet.create({
    image: {
        width: 105,
        height: 64,
        borderRadius:5
    },
    container: {
        width: 125,
        height: 108,
        backgroundColor: '#EEF3EC',
        gap: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 8,
    }
})