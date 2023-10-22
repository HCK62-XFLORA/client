import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/views/Login";
import TabNavigator from "./src/navigators/Tabnavigator";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView>
    <NavigationContainer >
        <Stack.Navigator
          // screenOptions={{
          //   headerShown: false
          // }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
