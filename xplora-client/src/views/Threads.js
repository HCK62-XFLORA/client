import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import UserCard from '../components/UserCard'
import ThreadHome from '../components/Thread/ThreadHome'

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
  {
    image: require('../../assets/MyPlantCard/card2.png'),
    title: 'My Plant 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ',
    category: 'Story'
  },
  {
    image: require('../../assets/MyPlantCard/card2.png'),
    title: 'My Plant 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ',
    category: 'Story'
  },
]

const categories = [
  {
    title: 'All',
  },
  {
    title: 'Tips & Trick',
  },
  {
    title: 'Disease',
  },
  {
    title: 'Stories',
  },
]

const Threads = ({navigation}) => {
  return (
    <ScrollView
        style={{backgroundColor:'#DEEAE5'}}
        showsVerticalScrollIndicator={false}
    >
      <View style={styles.topContainer}>
        <UserCard />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.sectionTitle}>Category</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) =>
            <View style={styles.categoryContainer}>
              <Text>{item.title}</Text>
            </View>
          }
          nestedScrollEnabled={true}
          horizontal={true}
          style={{
            // flex:1, 
            overflow: 'hidden',
            // marginBottom:16,
            paddingLeft: 16,
            paddingRight: 16,
            marginRight: 8
          }}
        />
        <Text style={styles.sectionTitle}>Featured Threads</Text>
        <FlatList
          data={threadsData}
          renderItem={({ item }) =>
          <TouchableOpacity
          onPress={() => {
            navigation.navigate("ThreadDetail", {id: item.id})
          }}
          >
            <ThreadHome item={item} />
          </TouchableOpacity>
          }
          style={{
            // flex:1, 
            overflow: 'hidden',
            marginBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          nestedScrollEnabled={true}
        />
      </View>
    </ScrollView>
  )
}

export default Threads

const styles = StyleSheet.create({
  topContainer: {
    height: 80,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  bottomContainer: {
    // top: 420,
    // height: 100,
    marginTop: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 8
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    paddingLeft: 16
    // fontWeight:600
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: '#898989',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 99,
    marginRight: 8
  }
})