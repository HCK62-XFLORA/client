import { FlatList, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import VoucherCard from '../components/VoucherCard'
import { UserContext } from '../stores/UserContext';

const {height} = Dimensions.get('screen')

const MyVoucher = () => {
    const { userProfile } = useContext(UserContext);

    // console.log(userProfile.MyRewards, '<<rewards' );
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={userProfile.MyRewards}
                renderItem={({ item }) =>
                    <VoucherCard item={item} />
                    // <Text>ada berapa</Text>
                }
                // style={{
                //     // flex:1,
                //     overflow: "hidden",
                //     marginBottom: 16,
                //     paddingLeft: 16,
                //     paddingRight: 8,
                // }}
            />

        </View>
    )
}

export default MyVoucher

const styles = StyleSheet.create({
    mainContainer: {
        padding: 16,
        backgroundColor: 'white',
        height,
    }
})