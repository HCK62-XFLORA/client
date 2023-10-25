import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PrimaryButton = ({ title }) => {
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
            paddingTop: 12,
            paddingBottom: 12,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: '#06674B'
        }}>
            <Text
                style={styles.buttonText}
            >
                {title}
            </Text>
        </View>
        // </TouchableOpacity>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonImage: {
        height: 26,
        width: 26,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Karla_500Medium'
    }
})