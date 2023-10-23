import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ThirdButton = ({title}) => {
    return (
        // <TouchableOpacity style={{ alignItems: 'center', marginTop:16 }}>
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
                source={require('../../../assets/button/plant-scan.png')}
            />
            <Text
                style={styles.buttonText}
            >
                {title}
            </Text>
        </View>
        // </TouchableOpacity>
    )
}

export default ThirdButton

const styles = StyleSheet.create({
    buttonImage: {
        height: 26,
        width: 26
    },
    buttonText: {
        color: '#06674B',
        fontFamily: 'Karla_500Medium'
    }
})