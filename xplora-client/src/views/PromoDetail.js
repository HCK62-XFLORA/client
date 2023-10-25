import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const PromoDetail = ({ navigation }) => {
    const route = useRoute()
    const id = route.params.id
    // console.log(id, '<<<promo detail');

    const fetchPromoById = async () => {
        try {
            const { data } = await axios({
                url: `https://wadinodev.com/users/my-plant/${id}`,
                method: "GET",
                headers: { access_token: user.access_token }
            });
            setPlant(data);
            // return data
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <Text>PromoDetail</Text>
        </View>
    )
}

export default PromoDetail

const styles = StyleSheet.create({})