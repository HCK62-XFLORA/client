import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, FlatList, LogBox } from 'react-native'
import React, { useContext } from 'react'
import ThreadHome from '../components/Thread/ThreadHome'
import MyPlantCard2 from '../components/MyPlant/MyPlantCard2'
import { UserContext } from '../stores/UserContext'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper'
import beginnerBadge from '../../assets/userBadges/badge-beginner.png'
import advanceBadge from '../../assets/userBadges/badge-advance.png'
import intermediateBadge from '../../assets/userBadges/badge-intermediate.png'
import * as SecureStore from "expo-secure-store";



const myPlantData = [
  {
    image: require('../../assets/MyPlantCard/card1.png'),
    text: 'My Plant 1'
  },
  {
    image: require('../../assets/MyPlantCard/card2.png'),
    text: 'My Plant 2'
  },
  {
    image: require('../../assets/MyPlantCard/card3.png'),
    text: 'My Plant 3'
  },
  {
    image: require('../../assets/MyPlantCard/card2.png'),
    text: 'My Plant 2'
  },
]

const threadsData = [
  {
    image: require('../../assets/MyPlantCard/card1.png'),
    title: 'My Plant 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ',
    category: 'Disease'
  },
  {
    image: require('../../assets/MyPlantCard/card2.png'),
    title: 'My Plant 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ',
    category: 'Story'
  },
  {
    image: require('../../assets/MyPlantCard/card3.png'),
    title: 'My Plant 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ',
    category: 'Tips & Trick'
  },
  {
    image: require('../../assets/MyPlantCard/card2.png'),
    title: 'My Plant 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ',
    category: 'Story'
  },
]

const Profile = ({navigation}) => {
  const { userProfile, setUser } = useContext(UserContext);
  const getBadge = () => {
    // return advanceBadge
    if (userProfile.badge === 'Beginner') return beginnerBadge
    else if (userProfile.badge === 'Expert') return advanceBadge
    else if (userProfile.badge === 'Intermediate') return intermediateBadge
  }

  const handleLogout = async () => {
    try {
      const access_token = await SecureStore.deleteItemAsync("access_token");
      const deleteId = await SecureStore.deleteItemAsync("id");
      // const id = await SecureStore.deleteItemAsync("UserId");
      setUser(null);
    } catch (error) {
      console.log("🚀 ~ file: App.js:37 ~ getUser ~ error:", error);
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userContentContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImage}
            source={require('../../assets/Profile/User-pict.png')}
          />
          <View>
            <Text style={styles.userText}>{userProfile?.username}</Text>
            <Text style={styles.rankText}>{userProfile?.email}</Text>
            <TouchableOpacity
            style={styles.addPlantButton}
            onPress={() => {
              // console.log('logout');
              handleLogout();
              // navigation.navigate("AddMyPlant");
            }}
          >
            <View style={{
              flexDirection: 'row',
              // alignItems: 'center',
              // alignContent: 'center',
              // alignSelf: 'center',
              gap: 8,
              // justifyContent: 'center',
              paddingTop: 8,
              paddingBottom: 8,
              
            }}>
              {/* <AntDesign name="plus" size={16} color="#06674B" /> */}
              <SimpleLineIcons name="logout" size={16} color="#06674B" />
              <Text style={styles.buttonText}>Log Out</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.illustration}
          source={require('../../assets/Illustration/rumah-illustration.png')}
          resizeMode='contain'
        />
      </View>
      <View style={styles.pointContainer}>
        <View style={styles.pointContentContainer}>
          <Text style={styles.levelText}>Level</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={getBadge()}
            />
            <Text style={styles.levelParagraph}>{userProfile?.badge}</Text>
          </View>
        </View>
        <View style={styles.pointContentContainer}>
          <Text style={styles.levelText}>Points</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={require("../../assets/point-icon.png")}
            />
            <Text style={styles.levelParagraph}>{userProfile?.point} pts</Text>
          </View>
        </View>
        <TouchableOpacity
         style={styles.pointContentContainer}
         onPress={()=> navigation.navigate('MyVoucher')}
         >
          <Text style={styles.levelText}>Vouchers</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={require("../../assets/Profile/Voucher.png")}
            />
            <Text style={styles.levelParagraph}>{userProfile?.MyRewards.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionTitle}>My Plant</Text>
          <FlatList
            data={userProfile?.MyPlants}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyPlantDetail", { id: item.id })
                }}>
                <MyPlantCard2 item={item} />
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
              // alignContent: 'space-between'
            }}
          />
        </View>
        <Text style={styles.sectionTitle}>My Thread</Text>
        <FlatList
          data={userProfile?.Threads}
          nestedScrollEnabled={true}
          renderItem={({ item }) =>
            <ThreadHome item={item} />
          }
          style={{
            // flex:1, 
            overflow: 'hidden',
            marginBottom: 16,
            paddingLeft: 16,
            paddingRight: 8,
          }}
        />
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#DEEAE5',
    // padding: 16,
    // gap: 8
  },
  userImage: {
    position: "relative",
    width: 64,
    height: 64,
    borderRadius: 48,
  },
  userText: {
    color: "#000000",
    fontSize: 20,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  rankText: {
    color: "#898989",
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  userContainer: {
    gap: 8
  },
  illustration: {
    height: 146
  },
  userContentContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  pointContainer: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    // alignContent:'center'
    alignItems: 'center',
    gap: 22,
    margin: 16
  },
  pointImage: {
    // position: "relative",
    width: 18,
    height: 18,
  },
  levelContent: {
    flexDirection: 'row',
    gap: 4
  },
  pointContentContainer: {
    alignContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  levelText: {
    color: "#898989",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  levelParagraph: {
    color: "#000",
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    paddingLeft: 16
    // fontWeight:600
  },
  bottomContainer: {
    // top: 420,
    // height: 100,
    marginTop: 8,
    paddingTop: 16,
    // backgroundColor: '#F7F9F6',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 8
  },
  addPlantButton: {
    // borderWidth: 1,
    // backgroundColor: 'black',
    borderColor: '#06674B',
    borderRadius: 10,
    // borderStyle: 'dashed',
    // alignItems: 'center',
    // alignSelf:'center'
    // justifyContent: 'center',
    // width: 126,
    // alignContent: 'center',
    // paddingTop: 4
    // height: 56
  },
  buttonText: {
    color: '#06674B',
    // marginLeft: 4
  },
})