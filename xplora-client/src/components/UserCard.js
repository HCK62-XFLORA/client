import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import beginnerBadge from '../../assets/userBadges/badge-beginner.png'
import advanceBadge from '../../assets/userBadges/badge-advance.png'
import intermediateBadge from '../../assets/userBadges/badge-intermediate.png'
import { UserContext } from "../stores/UserContext";


const { height, width } = Dimensions.get('screen')

const UserCard = () => {

  // const [user, setUser] = useState([]);
  // const [userData, setUserData] = useState(null);

  const { userProfile } = useContext(UserContext);


  const getBadge = () => {
    // return advanceBadge
    if (userProfile.badge === 'Beginner') return beginnerBadge
    else if (userProfile.badge === 'Expert') return advanceBadge
    else if (userProfile.badge === 'Intermediate') return intermediateBadge
  }


  // const getUser = async () => {
  //   try {
  //     const access_token = await SecureStore.getItemAsync("access_token");
  //     const id = await SecureStore.getItemAsync("UserId");
  //     console.log(
  //       "🚀 ~ file: App.js:37 ~ getUser ~ access_token, id:",
  //       access_token,
  //       id
  //     );
  //     setUser({ access_token, id });
  //     return id
  //   } catch (error) {
  //     console.log("🚀 ~ file: App.js:37 ~ getUser ~ error:", error);
  //   }
  // };

  // const fetchUser = async () => {
  //   try {
  //     const { data } = await axios({
  //       url: `https://wadinodev.com/users/profile/${user.id}`,
  //       method: "GET",
  //       headers: { access_token: user.access_token }
  //     });
  //     setUserData(data);
  //     return data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getUser()
  // }, []);

  // useEffect(() => {
  //   fetchUser()
  // }, []);

  // console.log(userData);

  return (
    <View style={{ flex: 1, flexDirection: 'row', width, justifyContent: "space-between", padding: 16 }}>
      <View style={styles.homeProfile}>
        <Image
          style={styles.userImage}
          source={{
            uri: "https://c.animaapp.com/T4jp7odP/img/ellipse-5-1@2x.png",
          }}
        />
        <View style={styles.frame}>
          <View style={styles.user}>
            <Text style={styles.userText}>{userProfile?.username}</Text>
          </View>
          <View style={styles.rank}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.rankText}>{userProfile?.email}</Text>
          </View>
        </View>
      </View>
      {/* poin  */}
      <View style={{ gap: 4 }}>
        <View style={styles.pointContainer}>
          <Image
            style={styles.pointImage}
            source={require("../../assets/point-icon.png")}
          />
          <View style={styles.point}>
            <Text style={styles.pointText}>{userProfile?.point} pts</Text>
          </View>
        </View>
        {/* badge */}
        {userProfile &&
          <View style={styles.pointContainer}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={getBadge()}
            />
            <View style={styles.point}>
              <Text style={styles.pointText}>{userProfile?.badge}</Text>
            </View>
          </View>
        }
      </View>

    </View>
  )
};

export default UserCard;

const styles = StyleSheet.create({
  homeProfile: {
    width: 144,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    position: "relative",
    // borderWidth: 1,
    // borderColor: "gray",
  },
  userImage: {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  frame: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    position: "relative",
    objectFit: "cover",
  },
  user: {
    flex: 1,
    height: 23,
    position: "relative",
    marginTop: -1,
    fontWeight: 500,
  },
  userText: {
    color: "#000000",
    fontSize: 20,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  rank: {
    flex: 1,
    height: 16,
    position: "relative",
    fontWeight: 500,
  },
  rankText: {
    color: "#898989",
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  pointContainer: {
    flexDirection: 'row',
    width: 100,
    // margin: 2,
    height: 20,
    alignItems: "center",
    // display: "flex",
    gap: 8,
    // position: "relative",
    // borderWidth: 1,
    // borderColor: "gray",
  },
  pointIcon: {
    flex: 1,
    height: 16,
    width: 16,
    // position: "relative",
  },
  point: {
    flex: 1,
    fontWeight: 500,
    letterSpacing: 0,
    marginTop: -1,
    // position: "relative",
  },
  pointText: {
    color: "#898989",
    fontFamily: "Karla_500Medium",
    fontSize: 14,
  },
  pointImage: {
    // position: "relative",
    width: 18,
    height: 18,
  },
});
