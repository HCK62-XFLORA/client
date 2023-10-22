import * as React from "react";
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

const AddThread = () => {
  const [title, onChangTitle] = React.useState("");
  const [description, onChangDescription] = React.useState("");

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
            numberOfLines={4}
            style={styles.descriptionInput}
            onChangeText={onChangDescription}
            value={description}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonAddCover}
            onPress={() => {
              console.log("add image");
            }}>
            {/* <Image
              style={styles.addIcon}
              source={require("../../assets/add-image.png")}
            /> */}
            <Text style={styles.addCoverText}>Add Cover</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("post thread");
            }}>
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
    height: 132,
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
    height: 44,
    width: 177,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#06674b",
    padding: 10,
    borderRadius: 10,
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
