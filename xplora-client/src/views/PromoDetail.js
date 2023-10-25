import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { UserContext } from '../stores/UserContext'
import LottieView from 'lottie-react-native';
import PrimaryButton from '../components/Buttons/PrimaryButton'

const { width, height } = Dimensions.get('screen')
const PromoDetail = ({ navigation }) => {
    const { user, userProfile, setUserProfile } = useContext(UserContext);
    const route = useRoute()
    const id = route.params.id
    // console.log(id, '<<<promo detail');
    const [promo, setPromo] = useState({})

    const fetchPromoById = async () => {
        try {
            const { data } = await axios({
                url: `https://wadinodev.com/users/reward/${id}`,
                method: "GET",
                headers: { access_token: user.access_token }
            });
            setPromo(data);
            // return data
        } catch (error) {
            console.log(error);
        }
    }

    const redeemVoucher = async () => {
        try {
            // console.log( id, 'pressed');
            await axios({
                url: `https://wadinodev.com/users/claim-reward/${id}`,
                method: "PATCH",
                headers: { access_token: user.access_token }

            })
            const { data } = await axios({
                url: `https://wadinodev.com/users/profile/${user.id}`,
                method: "GET",
                headers: { access_token: user.access_token },
            });
            setUserProfile(data);
            navigation.navigate('MyVoucher')
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(promo, '<<<');

    useState(() => {
        fetchPromoById()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={styles.mainContainer}>
                <View style={{
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <Image 
                    source={{uri: promo.image}}
                    />
                    <Text>PromoDetail</Text>
                </View>
            </View> */}

            <View style={styles.mainContainer}>
                <View
                    style={styles.cardContainer}
                >
                    <Image
                        source={{ uri: promo.image }}
                        resizeMethod="contain"
                        style={{
                            width: width * 0.9,
                            height: 220,
                            borderRadius: 10
                            // overflow:'hidden'
                        }}
                    />
                    <View style={{
                        // backgroundColor: 'white',
                        width: width * 0.9,
                        // height: 40,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        justifyContent: 'space-between',
                        // alignContent:'center',
                        // alignItems: 'center',
                        // flexDirection: 'row'
                    }}>
                        <Text
                            style={{
                                fontFamily: 'Karla_500Medium',
                                fontSize: 20,
                                marginTop: 12,
                                marginBottom: 12,
                            }}
                        >{promo.title}</Text>
                        <Text
                            style={{
                                fontFamily: 'Karla_500Medium',
                                fontSize: 14,
                                marginBottom: 12,
                            }}
                        >{promo.description}</Text>
                        <Text
                            style={{
                                fontFamily: 'Karla_500Medium',
                                fontSize: 14,
                                marginBottom: 12,
                            }}
                        >Redeem: {promo.point} pts</Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 22 }}
                        onPress={() => {
                            redeemVoucher()

                        }}
                    >
                        <PrimaryButton title={'Redeem Voucher'} />
                    </TouchableOpacity>
                </View>
                {/* <LottieView 
                style={{flex:1}}
                source={require('../../assets/Animation/Animation-1698244161327.json')} autoPlay loop /> */}

            </View>
        </SafeAreaView>
    )
}

export default PromoDetail

const styles = StyleSheet.create({
    mainContainer: {
        padding: 16,
        height,
        backgroundColor: 'white'
    },
    cardContainer: {
        // borderWidth: 1,
        // justifyContent:'center',
        alignItems: 'center',
        height: 200,
        borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 0,
        // },
        // shadowOpacity: 0.12,
        // shadowRadius: 5.22,
        // elevation: 3,
    }
})