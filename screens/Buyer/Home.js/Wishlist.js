import {
    Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";

export default function Wishlist() {
  return (
    <AppScreenThree arrrow={"true"} title={"Wishlist"}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.container2}>
            <Image/>
            <Text></Text>
            <View style={{flexDirection:"row", justifyContent: "space-between"}}>
                <Text></Text>
                <Image/>
            </View>
        </TouchableOpacity>
      </ScrollView>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  container2: {
    borderColor: "#00000033",
    borderWidth: 0.5,
    gap: 12,
    padding: 16,
    borderRadius: 8,
  },
});

const renderItem = () => {
  return <View></View>;
};
