import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const LikeButton = () => {
    return (
        <View style={{
            flexDirection: 'row',
            gap: 4,
            borderWidth:1,
            borderRadius: 5,
            padding: 4,
            alignItems:'center',
            justifyContent: 'center',
            borderColor: '#EF6423'
        }}>
            <Image
                style={styles.buttonImage}
                resizeMethod='contain'
                source={require('../../../assets/button/Dislike.png')}
            />
            <Text
                style={styles.buttonText}
            >Dislike</Text>
        </View>
    )
}

export default LikeButton

const styles = StyleSheet.create({
    buttonImage: {
        width: 24,
        height: 24
    },
    buttonText: {
        fontFamily: 'Karla_500Medium',
        fontSize: 16
    }
})