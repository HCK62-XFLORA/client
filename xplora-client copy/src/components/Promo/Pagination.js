import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import React from 'react'

const{width} = Dimensions.get('screen')

const Pagination = ({ data, scrollX, index }) => {
    return (
        <View style={styles.container}>
            {
                data.map((_, idx) => {
                    const inputRange = [(idx-1) * width, idx * width, (idx +1) * width]
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 24, 8],
                        extrapolate: 'clamp'
                    })

                   return  <Animated.View
                        key={idx.toString()}
                        style={[styles.dot, idx === index && styles.dotActive, {width: dotWidth}]}
                        
                        />

                })
            }
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    dot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        borderWidth:1,
        borderColor: '#666',
        marginHorizontal:2

    },
    dotActive: {
        backgroundColor: '#666'
    }
    ,container: {
        bottom: 10,
        flexDirection: 'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 4,
        marginTop:4
    }
})