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
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import MyPlantDetail from "./src/views/MyPlantDetail";
import ForumDetail from "./src/views/ThreadDetail";
import ThreadDetail from "./src/views/ThreadDetail";
import ImagePickerExample from "./src/components/Photos/ImagePicker";
import { UserContext } from "./src/stores/UserContext";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AskAi from "./src/views/AskAi";
import MyVoucher from "./src/views/MyVoucher";
import axios from "axios";


const Stack = createNativeStackNavigator();

export default function App() {
  // token secure store get
  // global state -> bikin global state pake use context
  // context isSignedIn

  // const user = React.useContext(UserContext);
  const [user, setUser] = useState(null);
  // statee userData badge, level , point
  const [userProfile, setUserProfile] = useState(null)

  const getUser = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      const id = await SecureStore.getItemAsync("UserId");
      console.log(
        "🚀 ~ file: App.js:37 ~ getUser ~ access_token, id:",
        id, access_token
      );
      setUser({ access_token, id });
    } catch (error) {
      console.log("🚀 ~ file: App.js:37 ~ getUser ~ error:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios({
        url: `https://wadinodev.com/users/profile/${user.id}`,
        method: "GET",
        headers: { access_token: user.access_token }
      });
      setUserProfile(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userProfile, '<<<<appp');
  console.log(user, '<<<appp');


  useEffect(() => {
    getUser()
  }, []);

  useEffect(() => {
    if (user) { fetchUser() }
  }, [user])
  /**
   * berarti perlu ngefetch ke  buat isi   // statee userData badge, level , point
     jika sudah login
     useEffect(() => { if (user.accesstoken) { fetchBuat data badhe dll }}, [user])
   */

  return (
    // <SafeAreaView>
    <UserContext.Provider value={{ user, setUser, userProfile }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <>
              <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              {/* <Stack.Screen name="ImagePicker" component={ImagePickerExample} /> */}
              <Stack.Screen name="AddThreads" component={AddThreads} />
              <Stack.Screen name="AskAi" component={AskAi} />
              <Stack.Screen name="ThreadDetail" component={ThreadDetail} />
              <Stack.Screen name="AddMyPlant" component={AddMyPlant} />
              <Stack.Screen name="MyPlantDetail" component={MyPlantDetail} />
              <Stack.Screen name="MyVoucher" component={MyVoucher} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
    //  </SafeAreaView>
    // <NavigationContainer>
    //   <Stack.Navigator
    //   // screenOptions={{
    //   //   headerShown: false
    //   // }}
    //   >
    //     <Stack.Screen
    //       name="GetStarted"
    //       component={GetStarted}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={Register} />
    //     {/* <Stack.Screen name="ImagePicker" component={ImagePickerExample} /> */}
    //     <Stack.Screen name="AddThreads" component={AddThreads} />
    //     <Stack.Screen name="ThreadDetail" component={ThreadDetail} />
    //     <Stack.Screen name="AddMyPlant" component={AddMyPlant} />
    //     <Stack.Screen name="MyPlantDetail" component={MyPlantDetail} />
    //     <Stack.Screen name="TabNavigator" component={TabNavigator} />
    //     <Stack.Screen name="AskAi" component={AskAi} />
    //     <Stack.Screen name="MyVoucher" component={MyVoucher} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // // </SafeAreaView>
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
