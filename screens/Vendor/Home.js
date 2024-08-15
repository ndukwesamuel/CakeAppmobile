import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AppScreenTwo from "../../components/shared/AppScreenTwo";
const profileImage = require("../../assets/cakeImages/Ellipse.png");

const Home = () => {
  return (
    <AppScreenTwo notification={"true"}>
      <View style={styles.container}>
        <Text style={[styles.upload, { padding: 20 }]}>Upload Product</Text>
        <View
          style={{
            margin:"auto",
            marginTop: 10,
            flexDirection: "column",
            // justifyContent: "center",
            alignItems:"center"
          }}
        >
          <Image source={profileImage} />
          <Text
            style={{
              textAlign: "center",
              color: "#4C0016",
              fontSize: 12,
              fontWeight: "600",
              marginTop:5
            }}
          >
            Momore Cakes
          </Text>
        </View>
        <View style={[styles.subContainer]}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.subtitle}>Number of Orders</Text>
            <Text style={styles.value}>23</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.subtitle}>Completed Orders</Text>
            <Text style={styles.value}>23</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.subtitle}>Years of experience</Text>
            <Text style={styles.value}>23 years of experience</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            paddingVertical: 20,
            paddingLeft:30,
            paddingRight:50,
            gap: 5,
          }}
        >
          <Text style={{ color: "#4C0016", fontWeight: "500" }}>
            Description
          </Text>
          <Text style={{ color: "black" }}>
            Our vanilla vintage cake is the best option for a classy lunch
            date/picnic ,to match the ambience of your event.ur event.
          </Text>
        </View>
      </View>
    </AppScreenTwo>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    // padding:20
  },
  upload: {
    textAlign: "right",
    fontSize: 12,
    fontWeight: "500",
    color: "#DD293E",
  },
  subContainer: {
    marginTop:30,
    backgroundColor: "white",
    padding: 30,
    gap: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#4C0016",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4C0016",
  },
});
