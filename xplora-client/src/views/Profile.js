import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  LogBox,
} from "react-native";
import React, { useContext } from "react";
import ThreadHome from "../components/Thread/ThreadHome";
import MyPlantCard2 from "../components/MyPlant/MyPlantCard2";
import { UserContext } from "../stores/UserContext";

const Profile = ({ navigation }) => {
  const { userProfile } = useContext(UserContext);
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.userContentContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.userImage}
            source={require("../../assets/Profile/User-pict.png")}
          />
          <View>
            <Text style={styles.userText}>{userProfile?.username}</Text>
            <Text style={styles.rankText}>{userProfile?.email}</Text>
          </View>
        </View>
        <Image
          style={styles.illustration}
          source={require("../../assets/Illustration/rumah-illustration.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.pointContainer}>
        <View style={styles.pointContentContainer}>
          <Text style={styles.levelText}>Level</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={require("../../assets/beginner-icon.png")}
            />
            <Text style={styles.levelParagraph}>{userProfile?.badge}</Text>
          </View>
        </View>
        <View style={styles.pointContentContainer}>
          <Text style={styles.levelText}>Points</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={require("../../assets/point-icon.png")}
            />
            <Text style={styles.levelParagraph}>{userProfile?.point} pts</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.pointContentContainer}
          onPress={() => navigation.navigate("MyVoucher")}>
          <Text style={styles.levelText}>Vouchers</Text>
          <View style={styles.levelContent}>
            <Image
              style={styles.pointImage}
              resizeMode="contain"
              source={require("../../assets/Profile/Voucher.png")}
            />
            <Text style={styles.levelParagraph}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionTitle}>My Plant</Text>
          <FlatList
            data={userProfile?.MyPlants.sort((a, b) =>
              b.createdAt.localeCompare(a.createdAt)
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyPlantDetail", { id: item.id });
                }}>
                <MyPlantCard2 item={item} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{
              // flex:1,
              overflow: "hidden",
              marginBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          />
        </View>
        <Text style={styles.sectionTitle}>My Thread</Text>
        <FlatList
          data={userProfile?.Threads.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )}
          nestedScrollEnabled={true}
          renderItem={({ item }) => <ThreadHome item={item} />}
          style={{
            // flex:1,
            overflow: "hidden",
            marginBottom: 16,
            paddingLeft: 16,
            paddingRight: 8,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#DEEAE5",
  },
  userImage: {
    position: "relative",
    width: 64,
    height: 64,
    borderRadius: 48,
  },
  userText: {
    color: "#000000",
    fontSize: 20,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  rankText: {
    color: "#898989",
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  userContainer: {
    gap: 8,
  },
  illustration: {
    height: 146,
  },
  userContentContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "flex-end",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  pointContainer: {
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 16,
    paddingLeft: 16,
    alignItems: "center",
    gap: 22,
    margin: 16,
  },
  pointImage: {
    width: 18,
    height: 18,
  },
  levelContent: {
    flexDirection: "row",
    gap: 4,
  },
  pointContentContainer: {
    alignContent: "center",
    alignItems: "center",
    gap: 8,
  },
  levelText: {
    color: "#898989",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  levelParagraph: {
    color: "#000",
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: "Karla_500Medium",
    paddingLeft: 16,
  },
  bottomContainer: {
    marginTop: 8,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 8,
  },
});
