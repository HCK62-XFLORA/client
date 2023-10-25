import { StyleSheet, Text, View, ScrollView, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button } from 'react-native-paper'
import MyPlantCard2 from '../components/MyPlant/MyPlantCard2'
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../stores/UserContext';
import LottieView from 'lottie-react-native';

const myPlantData = [
  {
    id: 1,
    image: require('../../assets/MyPlantCard/card1.png'),
    text: 'My Plant 1'
  },
  {
    id: 2,
    image: require('../../assets/MyPlantCard/card2.png'),
    text: 'My Plant 2'
  },
  {
    id: 3,
    image: require('../../assets/MyPlantCard/card3.png'),
    text: 'My Plant 3'
  },
  {
    id: 2,
    image: require('../../assets/MyPlantCard/card2.png'),
    text: 'My Plant 2'
  },
  {
    id: 1,
    image: require('../../assets/MyPlantCard/card1.png'),
    text: 'My Plant 1'
  },
  {
    id: 2,
    image: require('../../assets/MyPlantCard/card2.png'),
    text: 'My Plant 2'
  },
  {
    id: 3,
    image: require('../../assets/MyPlantCard/card3.png'),
    text: 'My Plant 3'
  },
  {
    id: 2,
    image: require('../../assets/MyPlantCard/card2.png'),
    text: 'My Plant 2'
  },
]

const { height } = Dimensions.get('screen')

const MyPlan = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const { userProfile } = useContext(UserContext);

  // console.log(userProfile, '<<<<myPlant');


  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userContentContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>My Plants</Text>
          <View style={styles.plantDataContainer}>
            <Image
              style={styles.userImage}
              source={require('../../assets/icons/Myplant-icon.png')}
              resizeMode='contain'
            />
            <Text style={styles.rankText}>{userProfile?.MyPlants.length} plants</Text>
          </View>
          <Button
            style={styles.addPlantButton}
            onPress={() => {
              navigation.navigate("AddMyPlant");
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              gap: 4,
              justifyContent: 'center'
            }}>
              <AntDesign name="plus" size={16} color="#06674B" />
              <Text style={styles.buttonText}>Add Plant</Text>
            </View>
          </Button>
        </View>
        <Image
          style={styles.illustration}
          source={require('../../assets/Illustration/taneman-illustration.png')}
          resizeMode='contain'
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionTitle}>My Plant</Text>
          <FlatList
            data={userProfile?.MyPlants}
            renderItem={({ item }) =>
              // <MyPlantCard2 item={item} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyPlantDetail", { id: item.id })
                }}>
                <MyPlantCard2 item={item}
                  nestedScrollEnabled={true}
                />
              </TouchableOpacity>
            }
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{
              // flex:1, 
              overflow: 'hidden',
              marginBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
              alignSelf: 'center'
              // alignContent: 'space-between'
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default MyPlan

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#DEEAE5',
    // padding: 16,
    // gap: 8
  },
  userContentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  userContainer: {
    gap: 16
  },
  userImage: {
    // position: "relative",
    width: 24,
    height: 24,
    // borderRadius: 48,
  },
  userText: {
    color: "#898989",
    fontSize: 20,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  rankText: {
    color: "#000",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  illustration: {
    height: 146,
    width: 156
  },
  plantDataContainer: {
    flexDirection: 'row',
    gap: 8,
    // alignContent:'center',
    alignItems: 'center'
  },
  addPlantButton: {
    borderWidth: 1,
    // backgroundColor: 'black',
    borderColor: '#06674B',
    borderRadius: 10,
    borderStyle: 'dashed',
    // alignItems: 'center',
    justifyContent: 'center',
    width: 126,
    alignContent: 'center',
    paddingTop: 4
    // height: 56
  },
  buttonText: {
    color: '#06674B',
    // marginLeft: 4
  },
  bottomContainer: {
    // top: 420,
    // height: 100,
    marginTop: 16,
    paddingTop: 16,
    // backgroundColor: '#F7F9F6',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 8,
    minHeight: height * 0.6
    // height: height * 0.6,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    paddingLeft: 16
    // fontWeight:600
  },
})