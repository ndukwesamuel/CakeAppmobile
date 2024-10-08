import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import PersonalInformation from "./PersonalInformation";
import OrderHistory from "./OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import { useNavigation } from "@react-navigation/native";

const profileImage = require("../../../assets/cakeImages/profile.png");

const Profile = () => {
  const navigation = useNavigation();
  const [profletab, setprofletab] = useState("order");
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.Auth?.user_profile_data?.user);
  // console.log({userrrrrrrr:user})

  useEffect(() => {
    dispatch(UserProfile_Fun());

    return () => {};
  }, []);

  return (
    <AppScreenTwo notification={"true"}>
      <View style={{ flex: 1 }}>
      <TouchableOpacity
            onPress={() => navigation.navigate("applicationForm")}
            style={{paddingTop: 80}}
          >
            <Text style={styles.applicationform}>Update Application Form</Text>
          </TouchableOpacity>
        <View style={{ alignItems: "center",  }}>
          
          <Image
            style={{ width: 100, height: 100, borderRadius: 50, marginTop:20 }}
            source={{ uri: user?.image }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
            justifyContent: "center",
            gap: 80,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={
              profletab === "personal"
                ? styles.buttonstyleTrue
                : styles.buttonstyleFalse
            }
            onPress={() => setprofletab("personal")}
          >
            <Text
              style={{
                color: profletab === "personal" ? "white" : "#DD293E",
              }}
            >
              Personal information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              profletab === "order"
                ? styles.buttonstyleTrue
                : styles.buttonstyleFalse
            }
            onPress={() => setprofletab("order")}
          >
            <Text
              style={{
                color: profletab === "order" ? "white" : "#DD293E",
              }}
            >
              Order History
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          {profletab === "personal" && <PersonalInformation />}
          {profletab === "order" && <OrderHistory />}
        </View>
      </View>
    </AppScreenTwo>
  );
};

export default Profile;

const styles = StyleSheet.create({
  buttonstyleTrue: {
    backgroundColor: "#DD293E",
    padding: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonstyleFalse: {
    // backgroundColor: "#F0F0F0", // Define a background color for inactive buttons
    padding: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  applicationform:{
    textAlign:"right",
    color:"#DD293E",
    marginRight:20

  }
});
