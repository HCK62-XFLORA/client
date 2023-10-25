// import { TextInput } from "react-native-paper";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../stores/UserContext";

const AddMyPlant = () => {
  const [plantName, setPlantName] = React.useState("");
  console.log("🚀 ~ file: AddMyPlant.js:21 ~ AddMyPlant ~ plantName:", plantName)
  const [description, onChangDescription] = React.useState("");
  const [plantData, setPlantData] = useState(null);
  const { user } = useContext(UserContext);

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlants().then((data) => {
      setSelectedPlant(data[0]); // Set the default selected plant
    });
  }, []);

  const handlePlantChange = (selectedItem) => {
    setSelectedPlant(selectedItem);
  };

  // const countries = [
  //   "Kaktus",
  //   "Monstera",
  //   "Canabis",
  //   "English Lavender",
  //   "Opium",
  //   "Aglonema",
  // ];
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Add Plant</Text>
        <Text style={styles.label}>Plant name</Text>
        <View style={styles.selectContainer}>
          <SelectDropdown
            data={plantData}
            onSelect={(selectedItem, index) => {
              setPlantName(selectedItem.name)
              onChangDescription(selectedItem.description)
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
            editable
            multiline
            numberOfLines={8}
            style={styles.descriptionInput}
            // onChangeText={onChangDescription}
            value={description}
            placeholder={description}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonAddCover}
            onPress={() => {
              console.log("add image");
            }}>
            <View style={styles.buttonContent}>
              <Image
                style={styles.addIcon}
                source={require("../../assets/add-img.png")}
              />
              <Text style={styles.addCoverText}>Add Photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("post thread");
            }}>
            <Text style={styles.buttonText}>Add Plant</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  dropdown1BtnStyle: {
    flex: 1,
    // width: "80%",
    // height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: "#898989",
  },
  dropdown1BtnTxtStyle: {
    fontFamily: "Karla_500Medium",
    // color: "#898989",
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
    // color: "#898989",
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
