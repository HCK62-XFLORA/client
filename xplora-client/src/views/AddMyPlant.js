// import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../stores/UserContext";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get('screen')

const BASE_URL = `https://wadinodev.com`;

const AddMyPlant = ({ navigation }) => {
  const [plantName, setPlantName] = useState("");
  const [PlantId, setPlantId] = useState();
  console.log("🚀 ~ file: AddMyPlant.js:22 ~ AddMyPlant ~ PlantId:", PlantId);
  const [description, onChangDescription] = useState("");
  const [image, setImage] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const { user, fetchUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      let localUri = result.uri;
      if (localUri) {
        let filename = localUri.split("/").pop();
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        setImage({ uri: result.uri, name: filename, type });
      }
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
    // No permissions request is necessary for launching the image library
  };

  const fetchPlants = async () => {
    try {
      const { data } = await axios({
        url: "https://wadinodev.com/users/plants",
        method: "GET",
        headers: { access_token: user.access_token },
      });
      setPlantData(data);
      return data;
    } catch (error) {
      console.log("AddMyPlant.js:63 ~ error:", error);
    }
  };

  const postMyPlant = async () => {
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

      if (!PlantId) {
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
      formData.append("PlantId", PlantId);
      formData.append("image", image);

      setLoading(true)
      const { data } = await axios({
        method: "POST",
        url: BASE_URL + "/users/my-plant",
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
        text1: "Plant added!",
        visibilityTime: 1000,
        autoHide: true,
        onShow: () => { },
        onHide: () => {
          navigation.navigate("Profile");
        },
      });
    } catch (error) {
      console.log("ERROR Add my plant", error)
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ops, Something when wrong!",
        text2: `${error}`,
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false)
    }
  };

  const handlePlantChange = (selectedItem) => {
    setSelectedPlant(selectedItem);
  };

  useEffect(() => {
    fetchPlants();
  }, []);
  return (
    <>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.mainContainer}>
          <Text style={styles.header}>Add Plant</Text>
          <Text style={styles.label}>Plant name</Text>
          <View style={styles.selectContainer}>
            <SelectDropdown
              data={plantData}
              onSelect={(selectedItem, index) => {
                // setPlantName(selectedItem.name);
                setPlantId(selectedItem.id);
                onChangDescription(selectedItem.description);
              }}
              defaultButtonText={"Select Plant"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
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
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={"Search here"}
              searchPlaceHolderColor={"darkgrey"}
              renderSearchInputLeftIcon={() => {
                return <FontAwesome name={"search"} color={"#444"} size={18} />;
              }}
            />
          </View>
          <Text style={styles.label}>Description</Text>
          <View style={styles.inputContainer}>
            <TextInput
              editable={false}
              scrollEnabled={true}
              multiline
              numberOfLines={8}
              cursorColor={'#06674b'}
              style={styles.descriptionInput}
              // onChangeText={onChangDescription}
              value={description}
              placeholder={description}
              placeholderTextColor="#aaa"
            />
          </View>

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
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  postMyPlant();
                }}>
                <Text style={styles.buttonText}>Add Plant</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView >
    </>
  );
};

export default AddMyPlant;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 6,
  },
  inputContainer: {
    paddingVertical: 10,
    gap: 6,
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
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
  },
  dropdown1BtnTxtStyle: {
    fontFamily: "Karla_500Medium",
    fontSize: 14,
    textAlign: "left",
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    fontFamily: "Karla_500Medium",
    fontSize: 14,
    textAlign: "left",
  },
  dropdown1SelectedRowStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
  dropdown1searchInputStyleStyle: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#898989",
  },
});
