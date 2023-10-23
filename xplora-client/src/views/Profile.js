import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import ThreadHome from '../components/Thread/ThreadHome'
import MyPlantCard2 from '../components/MyPlant/MyPlantCard2'

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
            <Text style={styles.userText}>John Doe</Text>
            <Text style={styles.rankText}>johnDoe@mail.com</Text>
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
              source={require("../../assets/beginner-icon.png")}
            />
            <Text style={styles.levelParagraph}>Beginner</Text>
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
            <Text style={styles.levelParagraph}>100pts</Text>
          </View>
        </View>
        <View style={styles.pointContentContainer}>
          <Text style={styles.levelText}>Vouchers</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={require("../../assets/Profile/Voucher.png")}
            />
            <Text style={styles.levelParagraph}>2</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionTitle}>My Plant</Text>
          <FlatList
            data={myPlantData}
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
          data={threadsData}
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
  }
})