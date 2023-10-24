import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import NavBottomActive from "../components/NavBottom/NavBottom-active";
import UserCard from "../components/UserCard";
import Slider from "../components/Promo/Slider";
import MyPlantHome from "../components/MyPlant/MyPlantHome";
import ThreadHome from "../components/Thread/ThreadHome";
// import {Karla_600SemiBold} from '@expo-google-fonts/karla'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { UserContext } from "../stores/UserContext";

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

const threadsData = [
  {
    image: require("../../assets/MyPlantCard/card1.png"),
    title: "My Plant 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
    category: "Disease",
  },
  {
    image: require("../../assets/MyPlantCard/card2.png"),
    title: "My Plant 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
    category: "Story",
  },
  {
    image: require("../../assets/MyPlantCard/card3.png"),
    title: "My Plant 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
    category: "Tips & Trick",
  },
  {
    image: require("../../assets/MyPlantCard/card2.png"),
    title: "My Plant 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
    category: "Story",
  },
];

const Homescreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [plants, setPlants] = useState([]);


  const { user, userProfile, setUser } = useContext(UserContext);

  console.log(userProfile, '<<<userHome Screen');

  const fetchThreads = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/threads?nthThreads=1",
        method: "GET",
        headers: { access_token: user.access_token }
      });
      setThreads(data);
      return data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  const fetchPlants = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/users/my-plant",
        method: "GET",
        headers: { access_token: user.access_token }
      });
      setPlants(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      const id = await SecureStore.getItemAsync("UserId");
      console.log(access_token, id, '[[[[[[[inilohhhhhhh');
      // console.log(
      //   "🚀 ~ file: App.js:37 ~ getUser ~ access_token, id:",
      //   access_token,
      //   id
      // );
      // setUser({ access_token, id });
      return {
        access_token,
        id
      }
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

  // useEffect(() => {
  //   // getUser()
  //   //   .then(({ access_token }) => {
  //   //     return fetchPlants(access_token)
  //   //   })
  //   //   .then(() => {
  //   //     return fetchThreads()
  //   //   })
  //   //   .finally(() => {
  //   //     setLoading(false)
  //   //   })
  //   //   .catch((err) => console.log(err, "here"))
  //   fetchPlants()
  //     .then(() => {
  //       fetchThreads()
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })

  // }, []);

  useEffect(() => {
    fetchThreads()
  }, [])

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


  return (
    <>
      {isLoading ? <Text> Loading </Text> :
        <ScrollView
          style={{
            flex: 1,
            gap: 16,
            backgroundColor: "#DEEAE5",
          }}
          showsVerticalScrollIndicator={false}>
          <Button
            onPress={() => {
              handleLogout();
            }}
            title="logout"
            color="tomato"
            accessibilityLabel="Submit button"
          />
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
              <Slider />
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
              renderItem={({ item }) => <ThreadHome item={item} />}
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
  );
};

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
