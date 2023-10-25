// import { TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import ThirdButton from "../components/Buttons/ThirdButton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { UserContext } from "../stores/UserContext";

const BASE_URL = `https://wadinodev.com`;

const AddThread = () => {
  const [title, onChangTitle] = React.useState("");
  const [description, onChangDescription] = React.useState("");
  const [image, setImage] = React.useState();

  const route = useRoute();
  // const id = route.params.id
  const { user } = useContext(UserContext);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      // console.log(result.uri);
      formData.append("image", image);

      setImage(formData);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error, "<<<predicr");
    }
    // No permissions request is necessary for launching the image library
  };

  const postThreads = async (title, content, image) => {
    try {
      console.log("🚀 ~ file: AddThreads.js:63 ~ postThreads ~ image:", image)
      const { data } = await axios({
        method: "POST",
        url: BASE_URL + "/threads",
        data: { title, content, image },
        headers: {
          access_token: user.access_token,
        },
      });
      navigation.navigate("Threads");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Text>title: {title}</Text>
      <Text>description: {description}</Text> */}
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Add Thread</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Thread title</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={onChangTitle}
            value={title}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            editable
            multiline
            numberOfLines={8}
            style={styles.descriptionInput}
            onChangeText={onChangDescription}
            value={description}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAddCover} onPress={pickImage}>
            <View style={styles.buttonContent}>
              <Image
                style={styles.addIcon}
                source={require("../../assets/add-img.png")}
              />
              <Text style={styles.addCoverText}>Add Cover</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => postThreads(title, description, image)}>
            <Text style={styles.buttonText}>Post Thread</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddThread;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },

  inputContainer: {
    paddingVertical: 10,
    gap: 6,
  },
  titleInput: {
    height: 40,
    // margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  descriptionInput: {
    // height: 132,
    // margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  header: {
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  label: {
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  button: {
    height: 44,
    width: 277,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06674b",
    padding: 10,
    borderRadius: 10,
  },
  buttonAddCover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#06674b",
    padding: 10,
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    gap: 8,
  },
  buttonText: {
    fontFamily: "Karla_500Medium",
    fontFamily: "Karla_500Medium",
    color: "#fff",
    fontSize: 14,
  },
  addCoverText: {
    fontFamily: "Karla_500Medium",
    fontFamily: "Karla_500Medium",
    color: "#055e44",
    fontSize: 14,
  },
  addIcon: {
    height: 20,
    width: 20,
  },
});
