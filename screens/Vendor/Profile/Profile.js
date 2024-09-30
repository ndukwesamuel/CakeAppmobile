import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import PersonalInformation from "./PersonalInformation";
import OrderHistory from "./OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import {
  Current_vendor_profile_Fun,
  UserProfile_Fun,
} from "../../../Redux/AuthSlice";
import { useNavigation } from "@react-navigation/native";
import AppScreenThree from "../../../components/shared/AppScreenThree";

const profileImage = require("../../../assets/cakeImages/profile.png");

const Profile = () => {
  const navigation = useNavigation();
  const [profletab, setprofletab] = useState("order");
  const dispatch = useDispatch();
  const user_data = useSelector((state) => state?.Auth?.user_profile_data);
  const { current_vendor_profile_data } = useSelector((state) => state.Auth);
  // console.log({ userrrrrrrr: user });
  console.log({ profile: current_vendor_profile_data.data.vendorProfile });

  useEffect(() => {
    dispatch(UserProfile_Fun());
    dispatch(Current_vendor_profile_Fun());

    return () => {};
  }, []);

  return (
    // <AppScreenTwo notification={"true"}>
    //   <View style={{ flex: 1 }}>
    //   <TouchableOpacity
    //         onPress={() => navigation.navigate("applicationForm")}
    //         style={{paddingTop: 80}}
    //       >
    //         <Text style={styles.applicationform}>Update Application Form</Text>
    //       </TouchableOpacity>
    //     <View style={{ alignItems: "center",  }}>

    //       <Image
    //         style={{ width: 100, height: 100, borderRadius: 50, marginTop:20 }}
    //         source={{ uri: user?.image }}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         flexDirection: "row",

    //         alignItems: "center",
    //         justifyContent: "center",
    //         gap: 80,
    //         marginTop: 20,
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={
    //           profletab === "personal"
    //             ? styles.buttonstyleTrue
    //             : styles.buttonstyleFalse
    //         }
    //         onPress={() => setprofletab("personal")}
    //       >
    //         <Text
    //           style={{
    //             color: profletab === "personal" ? "white" : "#DD293E",
    //           }}
    //         >
    //           Personal information
    //         </Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         style={
    //           profletab === "order"
    //             ? styles.buttonstyleTrue
    //             : styles.buttonstyleFalse
    //         }
    //         onPress={() => setprofletab("order")}
    //       >
    //         <Text
    //           style={{
    //             color: profletab === "order" ? "white" : "#DD293E",
    //           }}
    //         >
    //           Order History
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View
    //       style={{
    //         flex: 1,
    //       }}
    //     >
    //       {profletab === "personal" && <PersonalInformation />}
    //       {profletab === "order" && <OrderHistory />}
    //     </View>
    //   </View>
    // </AppScreenTwo>
    <AppScreenThree arrrow={"true"} title={"Profile"}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: user_data?.data?.user?.image }}
            style={styles.image}
          />
          <View>
            <Text style={{ color: "#2B025F", fontSize: 20, fontWeight: "500" }}>
              {user_data?.data?.user?.firstName}{" "}
              {user_data?.data?.user?.lastName}
            </Text>
            <Pressable>
              <Text
                style={{
                  color: "#6904EC",
                  fontSize: 14,
                  textDecorationLine: "underline",
                }}
              >
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </View>
        {/* business display */}
        <View
          style={{
            backgroundColor: "white",
            padding: 25,
            gap: 24,
          }}
        >
          <Text style={{ color: "#2B025F", fontSize: 20, fontWeight: "500" }}>
            Business Information
          </Text>
          <View style={{ gap: 12 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.key}>Business Name</Text>
              <Text style={styles.value}>
                {current_vendor_profile_data.data.vendorProfile.businessName}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.key}>Business Description</Text>
              <Text style={styles.value}>
                {
                  current_vendor_profile_data.data.vendorProfile
                    .businessDescription
                }
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.key}> C.A.C Number</Text>
              <Text style={styles.value}>
                {current_vendor_profile_data.data.vendorProfile.CACNumber}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.key}>Nationality</Text>
              <Text style={styles.value}>
                {current_vendor_profile_data.data.vendorProfile.nationality}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.key}>Contact</Text>
              <Text style={styles.value}>
                {
                  current_vendor_profile_data.data.vendorProfile
                    .businessCallLine
                }
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.key}></Text>
              <Text style={styles.value}></Text>
            </View>
          </View>
        </View>
      </View>
    </AppScreenThree>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    gap: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderColor: "#FFFFFF",
    borderWidth: 1.5,
  },
  key: {
    color: "#2B025F",
    fontSize: 14,
    fontWeight: "400",
  },
  value: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "500",
  },
  // buttonstyleTrue: {
  //   backgroundColor: "#DD293E",
  //   padding: 12,
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   borderRadius: 30,
  // },
  // buttonstyleFalse: {
  //   // backgroundColor: "#F0F0F0", // Define a background color for inactive buttons
  //   padding: 12,
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  //   borderRadius: 30,
  // },
  // applicationform:{
  //   textAlign:"right",
  //   color:"#DD293E",
  //   marginRight:20

  // }
});
