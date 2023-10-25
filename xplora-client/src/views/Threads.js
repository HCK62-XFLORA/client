import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import UserCard from "../components/UserCard";
import ThreadHome from "../components/Thread/ThreadHome";
import axios from "axios";
import { UserContext } from "../stores/UserContext";

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
  {
    image: require("../../assets/MyPlantCard/card2.png"),
    title: "My Plant 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
    category: "Story",
  },
  {
    image: require("../../assets/MyPlantCard/card2.png"),
    title: "My Plant 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum odio id ",
    category: "Story",
  },
];

const categories = [
  {
    id: "",
    title: "All",
  },
  {
    id: 1,
    title: "Tips & Trick",
  },
  {
    id: 2,
    title: "Disease",
  },
  {
    id: 3,
    title: "Stories",
  },
];

const { width, height } = Dimensions.get("screen");

const Threads = ({ navigation }) => {
  const [threads, setThreads] = useState();
  const [ForumId, setForumId] = useState("");
  console.log("🚀 ~ file: Threads.js:79 ~ Threads ~ ForumId:", ForumId);

  const { user, userProfile, setUser } = useContext(UserContext);

  const fetchThreads = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/threads?nthThreads=1&ForumId=" + ForumId,
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

  useEffect(() => {
    fetchThreads();
  }, [ForumId]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: "#DEEAE5",
      }}>
      <View style={styles.topContainer}>
        <UserCard />
        <TouchableOpacity
          style={{
            backgroundColor: "#DEEAE5",
            // margin: 16,
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
            // width: width * 0.9,
            height: 100,
            marginBottom: 16,
            marginLeft: 16,
            marginRight: 16,
          }}
          onPress={() => navigation.navigate("AskAi")}>
          <Image
            source={require("../../assets/Illustration/ai-illustration.png")}
            resizeMode="cover"
            style={styles.askAiImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.sectionTitle}>Category</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() => {
                setForumId(item.id);
              }}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          nestedScrollEnabled={true}
          horizontal={true}
          style={{
            // flex:1,
            overflow: "hidden",
            // marginBottom:16,
            paddingLeft: 16,
            paddingRight: 16,
            marginRight: 8,
          }}
        />
        <Button
          style={{
            // flex:1,
            marginHorizontal: 20,
            marginBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          textColor="#898989"
          icon="message-plus"
          mode="outlined"
          onPress={() => navigation.navigate("AddThreads")}>
          Add Thread
        </Button>
        <Text style={styles.sectionTitle}>Featured Threads</Text>
        <FlatList
          data={threads?.sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ThreadDetail", { id: item.id });
              }}>
              <ThreadHome item={item} />
            </TouchableOpacity>
          )}
          style={{
            // flex:1,
            overflow: "hidden",
            marginBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          nestedScrollEnabled={true}
        />
      </View>
    </ScrollView>
  );
};

export default Threads;

const styles = StyleSheet.create({
  topContainer: {
    // height: 80,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomContainer: {
    // top: 420,
    // height: 100,
    marginTop: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  categoryContainer: {
    borderWidth: 1,
    borderColor: "#898989",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 99,
    marginRight: 8,
  },
  askAiImage: {
    // alignSelf: 'center',
    width: width * 0.8,
    height: 70,
    margin: 8,
  },
});
