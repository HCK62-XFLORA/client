import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import data from '../../utilities/navImage'




const NavBottomActive = ({ image, list }) => {
    // console.log(data.data);
    return (
        <View>
            {/* <FlatList
      data={data}
      renderItem={({ item }) =>
                    <BannerCard item={item}
                    />
                }
      /> */}
            <Image source={data.data[list].image}
                resizeMode="cover"
                style={{height: 45, width:45}}
            />
        </View>
    )
}

export default NavBottomActive

const styles = StyleSheet.create({})