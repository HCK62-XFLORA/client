import React from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Toast from "react-native-toast-message";

const BASE_URL = `https://wadinodev.com`;

const Register = ({ navigation }) => {
  const [username, setUsername] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const [gender, setGender] = React.useState("");

  const genderOption = ["Male", "Female"];

  const handleRegister = async (username, email, password, gender) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: BASE_URL + "/users/register",
        data: { username, email, password, gender },
      });
      Toast.show({
        type: "success",
        position: "top",
        text1: "Register Success!",
        text2: "Welcome for greener earth!",
        visibilityTime: 1000,
        autoHide: true,
        onShow: () => {},
        onHide: () => {
          navigation.navigate("Login");
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

  let [fontsLoaded, fontError] = useFonts({
    Karla_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <>
      <View style={styles.mainContainer}>
        {/* <Image source={require("../../assets/logo.png")} style={styles.image} /> */}
        <Text style={styles.header}>Create Account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#898989"
            mode="outlined"
            label="username"
            placeholder="Please Input your username"
            value={username}
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#898989"
            mode="outlined"
            label="Email"
            placeholder="Please Input your email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#898989"
            mode="outlined"
            label="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                color="#aaa"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <SelectDropdown
            data={genderOption}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
            }}
            defaultButtonText={"Select gender"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRegister(username, email, password, gender)}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text> Do not have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#06674b" }}> Login</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 21,
    // color: theme.colors.primary,
    fontWeight: "bold",
    paddingVertical: 12,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  showPassword: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: -10,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
  },
  buttonSubmit: {
    alignItems: "center",
    fontFamily: "Karla_500Medium",
    marginVertical: 20,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
    borderRadius: 30,
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
  buttonText: {
    fontFamily: "Karla_500Medium",
    fontFamily: "Karla_500Medium",
    color: "#fff",
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown1BtnStyle: {
    flex: 1,
    // width: '80%',
    // height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#898989",
  },
  dropdown1BtnTxtStyle: {
    fontFamily: "Karla_500Medium",
    color: "#898989",
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
    color: "#898989",
    fontSize: 14,
    textAlign: "left",
  },
});
