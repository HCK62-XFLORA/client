import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "./src/views/GetStarted";
import Login from "./src/views/Login";
import Register from "./src/views/Register";
import AddMyPlant from "./src/views/AddMyPlant";
import AddThreads from "./src/views/AddThreads";
import TabNavigator from "./src/navigators/Tabnavigator";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";
import MyPlantDetail from "./src/views/MyPlantDetail";

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
          <Stack.Screen name="GetStarted" component={GetStarted} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="AddThreads" component={AddThreads} />
          <Stack.Screen name="AddMyPlant" component={AddMyPlant} />
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
