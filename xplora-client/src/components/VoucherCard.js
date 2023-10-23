import * as React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { Text, View } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MyComponent = () => (
  <Card>
    <Card.Cover source={require("../../assets/PromoCard/promoCard-1.png")} />
    <Card.Actions>
      <Text>100 Points</Text>
      <Button
        mode="contained"
        buttonColor="#898989"
        onPress={() => console.log("Pressed")}>
        Redeemed
      </Button>
      <View></View>
    </Card.Actions>
  </Card>
);

export default MyComponent;
