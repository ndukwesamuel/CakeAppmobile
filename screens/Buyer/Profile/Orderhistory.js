import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { formatDate, formatTime } from "../../../utills/DateTime";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";

const Orderhistory = () => {
  const [status, setstatus] = useState('')
  const { user_profile_data } = useSelector(
    (state) => state?.Auth
  );
  const { get_all_order_history_data } = useSelector(
    (state) => state?.OrderSlice
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    // dispatch(Get_All_Routes_Fun()); //

    // Wait for 2 seconds
    setRefreshing(false);
  };

  console.log({ orderssss: get_all_order_history_data?.data?.orders[0]?.vendor });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_All_Order_HIstory_Fun(status));
    return () => {};
  }, []);

  return (
    <View
    // style={{
    //   paddingHorizontal: 20,
    //   marginTop: 30,
    //   gap: 20,

    //   flex: 1,
    // }}
    >
      <FlatList
        data={get_all_order_history_data?.data?.orders}
        renderItem={({ item }) => (
          // <View
          //   style={{
          //     backgroundColor: "white",
          //     // padding: 10,
          //     gap: 20,
          //     borderRadius: 10,
          //   }}
          // >
          //   <Text style={{ fontWeight: "600", fontSize: 16 }}> Order</Text>

          //   <View
          //     style={{
          //       flexDirection: "row",
          //       gap: 20,
          //       justifyContent: "space-between",
          //     }}
          //   >
          //     <Text style={{ fontWeight: "400", fontSize: 12 }}>Date</Text>
          //     <Text style={{ fontWeight: "400", fontSize: 12 }}>Time</Text>
          //   </View>

          //   <View
          //     style={{
          //       flexDirection: "row",
          //       gap: 20,
          //       justifyContent: "space-between",
          //     }}
          //   >
          //     <Text style={{ fontWeight: "500", fontSize: 12 }}>
          //       {formatDate(item?.createdAt)}
          //     </Text>
          //     <Text style={{ fontWeight: "400", fontSize: 12 }}>
          //       {formatTime(item?.createdAt)}
          //     </Text>
          //   </View>

          //   <View
          //     style={{
          //       borderWidth: 1,
          //       borderColor: "black",
          //     }}
          //   />
          //   <View
          //     style={{
          //       flexDirection: "row",
          //       gap: 20,
          //       justifyContent: "space-between",
          //     }}
          //   >
          //     <Text style={{ fontWeight: "500", fontSize: 12 }}>Vendor</Text>
          //     <Text style={{ fontWeight: "400", fontSize: 12 }}>
          //       Name of cake
          //     </Text>
          //   </View>

          //   <View
          //     style={{
          //       flexDirection: "row",
          //       gap: 20,
          //       justifyContent: "space-between",
          //     }}
          //   >
          //     <Text style={{ fontWeight: "500", fontSize: 12 }}>
          //       {item?.vendor?.businessName}
          //     </Text>
          //     <Text style={{ fontWeight: "400", fontSize: 12 }}>
          //       {item?.cake?.name}
          //     </Text>
          //   </View>
          // </View>

          <View style={styles.container}>
            <View style={styles.groupContainer}>
              <Text style={styles.groupKey}>Vendor</Text>
              <Text style={styles.groupValue}>{item?.vendor?.businessName}</Text>
            </View>
            <View style={styles.groupContainer}>
              <Text style={styles.groupKey}>Name of Cake</Text>
              <Text style={styles.groupValue}>{item?.cake?.name}</Text>
            </View>
            <View style={styles.groupContainer}>
              <Text style={styles.groupKey}>Quantity</Text>
              <Text style={styles.groupValue}>{item?.quantity}</Text>
            </View>
            <View style={styles.groupContainer}>
              <Text style={styles.groupKey}>Status</Text>
              <Text style={styles.groupValue}>{item?.status}</Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              No Order History
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Orderhistory;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    color: "#0000001A",
    borderRadius: 12,
    gap: 24,
    padding: 12,
    marginBottom:20,
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
});
// App.js

// const DATA_URL = "https://cake-app-server.onrender.com/api/v1/order";
