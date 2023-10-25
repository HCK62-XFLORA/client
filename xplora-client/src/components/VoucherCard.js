import * as React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const { width, height } = Dimensions.get('screen')

const VoucherCard = ({ item }) => {

  // console.log(item, '<<voucher card');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <Image
          source={{uri: item.Reward.image}}
          resizeMethod="contain"
          style={{
            width: width * 0.9,
            height: 148,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
            // overflow:'hidden'
          }}
        />
        <View style={{
          backgroundColor: 'white',
          width: width * 0.9,
          // height: 40,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          justifyContent: 'space-between',
          // alignContent:'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          <Text
            style={{
              fontFamily: 'Karla_500Medium',
              fontSize: 20,
              padding: 12,
              padding: 16,
            }}
          >{item.Reward.point} Points</Text>
          <View
            style={{
              backgroundColor: '#898989',
              borderRadius: 10,
              marginRight: 16
              // paddingRight:16
            }}
          >
            <Text
              style={{
                fontFamily: 'Karla_500Medium',
                fontSize: 16,
                padding: 8,
                borderRadius: 99,
                color: 'white'
              }}
            >Redeemed</Text>
          </View>
        </View>
      </View>
    </View>
    // <Card>
    //   <Card.Cover source={require("../../assets/PromoCard/promoCard-1.png")} />
    //   <Card.Actions>
    //     <Text>100 Points</Text>
    //     <Button
    //       mode="contained"
    //       buttonColor="#898989"
    //       onPress={() => console.log("Pressed")}>
    //       Redeemed
    //     </Button>
    //     <View></View>
    //   </Card.Actions>
    // </Card>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    // height,
    // backgroundColor: 'white'
  },
  cardContainer: {
    // borderWidth: 1,
    // justifyContent:'center',
    alignItems: 'center',
    // height: 200,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.22,
    elevation: 3,
  }
})

export default VoucherCard;
