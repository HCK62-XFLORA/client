import React, { useContext } from "react";
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
import VoucherCard from "../components/VoucherCard";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { UserContext } from "../stores/UserContext";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";

const BASE_URL = `https://wadinodev.com`;

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const { setUser } = useContext(UserContext);

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: BASE_URL + "/users/login",
        data: { email, password },
      });
      await SecureStore.setItemAsync("access_token", data.access_token);
      await SecureStore.setItemAsync("UserId", data.id.toString());

      Toast.show({
        type: "success",
        position: "top",
        text1: "Login Successfully!",
        text2: "Happy Planting!",
        visibilityTime: 1000,
        autoHide: true,
        onShow: () => {},
        onHide: () => {
          setUser({ access_token: data.access_token, UserId: data.id });
        },
      });

    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ops, Something when wrong!",
        text2: `${error}`,
        visibilityTime: 3000,
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
        {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LottieView
            source={require("../../assets/animation/welcome_animation.json")}
            autoPlay
            loop
          />
        </View> */}
        <Text style={styles.header}>Welcome back!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            activeOutlineColor="#898989"
            mode="outlined"
            label="Email"
            placeholder="Please Input your email"
            value={email}
            // error={true}
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
        <TouchableOpacity
          style={styles.showPassword}
          onPress={() => {
            console.log("forgot password?");
          }}>
          <Text> Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(email, password)}>
            <Text style={styles.buttonText}>Let's go!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <Text> Do not have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#06674b" }}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 21,
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
    // borderRadius: 30,
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
});
