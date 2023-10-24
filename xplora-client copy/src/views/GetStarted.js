import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  useFonts,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

const GetStarted = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({
    Karla_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/Illustration/GetStarted.png")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            fermentum odio id. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nulla fermentum odio id .
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deeae5",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 290,
    height: 270
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fead00",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Karla_500Medium",
    fontFamily: "Karla_500Medium",
    color: "#000000",
    fontSize: 16,
  },
  textContainer: {
    paddingVertical: 45,
    marginHorizontal: 80,
  },
  text: {
    fontSize: 12,
    fontWeight: '300'
  },
});
