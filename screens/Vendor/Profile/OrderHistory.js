import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Vendor/OrderSlice";

const OrderHistory = () => {
  const get_all_order_history_data = useSelector(
    (state) => state?.VendorsSlice.OrderSlice.get_all_order_history_data.orders
  );
  console.log(get_all_order_history_data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_All_Order_HIstory_Fun());
    return () => {};
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.textGroup}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Order</Text>
        <View style={{ gap: 3 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12 }}>Date</Text>
            <Text style={{ fontSize: 12 }}>Time</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Nov 24, 2024
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>4:00PM</Text>
          </View>
          <Text style={styles.border}></Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>Vendor</Text>
            <Text style={{ fontSize: 12 }}>Name of Cake</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Cake 'n' bake
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              {item.cake.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={get_all_order_history_data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 20,
  },
  textGroup: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 5,
    borderRadius: 8,
    marginTop:10
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#292D32",
    height: 0,
  },
});
