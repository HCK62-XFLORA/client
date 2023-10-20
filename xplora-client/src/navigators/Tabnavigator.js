import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Homescreen from "../views/Homescreen";
import Threads from "../views/Threads";
import MyPlan from "../views/MyPlan";
import Profile from "../views/Profile";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Threads"
        component={Threads}
        options={{
          tabBarLabel: "Threads",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPlan"
        component={MyPlan}
        options={{
          tabBarLabel: "MyPlan",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pine-tree" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
