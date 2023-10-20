import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Login = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate("TabNavigator")}
        title="home"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
