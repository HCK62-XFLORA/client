import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ThirdButton from "../components/Buttons/ThirdButton";
import LikeButton from "../components/Buttons/LikeButton";
import DislikeButton from "../components/Buttons/DislikeButton";
import CommentCard from "../components/Comments/CommentCard";
import axios from "axios";
import { UserContext } from "../stores/UserContext";
// import { TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

const ThreadDetail = () => {
  const route = useRoute();
  const id = route.params.id;
  const [thread, setThread] = useState({});
  // console.log(id, '<<<<thread');
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [comments, setComments] = useState(thread.Comments);

  // https://wadinodev.com/threads/5
  const fetchThreadById = async () => {
    try {
      const { data } = await axios({
        url: `https://wadinodev.com/threads/${id}`,
        method: "GET",
        headers: { access_token: user.access_token },
      });
      setThread(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async () => {
    if (text) {
      try {
        const response = await axios({
          url: `https://wadinodev.com/threads/comments/${id}`,
          method: "POST",
          headers: { access_token: user.access_token },
          data: { comment: text },
        });
        const newComment = response.data;
        setComments([...comments, newComment]);
        setText("");
        fetchThreadById();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchThreadById();
  }, []);

  useEffect(() => {
    const fetchLatestComments = async () => {
      try {
        const { data } = await axios({
          url: `https://wadinodev.com/threads/comments/${id}`,
          method: "GET",
          headers: { access_token: user.access_token },
        });

        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchLatestComments, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleReaction = async (reaction) => {
    try {
      // console.log(reaction, '<<<reaction');
      console.log(id, "<<<id");
      const { data } = await axios({
        url: `https://wadinodev.com/threads/reaction/${id}`,
        method: "POST",
        body: reaction,
        headers: { access_token: user.access_token },
      });
      console.log(data, "<<<respon");
    } catch (error) {
      console.error(error);
    }
  };

  // const forumData =
  // {
  //     id: 1,
  //     image: require('../../assets/MyPlantCard/card1.png'),
  //     text: 'My Plant 1',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue. Vivamus dapibus sed quam a fermentum. Nulla sit amet est in quam congue tempus. Praesent feugiat suscipit purus, non interdum quam venenatis nec. Vestibulum non massa eget ex interdum fermentum. Nullam vehicula arcu sed mi iaculis, vel cursus eros sollicitudin. Aliquam nec justo vel nisl posuere vehicula. Cras vestibulum a nunc ac euismod. Fusce tincidunt libero in erat dapibus, vel tincidunt purus eleifend.'
  // }

  // const comments = [
  //     {
  //         id: 1,
  //         comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
  //     },
  //     {
  //         id: 2,
  //         comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
  //     },
  //     {
  //         id: 3,
  //         comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
  //     },
  //     {
  //         id: 4,
  //         comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia neque ac dolor vulputate, non feugiat elit rhoncus. Sed fermentum nulla auctor, euismod nulla non, vehicula augue',
  //     },
  // ]

  // console.log(thread, '<<<thread');

  // const [text, setText] = React.useState("");

  // const [password, setPassword] = React.useState("");

  // const [showPassword, setShowPassword] = React.useState(false);

  // let [fontsLoaded, fontError] = useFonts({
  //     Karla_500Medium, Karla_400Regular
  // });

  // if (!fontsLoaded && !fontError) {
  //     return null;
  // }

  // console.log(id, '<<<<');
  // console.log(thread.Comments)

  return (
    <>
      <View style={styles.mainContainer}>
        <FlatList
          data={thread.Comments}
          renderItem={({ item }) => <CommentCard item={item} />}
          style={{
            // flex:1,
            overflow: "hidden",
            marginBottom: 16,
            // paddingLeft: 16,
            paddingRight: 16,
            height,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{thread.title}</Text>
              <Text style={styles.contributor}>John Doe</Text>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.plantImage}
                  source={{ uri: `${thread.imgUrl}` }}
                  // source={require('../../assets/MyPlantCard/card1.png')}
                  resizeMethod="contain"
                />
              </View>
              <Text style={styles.paragraph}>{thread.content}</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  marginBottom: 16,
                  gap: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleReaction(true);
                  }}>
                  <LikeButton />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleReaction(false);
                  }}>
                  <DislikeButton />
                </TouchableOpacity>
              </View>
              <Text style={styles.commentTitle}>Comments</Text>
            </View>
          }
        />
      </View>
      <View
        style={{
          // marginBottom: 24,
          // width,
          // borderWidth: 1,
          marginTop: -30,
          backgroundColor: "white",
          // height:86,
          paddingTop: 14,
          paddingBottom: 34,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.12,
          shadowRadius: 6.22,
          elevation: 3,
          flexDirection: "row",
          justifyContent: "center",
          // alignContent: 'center',
          alignItems: "center",
          gap: 8,
        }}>
        <TextInput
          style={styles.input}
          activeOutlineColor="#898989"
          mode="outlined"
          label="comment"
          placeholder="Write your comment here"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity onPress={handleCommentSubmit}>
          <Image
            style={{
              width: 32,
              height: 32,
            }}
            source={require("../../assets/button/sent.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ThreadDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    height,
    // gap: 8
  },
  title: {
    color: "#000",
    // color: "#898989",
    fontSize: 20,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    marginBottom: 8,
  },
  contributor: {
    // color: "#000",
    color: "#898989",
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    marginBottom: 16,
  },
  imageContainer: {
    // justifyContent:'center',
    alignSelf: "center",
    // alignContent: 'center'
    // marginTop: 8
  },
  plantImage: {
    width: width * 0.87,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  paragraph: {
    color: "#000",
    // color: "#898989",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    // fontFamily: "Karla_400Regular",
    fontFamily: "Karla_500Medium",
  },
  buttonImage: {
    height: 26,
    width: 26,
  },
  buttonText: {
    color: "#06674B",
    fontFamily: "Karla_500Medium",
  },
  commentTitle: {
    fontSize: 18,
    fontFamily: "Karla_500Medium",
  },
  input: {
    // flex: 1,a
    borderRadius: 10,
    // height: 45,
    // borderWidth: 1,
    width: width * 0.8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    // justifyContent: 'center',
    // alignContent:'center',
    // alignItems:'center',
    alignSelf: "center",
    backgroundColor: "#EEF3EC",
  },
});
