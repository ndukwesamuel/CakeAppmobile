import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_Order_HIstory_Fun } from "../../../Redux/Vendor/OrderSlice";
import { formatDate } from "../../../utills/DateTime";
import { truncateDescription } from "../../../utills/Word";
import { useNavigation } from "@react-navigation/native";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";

const Orders = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("ongoing");
  const get_order_history_data = useSelector(
    (state) => state.VendorsSlice.OrderSlice.get_order_history_data
  );
  console.log(get_order_history_data?.orders);

  useEffect(() => {
    dispatch(Get_Order_HIstory_Fun(activeTab));
    return () => {};
  }, [activeTab]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    dispatch(Get_Order_HIstory_Fun(activeTab));

    // Wait for 2 seconds
    setRefreshing(false);
  };

  const renderOrder = ({ item }) => (
    <>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        onPress={() => {
          navigation.navigate("BuyerOrderDetails", {
            item: item,
          });
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#D8D8D8",
            marginRight: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.cake?.name}
          </Text>
          <Text style={{ color: "#8A8A8A", marginVertical: 5 }}>
            {truncateDescription(item.cake?.description)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* <Text style={{ color: "#8A8A8A" }}>{item.progress}%</Text> */}
          </View>
          <Text style={{ color: "#8A8A8A" }}>{item.status}</Text>

          {/* <ProgressBarAndroid
              styleAttr="Horizontal"
              color="#E91E63"
              indeterminate={false}
              progress={item.progress / 100}
            /> */}
        </View>
        <Text style={{ color: "#8A8A8A", fontSize: 12 }}>
          {formatDate(item.updatedAt)}
        </Text>
      </TouchableOpacity>
      <View
        style={{ height: 1, backgroundColor: "#D8D8D8", marginBottom: 20 }}
      />
    </>
  );

  return (
    <AppScreenTwo notification={"true"}>
      <View style={{ flex: 1, padding: 20, marginTop:30 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Orders</Text>
        </View>
        <View style={{ marginBottom: 20, paddingTop:20 }}>
          <FlatList
            data={[
              "request",
              "accepted",
              "ongoing",
              "completed",
              "delivered",
              "rejected",
            ]}
            keyExtractor={(item) => item?._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  backgroundColor: activeTab === item ? "#DD293E" : "#FADADD",
                }}
                onPress={() => setActiveTab(item)}
              >
                <Text
                  style={{ color: activeTab === item ? "white" : "#DD293E" }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <FlatList
          data={get_order_history_data?.orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item._id}
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
    </AppScreenTwo>
  );
};

export default Orders;

const styles = StyleSheet.create({});
