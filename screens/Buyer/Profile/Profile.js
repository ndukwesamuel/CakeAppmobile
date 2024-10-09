import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useDispatch, useSelector } from "react-redux";
import {
  UserProfile_Fun,
  UserProfile_Fun_getVendorProfile,
  reset_login,
} from "../../../Redux/AuthSlice";
import Orderhistory from "./Orderhistory";
import Personalinfo from "./Personalinfo";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useUserProfile } from "../../../utills/CustomHook";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);

  const { user_data, user_profile_data } = useSelector((state) => state?.Auth);

  // console.log({
  //   ffgfg: user_profile_data?.data?.user,
  // });
  useEffect(() => {
    dispatch(UserProfile_Fun());
  }, []);

  console.log({ data: user_profile_data?.data?.user });

  return (
    <AppScreenThree arrrow={"true"} title={"Profile"}>
      <ScrollView style={styles.container}>
        <View style={styles.displayContainer}>
          <Image
            source={{ uri: user_profile_data?.data?.user?.image }}
            style={styles.image}
          />
          <Text style={styles.name}>
            {user_profile_data?.data?.user?.firstName}{" "}
            {user_profile_data?.data?.user?.lastName}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("editProfile", { user_profile_data })
            }
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                textDecorationLine: "underline",
                color: "#6904EC",
              }}
            >
              Edit Profile{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <Text style={styles.title}>Personal Information</Text>
          <View style={styles.groupContainer}>
            <Text style={styles.groupKey}>Name</Text>
            <Text style={styles.groupValue}>
              {user_profile_data?.data?.user?.firstName}{" "}
              {user_profile_data?.data?.user?.lastName}
            </Text>
          </View>
          <View style={styles.groupContainer}>
            <Text style={styles.groupKey}>Email Address</Text>
            <Text style={styles.groupValue}>
              {user_profile_data?.data?.user?.email}
            </Text>
          </View>
          <View style={styles.groupContainer}>
            <Text style={styles.groupKey}>location</Text>
            <Text style={styles.groupValue}>
              {user_profile_data?.data?.user?.location}
            </Text>
          </View>
          <View style={styles.groupContainer}>
            <Text style={styles.groupKey}>No of Orders made</Text>
            <Text style={styles.groupValue}>
              {user_profile_data?.data?.user?.orderCount}
            </Text>
          </View>
        </View>
        {/* <View style={[styles.container2, { paddingBottom: 60 }]}>
          <Text style={styles.title}>Orders</Text>
          <Orderhistory />
        </View> */}
        <View style={[styles.container2]}>
          <TouchableOpacity
            onPress={() => {
              setOpenModal(!openModal);
              
            }}
          >
            <Text style={styles.name}> Log Out </Text>
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
                <View style={{flexDirection:"row", justifyContent:"space-between", gap:30}}>
                  <TouchableOpacity style={[styles.button, {backgroundColor:'#DD293E'}]} onPress={() => dispatch(reset_login())}>
                    <Text style={{color:"white"}}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, {backgroundColor:'#6904EC'}]} onPress={() => setOpenModal(!openModal)}>
                    <Text style={{color:'white'}}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    </AppScreenThree>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
  },
  displayContainer: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2B025F",
  },
  container2: {
    backgroundColor: "white",
    padding: 30,
    marginTop: 20,
    gap: 24,
  },
  title: {
    color: "#2B025F",
    fontSize: 20,
    fontWeight: "500",
  },
  groupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupKey: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B025F",
  },
  groupValue: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "600",
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
  button:{
    paddingHorizontal:20,
    paddingVertical:16,
    borderRadius:50
  }
});

export default Profile;
