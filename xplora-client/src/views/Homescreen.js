import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  RefreshControl,
  Animated,
} from "react-native";
import NavBottomActive from "../components/NavBottom/NavBottom-active";
import UserCard from "../components/UserCard";
import Slider from "../components/Promo/Slider";
import MyPlantHome from "../components/MyPlant/MyPlantHome";
import ThreadHome from "../components/Thread/ThreadHome";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../stores/UserContext";
import BannerCard from "../components/Promo/BannerCard";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import Pagination from "../components/Promo/Pagination";
import PromoDetail from "./PromoDetail";
import { ActivityIndicator } from "react-native-paper";

// const myPlantData = [
//   {
//     image: require("../../assets/MyPlantCard/card1.png"),
//     text: "My Plant 1",
//   },
//   {
//     image: require("../../assets/MyPlantCard/card2.png"),
//     text: "My Plant 2",
//   },
//   {
//     image: require("../../assets/MyPlantCard/card3.png"),
//     text: "My Plant 3",
//   },
//   {
//     image: require("../../assets/MyPlantCard/card2.png"),
//     text: "My Plant 2",
//   },
// ];

// const threadsData = [
//   {
//     image: require("../../assets/MyPlantCard/card1.png"),
//     title: "My Plant 1",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
//     category: "Disease",
//   },
//   {
//     image: require("../../assets/MyPlantCard/card2.png"),
//     title: "My Plant 2",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
//     category: "Story",
//   },
//   {
//     image: require("../../assets/MyPlantCard/card3.png"),
//     title: "My Plant 3",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
//     category: "Tips & Trick",
//   },
//   {
//     image: require("../../assets/MyPlantCard/card2.png"),
//     title: "My Plant 2",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
//     category: "Story",
//   },
// ];

const Homescreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [isLoading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [plants, setPlants] = useState([]);
  const [index, setIndex] = useState(0)
  const [rewards, setRewards] = useState([])
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedPromoCard, setSelectedPromoCard] = useState(null);

  const { user, userProfile, setUser } = useContext(UserContext);

  // console.log(userProfile, '<<<userHome Screen');

  const scrollX = useRef(new Animated.Value(0)).current

  const handleOnViewableItems = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index)
  }).current

  const snapPoints = [1, "55", "90"]

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            }
          }
        }
      ],
      {
        useNativeDriver: false
      }
    )(event)
  }

  const fetchRewards = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/users/reward",
        method: "GET",
        headers: { access_token: user.access_token }
      });
      setRewards(data);
      // return data
    } catch (error) {
      console.log(error);
    }
  }

  const fetchThreads = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/threads?nthThreads=1",
        method: "GET",
        headers: { access_token: user.access_token },
      });
      setThreads(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const promoData = [
    {
      image: require('../../assets/PromoCard/promoCard-1.png'),
      text: 'Add your work experience and skills to show your strengths to recruiters.'
    },
    {
      image: require('../../assets/PromoCard/promoCard-1.png'),
      text: 'Add your work experience and skills to show your strengths to recruiters.'
    },

  ]
  const fetchPlants = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/users/my-plant",
        method: "GET",
        headers: { access_token: user.access_token },
      });
      setPlants(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      const id = await SecureStore.getItemAsync("UserId");
      return {
        access_token,
        id,
      };
    } catch (error) {
      console.log("🚀 ~ file: App.js:37 ~ getUser ~ error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const access_token = await SecureStore.deleteItemAsync("access_token");
      const deleteId = await SecureStore.deleteItemAsync("id");
      const id = await SecureStore.deleteItemAsync("UserId");
      setUser(null);
    } catch (error) {
      console.log("🚀 ~ file: App.js:37 ~ getUser ~ error:", error);
    }
  };

  useEffect(() => {
    fetchThreads()
  }, [])

  useEffect(() => {
    fetchRewards()
  }, [])

  // console.log(rewards, '<<<home reward');

  // useEffect(() => {
  //   fetchPlants();
  // }, []);



  // useEffect(() => {
  //   getUser();
  // }, []);

  // console.log(threads, '<<<<');
  // console.log(user, '<<<<');
  // console.log(plants[0].Plant.name, '<<<<');
  // console.log(plants, '<<<<honeee');

  // console.log(threads, '<<<<<< homeeeee');
  return (
    <>
      {isLoading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View> :
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            flex: 1,
            gap: 16,
            backgroundColor: "#DEEAE5",
          }}
          showsVerticalScrollIndicator={false}>
          {/* <Button
            onPress={() => {
              handleLogout();
            }}
            title="logout"
            color="tomato"
            accessibilityLabel="Submit button"
          /> */}
          {/* <FlatList
        data={myPlantData}
        renderItem={({ item }) =>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyPlantDetail", { id: item.id })
            }}>
            <MyPlantHome item={item} />
          </TouchableOpacity>
        }
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          // flex:1, 
          overflow: 'hidden',
          marginBottom: 16,
          paddingLeft: 16,
          paddingRight: 16
        }}
      /> */}
          {/* top container  */}
          <View style={homeStyles.topContainer}>
            <UserCard />
            <View style={homeStyles.heroContainer}>
              {/* <Slider /> */}
              <View >
                <FlatList
                  data={rewards}
                  renderItem={({ item }) =>
                    <TouchableOpacity
                      onPress={
                        () => { navigation.navigate('PromoDetail', { id: item.id }) }
                      }
                    >
                      <BannerCard item={item}
                      />
                    </TouchableOpacity>
                  }
                  horizontal={true}
                  snapToAlignment="center"
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1, }}
                  onScroll={handleOnScroll}
                  onViewableItemsChanged={handleOnViewableItems}
                />
                <Pagination data={rewards} scrollX={scrollX} index={index} />
              </View>
            </View>
            <View style={homeStyles.myPlantSectionContainer}>
              <Text style={homeStyles.sectionTitle}>My Plant</Text>
              <FlatList
                data={userProfile?.MyPlants}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("MyPlantDetail", { id: item.id });
                    }}>
                    <MyPlantHome item={item} />
                  </TouchableOpacity>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  // flex:1,
                  overflow: "hidden",
                  marginBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              />
            </View>
          </View>
          {/* bottom container  */}
          <View style={homeStyles.bottomContainer}>
            <Text style={homeStyles.sectionTitle}>Featured Threads</Text>
            <FlatList
              // data={threads}
              data={threads}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ThreadDetail", { id: item.id })
                  }}
                >
                  <ThreadHome item={item} />
                </TouchableOpacity>
              }
              style={{
                // flex:1,
                overflow: "hidden",
                marginBottom: 16,
                paddingLeft: 16,
                paddingRight: 8,
              }}
              nestedScrollEnabled={true}
            />
          </View>
        </ScrollView>
      }
    </>
  )
}

export default Homescreen;

const homeStyles = StyleSheet.create({
  topContainer: {
    height: 420,
    // backgroundColor: '#F7F9F6',
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  heroContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    // marginBottom: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  myPlantSectionContainer: {
    // marginLeft: 16,
    // paddingLeft:16,
    // marginRight: 16,
    gap: 8,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    paddingLeft: 16,
    // fontWeight:600
  },
  bottomContainer: {
    // top: 420,
    // height: 100,
    marginTop: 16,
    paddingTop: 16,
    // backgroundColor: '#F7F9F6',
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 8,
  },
});
