import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import Orderhistory from "./Orderhistory";
import Personalinfo from "./Personalinfo";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth.user_profile_data);
  const [profletab, setprofletab] = useState("order");

  useEffect(() => {
    dispatch(UserProfile_Fun());
    dispatch(Get_All_Order_HIstory_Fun(""));
  }, []);

  return (
    <AppScreenTwo>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", paddingTop: 60 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 50 }}
            source={{ uri: user?.image }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
            justifyContent: "center",
            gap: 100,
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
                color: profletab === "personal" ? "white" : "black",
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
                color: profletab === "order" ? "white" : "black",
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
          {profletab === "personal" && <Personalinfo />}
          {profletab === "order" && <Orderhistory />}
        </View>
      </View>
    </AppScreenTwo>
  );
};

const styles = StyleSheet.create({
  buttonstyleTrue: {
    backgroundColor: "#DD293E",
    padding: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonstyleFalse: {
    backgroundColor: "#F0F0F0", // Define a background color for inactive buttons
    padding: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
});

export default Profile;
