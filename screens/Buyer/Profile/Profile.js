import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useDispatch, useSelector } from "react-redux";
import {
  UserProfile_Fun,
  UserProfile_Fun_getVendorProfile,
} from "../../../Redux/AuthSlice";
import Orderhistory from "./Orderhistory";
import Personalinfo from "./Personalinfo";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";
import { useUserProfile } from "../../../utills/CustomHook";
import { colors } from "../../../utills/Themes";
import AppScreen from "../../../components/shared/AppScreen";

const Profile = () => {
  const dispatch = useDispatch();
  // const userdd = useSelector((state) => state?.Auth?.user_profile_data);
  const [profletab, setprofletab] = useState("order");

  const { user_data, user_profile_data } = useSelector((state) => state?.Auth);

  // Use the custom hook to get the user profile data
  const { userProfileData } = useUserProfile();

  console.log({
    ffgfg: userProfileData,
  });
  useEffect(() => {
    dispatch(UserProfile_Fun());
    // dispatch(Get_All_Order_HIstory_Fun(""));
  }, []);

  const userData = [
    {
      key: "Name",
      value: `${userProfileData?.firstName} ${userProfileData?.lastName}`,
    },
    { key: "Phone Number", value: userProfileData?.Phone || "null" },
    { key: "Email Address", value: userProfileData?.email },
    { key: "Work Location", value: userProfileData?.location },
  ];

  return (
    <AppScreen>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", paddingTop: 60 }}>
          <Image
            style={{ width: 130, height: 100, borderRadius: 12 }}
            source={{ uri: userProfileData?.image }}
          />
          <Text>{`${userProfileData?.firstName} ${userProfileData?.lastName}`}</Text>

          <TouchableOpacity>
            <Text
              style={{
                color: colors.primary,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
          }}
        >
          <Text>Personal Information</Text>
          {userData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row", // Align key and value in a row
                justifyContent: "space-between", // Space between key and value
                marginVertical: 10, // Add space between each row
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  flex: 1,
                }}
              >
                {item.key}:
              </Text>
              <Text
                style={{
                  color: "#333",
                  flex: 1, // Allow the value to take up more space
                  textAlign: "right",
                }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* <View
          style={{
            flex: 1,
          }}
        >
          {profletab === "personal" && <Personalinfo />}
          {profletab === "order" && <Orderhistory />}
        </View> */}
      </View>
    </AppScreen>
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
