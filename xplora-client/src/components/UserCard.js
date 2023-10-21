import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const UserCard = () => {
  return <>
    <View style={styles.homeProfile}>
        <Image
          style={styles.userImage}
          source={{
            uri: "https://c.animaapp.com/T4jp7odP/img/ellipse-5-1@2x.png",
          }}
        />
        <View style={styles.frame}>
          <View style={styles.user}>
            <Text style={styles.userText}>John Doe</Text>
          </View>
          <View style={styles.rank}>
            <Text style={styles.rankText}>Intermediate</Text>
          </View>
        </View>
      </View>
      {/* poin  */}
      <View style={styles.pointContainer}>
        <Image
          style={styles.pointImage}
          source={require("../../assets/point-icon.png")}
        />
        <View style={styles.point}>
          <Text style={styles.pointText}>100 Points</Text>
        </View>
      </View>
      {/* badge */}
      <View style={styles.pointContainer}>
        <Image
          style={styles.pointImage}
          source={require("../../assets/beginner-icon.png")}
        />
        <View style={styles.point}>
          <Text style={styles.pointText}>Beginner</Text>
        </View>
      </View>
  </>;
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
    borderWidth: 1,
    borderColor: "gray",
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
    width: 91,
    height: 16,
    alignItems: "flex-start",
    display: "flex",
    gap: 8,
    position: "relative",
    borderWidth: 1,
    borderColor: "gray",
  },
  pointIcon: {
    flex: 1,
    height: 16,
    width: 16,
    position: "relative",
  },
  point: {
    flex: 1,
    fontWeight: 500,
    letterSpacing: 0,
    marginTop: -1,
    position: "relative",
  },
  pointText: {
    color: "#898989",
    fontFamily: "Karla_500Medium",
    fontSize: 14,
  },
  pointImage: {
    position: "relative",
    width: 16,
    height: 16,
  },
});
