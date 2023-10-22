import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useFonts, Karla_500Medium, Karla_600SemiBold, Karla_700Bold } from "@expo-google-fonts/karla";

const Login = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({
    Karla_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <>
      <Button
        onPress={() => navigation.navigate("TabNavigator")}
        title="home"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
