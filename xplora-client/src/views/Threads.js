
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Image, Dimensions, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import ThreadHome from '../components/Thread/ThreadHome'
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from "../stores/UserContext";

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

        <Text style={styles.sectionTitle}>Featured Threads</Text>
        <TouchableOpacity
          style={{
            // flex:1,
            // marginTop: 12,
            marginHorizontal: 20,
            // marginBottom: 16,
            // paddingLeft: 16,
            // paddingRight: 16,
            padding: 8,
            borderWidth: 1,
            borderRadius: 10,
            // alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderColor: '#06674B',
            gap: 8
          }}

          onPress={() => navigation.navigate("AddThreads")}>

          <AntDesign name="plus" size={16} color="#06674B" />
          <Text
            style={{
              fontFamily: 'Karla_500Medium',
              color: '#06674B'
            }}
          >
            Add Thread
          </Text>
        </TouchableOpacity>

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
    gap: 16,
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
