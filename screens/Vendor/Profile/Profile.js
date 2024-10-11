import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import PersonalInformation from "./PersonalInformation";
import OrderHistory from "./OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import {
  Current_vendor_profile_Fun,
  UserProfile_Fun,
  reset_login,
} from "../../../Redux/AuthSlice";
import { useNavigation } from "@react-navigation/native";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { reset_isOnboarding } from "../../../Redux/OnboardingSlice";

const profileImage = require("../../../assets/cakeImages/profile.png");

const Profile = () => {
  const navigation = useNavigation();
  const [profletab, setprofletab] = useState("order");
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const user_data = useSelector((state) => state?.Auth?.user_profile_data);
  const { current_vendor_profile_data } = useSelector((state) => state?.Auth);
  // console.log({ userrrrrrrr: user });
  console.log({ profile: current_vendor_profile_data?.data?.vendorProfile });

  useEffect(() => {
    dispatch(UserProfile_Fun());
    dispatch(Current_vendor_profile_Fun());

    return () => {};
  }, []);

  return (
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
            <Pressable
              onPress={() =>
                navigation.navigate(
                  "applicationForm",
                  (vendorProfile = { current_vendor_profile_data })
                )
              }
            >
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
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.key}>Business Name</Text>
              <Text style={styles.value}>
                {current_vendor_profile_data?.data?.vendorProfile?.businessName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.key}>Business Description</Text>
              <Text
                style={[styles.value, { width: "50%", textAlign: "right" }]}
              >
                {
                  current_vendor_profile_data?.data?.vendorProfile
                    ?.businessDescription
                }
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.key}> C.A.C Number</Text>
              <Text style={styles.value}>
                {current_vendor_profile_data?.data?.vendorProfile?.CACNumber}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.key}>Nationality</Text>
              <Text style={styles.value}>
                {current_vendor_profile_data?.data?.vendorProfile?.nationality}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.key}>Contact</Text>
              <Text style={styles.value}>
                {
                  current_vendor_profile_data?.data?.vendorProfile
                    ?.businessCallLine
                }
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.key}></Text>
              <Text style={styles.value}></Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(!openModal);
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color:"red", textAlign:"center"}}> Log Out </Text>
          </TouchableOpacity>
        </View>
        <Modal visible={openModal} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setOpenModal(!openModal)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text>Logging Out</Text>
                <Text>
                  Are you sure you want to log out of the application?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 30,
                  }}
                >
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#DD293E" }]}
                    onPress={() => dispatch(reset_login())}
                  >
                    <Text style={{ color: "white" }}>Yes, Logout</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#6904EC" }]}
                    onPress={() => setOpenModal(!openModal)}
                  >
                    <Text style={{ color: "white" }}>No, Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    width: "100%",
    gap: 20,
    paddingVertical: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 50,
  },
});
