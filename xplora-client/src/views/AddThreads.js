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
  ScrollView,
  Dimensions
} from "react-native";
import ThirdButton from "../components/Buttons/ThirdButton";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { UserContext } from "../stores/UserContext";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

const BASE_URL = `https://wadinodev.com`;
const { width, height } = Dimensions.get('screen')

const AddThread = ({ navigation }) => {
  const [title, onChangTitle] = React.useState("");
  const [description, onChangDescription] = React.useState("");
  const [image, setImage] = React.useState();
  const [isLoading, setLoading] = useState(false);
  const [ForumId, setForumId] = React.useState();

  const category = [
    { id: 1, name: "Tips & Trick" },
    { id: 2, name: "Disease" },
    { id: 3, name: "Stories" },
  ];

  // const route = useRoute();
  // const id = route.params.id
  const { user, fetchUser } = useContext(UserContext);

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

      setImage({ uri: result.uri, name: filename, type });
    } catch (error) {
      console.log(error, "<<<pickimage");
    }
    // No permissions request is necessary for launching the image library
  };

  const postThreads = async () => {
    try {
      if (!image) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Please Choose Image",
          visibilityTime: 3000,
          autoHide: true,
        });
        return
      }

      if (!title) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Please Choose Plant",
          visibilityTime: 3000,
          autoHide: true,
        });
        return
      }
      if (!description) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Please Choose Plant",
          visibilityTime: 3000,
          autoHide: true,
        });
        return
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", description);
      formData.append("image", image);
      formData.append("ForumId", ForumId);

      const { data } = await axios({
        method: "POST",
        url: BASE_URL + "/threads",
        data: formData,
        headers: {
          access_token: user.access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchUser();
      Toast.show({
        type: "success",
        position: "top",
        text1: "Thread added!",
        visibilityTime: 1000,
        autoHide: true,
        onShow: () => { },
        onHide: () => {
          navigation.navigate("Profile");
        },
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ops, Something when wrong!",
        text2: `${error}`,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <>
      <ScrollView style={{
        backgroundColor: 'white'
      }} >
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
          <View style={styles.inputContainer}></View>
          <Text style={styles.label}>Category</Text>
          <View style={styles.dropdownContainer}>
            <SelectDropdown
              // style={{ backgroundColor: 'white' }}
              data={category}
              onSelect={(selectedItem) => {
                setForumId(selectedItem.id);
              }}
              defaultButtonText={"Select Category"}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item) => {
                return item.name;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
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
          </View >
          <View style={{ alignItems: 'center' }}>
            {image ? (<Image source={{ uri: image.uri }} style={{ width: width * 0.8, height: height * 0.3 }} resizeMode="contain" />) : null}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAddCover} onPress={pickImage}>
              <View style={styles.buttonContent}>
                <Image
                  style={styles.addIcon}
                  source={require("../../assets/add-img.png")}
                />
                <Text style={styles.addCoverText}>{image ? 'Change Photo' : 'Add Photo'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {isLoading ? (<ActivityIndicator />) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => postThreads()}>
                <Text style={styles.buttonText}>Post Thread</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>
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
    backgroundColor: 'white'
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  titleInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  descriptionInput: {
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
  dropdown1BtnStyle: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  dropdown1BtnTxtStyle: {
    fontFamily: "Karla_500Medium",
    color: "#000",
    fontSize: 14,
    textAlign: "left",
  },
  dropdown1DropdownStyle: { backgroundColor: "white" },
  dropdown1RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    fontFamily: "Karla_500Medium",
    color: "#000",
    fontSize: 14,
    textAlign: "left",
  },
});
