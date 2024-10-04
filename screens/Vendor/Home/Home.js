import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
const profileImage = require("../../../assets/cakeImages/Ellipse.png");
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Get_Vendor_Profile } from "../../../Redux/Vendor/ProfileSlice";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Vendor/OrderSlice";
import CakeCategories from "./CakeCategories";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { Current_vendor_profile_Fun } from "../../../Redux/AuthSlice";
import AppScreen from "../../../components/shared/AppScreen";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [completedOrdersCount, setCompletedOrdersCount] = useState([]);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState([]);
  const [requestOrdersCount, setRequestOrdersCount] = useState([]);
  const [cancelledOrdersCount, setCancelledOrdersCount] = useState([]);
  const vendor_profile_data1 = useSelector(
    (state) => state?.VendorsSlice?.ProfileSlice?.vendor_profile_data
  );
  const vendor_profile_data = useSelector(
    (state) =>
      state?.VendorsSlice?.ProfileSlice?.vendor_profile_data?.vendorProfile
  );
  const { user_data } = useSelector((state) => state?.Auth);
  const { get_all_order_history_data } = useSelector(
    (state) => state?.VendorsSlice?.OrderSlice
  );

  const { current_vendor_profile_data } = useSelector((state) => state?.Auth);
  console.log({current_vendor_profile_data: current_vendor_profile_data?.data?.vendorProfile?.isSubmitted})
  // console.log({
  //   dataaaa: get_all_order_history_data?.data?.orders,
  // });
  useEffect(() => {
    dispatch(Current_vendor_profile_Fun());
    dispatch(Get_Vendor_Profile());
    dispatch(Get_All_Order_HIstory_Fun());
    return () => {};
  }, []);

  useEffect(() => {
    if (get_all_order_history_data) {
      const completedOrders = get_all_order_history_data?.data?.orders?.filter(
        (order) => order.status === "accepted"
      );
      setCompletedOrdersCount(completedOrders);
      const ongoingOrders = get_all_order_history_data?.data?.orders?.filter(
        (order) => order.status === "ongoing"
      );
      setOngoingOrdersCount(ongoingOrders);
      const requestedOrders = get_all_order_history_data?.data?.orders?.filter(
        (order) => order.status === "request"
      );
      setRequestOrdersCount(requestedOrders);
      const cancelledOrders = get_all_order_history_data?.data?.orders?.filter(
        (order) => order.status === "rejected"
      );
      setCancelledOrdersCount(cancelledOrders);
    }
  }, [get_all_order_history_data]);

  const handleUploadProduct = () => {
    if( current_vendor_profile_data?.data?.vendorProfile?.isSubmitted === true){
      navigation.navigate("uploadProduct")
    }else{
      navigation.navigate("applicationForm")
    }

  };
  return (
    <AppScreen>
      <ScrollView style={styles.container} contentContainerStyle={{ gap: 20 }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={{ uri: current_vendor_profile_data?.data?.image }}
              style={{ width: 30, height: 30, borderRadius: 20 }}
            />
            <Text style={{ color: "#2E1400", fontSize: 20, fontWeight: "700" }}>
              Hello{" "}
              {
                current_vendor_profile_data?.data?.vendorProfile?.userProfile
                  ?.firstName
              }
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={require("../../../assets/icons/notification.svg")}
              style={{ width: 30, height: 30 }}
            />
            <Image
              source={require("../../../assets/icons/search.svg")}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </View>
        <View>
          <Image
            source={require("../../../assets/images/background.png")}
            style={{ resizeMode: "contain" }}
          />
        </View>
        {/* Ongoing */}
        <View style={styles.orderContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#6904EC33",
              borderBottomWidth: 0.5,
            }}
          >
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 30,
                backgroundColor: "#6904EC1A",
              }}
            >
              <Image source={require("../../../assets/icons/Ongoing.png")} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <View>
                <Text
                  style={{ color: "#2B025F", fontSize: 16, fontWeight: "500" }}
                >
                  Ongoing
                </Text>
                <Text
                  style={{ color: "#2B025F", fontSize: 42, fontWeight: "500" }}
                >
                  {ongoingOrdersCount.length}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("orderDetails", {
                    data: ongoingOrdersCount,
                    title: "ongoing",
                  })
                }
              >
                <View style={styles.button}>
                  <Text>View</Text>
                  <Image source={require("../../../assets/icons/Group.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Pending */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#6904EC33",
              borderBottomWidth: 0.5,
            }}
          >
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 30,
                backgroundColor: "#DEAE021A",
              }}
            >
              <Image source={require("../../../assets/icons/Pending.png")} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <View>
                <Text
                  style={{ color: "#2B025F", fontSize: 16, fontWeight: "500" }}
                >
                  Pending
                </Text>
                <Text
                  style={{ color: "#2B025F", fontSize: 42, fontWeight: "500" }}
                >
                  {requestOrdersCount.length}
                </Text>
              </View>
              <TouchableOpacity
                style={{}}
                onPress={() =>
                  navigation.navigate("orderDetails", {
                    data: requestOrdersCount,
                    title: "pending",
                  })
                }
              >
                <View style={styles.button}>
                  <Text>View</Text>
                  <Image source={require("../../../assets/icons/Group.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Completed */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#6904EC33",
              borderBottomWidth: 0.5,
            }}
          >
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 30,
                backgroundColor: "#04EC171A",
              }}
            >
              <Image source={require("../../../assets/icons/Winne.png")} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <View>
                <Text
                  style={{ color: "#2B025F", fontSize: 16, fontWeight: "500" }}
                >
                  Accepted
                </Text>
                <Text
                  style={{ color: "#2B025F", fontSize: 42, fontWeight: "500" }}
                >
                  {completedOrdersCount.length}
                </Text>
              </View>
              <TouchableOpacity
                style={{}}
                onPress={() =>
                  navigation.navigate("orderDetails", {
                    data: completedOrdersCount,
                    title: "accepted",
                  })
                }
              >
                <View style={styles.button}>
                  <Text>View</Text>
                  <Image source={require("../../../assets/icons/Group.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Cancelled */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#6904EC33",
              borderBottomWidth: 0.5,
            }}
          >
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 30,
                backgroundColor: "#DD293E1A",
              }}
            >
              <Image source={require("../../../assets/icons/Rejected.png")} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
                flex: 1,
              }}
            >
              <View>
                <Text
                  style={{ color: "#2B025F", fontSize: 16, fontWeight: "500" }}
                >
                  Cancelled
                </Text>
                <Text
                  style={{ color: "#2B025F", fontSize: 42, fontWeight: "500" }}
                >
                  {cancelledOrdersCount.length}
                </Text>
              </View>
              <TouchableOpacity
                style={{}}
                onPress={() =>
                  navigation.navigate("orderDetails", {
                    data: cancelledOrdersCount,
                    title: "cancelled",
                  })
                }
              >
                <View style={styles.button}>
                  <Text>View</Text>
                  <Image source={require("../../../assets/icons/Group.png")} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </View>
        {/* </View> */}

        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity onPress={handleUploadProduct}>
            <Text
              style={{
                textAlign: "center",
                textDecorationLine: "underline",
                color: "#6904EC",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Upload Product
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
  },
  orderContainer: {
    backgroundColor: "white",
    padding: 25,
    gap: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#6904EC",
    borderBottomWidth: 0.5,
  },
  // container: {
  //   flex: 1,
  //   marginTop: 80,
  //   paddingHorizontal:15
  // },
  // upload: {
  //   textAlign: "right",
  //   fontSize: 12,
  //   fontWeight: "500",
  //   color: "#DD293E",
  //   paddingTop:20
  // },
  // profileContainer: {
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginVertical: 15,
  // },
  // profileImage: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40,
  // },
  // profileName: {
  //   textAlign: "center",
  //   color: "#4C0016",
  //   fontSize: 12,
  //   fontWeight: "600",
  //   marginTop: 5,
  // },
  // subContainer: {
  //   backgroundColor: "white",
  //   padding: 20,
  //   borderRadius:10
  //   // marginBottom: 20,
  // },
  // infoRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginBottom: 10,
  // },
  // subtitle: {
  //   fontSize: 14,
  //   fontWeight: "400",
  //   color: "#4C0016",
  // },
  // value: {
  //   fontSize: 14,
  //   fontWeight: "700",
  //   color: "#4C0016",
  // },
  // categoriesContainer: {
  //   flex: 1,
  // },
});
