import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Homescreen from "../views/Homescreen";
import Threads from "../views/Threads";
import MyPlan from "../views/MyPlant";
import Profile from "../views/Profile";
import NavBottomActive from "../components/NavBottom/NavBottom-active";
import { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  const [activeTab, setActiveTab] = useState('Home')

  const handleTabPress = (route) => {
    setActiveTab(route);
  };

  const customTabStyle = {
    activeTabStyle: {
      backgroundColor: "transparent",
    },
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"

      // screenOptions={{
      //   tabBarStyle: { 
      //     // position: 'absolute'
      //     backgroundColor: "#fff",
      //       paddingBottom: 8,
      //       paddingTop: 8,
      //       height: 100,
      //       shadowColor: "#000",
      //       shadowOffset: {
      //         width: 0,
      //         height: -1,
      //       },
      //       shadowOpacity: 0.12,
      //       shadowRadius: 6.22,
      //       elevation: 3,
      //    },
      // }}
      // -----batas
      barStyle={{
        // backgroundColor: "#F7F9F6", 
        // activeBackgroundColor: 'transparent',

        backgroundColor: "#fff",
        // paddingBottom: 8,
        // paddingTop: 8,
        height: 85,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6.22,
        elevation: 3,
      }}

      screenOptions={{
        // inactiveTintColor: 'transparent'
        style:{
          activeBackgroundColor: 'transparent',
        }
      }}

      // tabBarOption={{
      //   // activeTintColor: 'transparent',
      //   // inactiveTintColor: 'transparent'
      // }}

      // batas

      // tabBarOptions={{
      //   // style: {
      //   //   backgroundColor: 'white',
      //   //   // paddingBottom: 8,
      //   //   // paddingTop: 8,
      //   //   // height: 200,
      //   //   shadowColor: "#000",
      //   //   shadowOffset: {
      //   //     width: 0,
      //   //     height: -1,
      //   //   },
      //   //   shadowOpacity: 0.12,
      //   //   shadowRadius: 6.22,
      //   //   elevation: 3,
      //   // },
      //   activeTintColor: 'transparent',
      //   inactiveTintColor: 'transparent', 
      //   style: {
      //     backgroundColor: 'white',
      //     // paddingBottom: 8,
      //     // paddingTop: 8,
      //     height: 200,
      //     shadowColor: "#000",
      //     shadowOffset: {
      //       width: 0,
      //       height: -1,
      //     },
      //     shadowOpacity: 0.12,
      //     shadowRadius: 6.22,
      //     elevation: 3,
      //   },
      //   labelStyle: {
      //     paddingBottom: 0,
      //     marginBottom: 0
      //   },
      // }}
      
    // screenOptions={{
    //   tabBarActiveTintColor: 'red', 
    //   tabBarActiveBackgroundColor: 'red'
    // }}
    // shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        listeners={{
          tabPress: () => handleTabPress("Home"),
        }}
        options={{
          tabBarLabel: false,
          // activeBackgroundColor:'transparent',
          // tabBarLabel: null,
          // tabBarBadge:true,
          // tabBarActiveBackgroundColor: 'white',
          // tabBarActiveTintColor:'red',
          tabBarBackgroundColor: 'transparent',
          // tabBarColor: 'red',
          // tabBarStyle: customTabStyle.activeTabStyle,
          tabBarIcon: () => {
            return activeTab === "Home" ? <NavBottomActive list={0} /> : <NavBottomActive list={4} />
          },
        }}
      />
      <Tab.Screen
        name="Threads"
        component={Threads}
        listeners={{
          tabPress: () => handleTabPress("Threads"),
        }}
        options={{
          tabBarLabel: false,
          // tabBarLabel: null,
          tabBarIcon: () => (
            activeTab === "Threads" ? <NavBottomActive list={1} /> : <NavBottomActive list={5} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPlan"
        component={MyPlan}
        listeners={{
          tabPress: () => handleTabPress("MyPlant"),
        }}
        options={{
          tabBarLabel: false,
          tabBarIcon: () => (
            activeTab === "MyPlant" ? <NavBottomActive list={2} /> : <NavBottomActive list={6} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={{
          tabPress: () => handleTabPress("Profile"),
        }}
        options={{
          // tabBarLabel: { tabBarShowLabel: false, },
          // tabBarShowLabel: false,
          tabBarLabel: false,
          tabBarIcon: () => (
            activeTab === "Profile" ? <NavBottomActive list={3} /> : <NavBottomActive list={7} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
