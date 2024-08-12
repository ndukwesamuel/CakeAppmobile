import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ProgressBarAndroid,
  Image,
  RefreshControl,
} from "react-native";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { truncateDescription } from "../../../utills/Word";
import { formatDate, formatDateString } from "../../../utills/DateTime";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation } from "@react-navigation/native";

export default function BuyerOrder() {
  const [activeTab, setActiveTab] = useState("request");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { get_all_order_history_data } = useSelector(
    (state) => state.OrderSlice
  );

  console.log({ azzz: get_all_order_history_data?.orders[0] });

  useEffect(() => {
    dispatch(UserProfile_Fun());
    dispatch(Get_All_Order_HIstory_Fun(activeTab));
  }, [activeTab]);

  const orders = [
    {
      id: "1",
      title: "Cakez",
      description:
        "Your order will arrive in a day please do keep check on the app",
      status: "Ongoing",
      progress: 90,
      time: "5 min ago",
    },
    {
      id: "2",
      title: "Cakez",
      description:
        "Your order will arrive in a day please do keep check on the app",
      status: "Ongoing",
      progress: 90,
      time: "5 min ago",
    },
  ];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    dispatch(Get_All_Order_HIstory_Fun(activeTab));

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
    <AppScreenTwo>
      <View style={{ flex: 1, padding: 20 }}>
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

        <View style={{ marginBottom: 20 }}>
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
                  backgroundColor: activeTab === item ? "#E91E63" : "#FADADD",
                }}
                onPress={() => setActiveTab(item)}
              >
                <Text
                  style={{ color: activeTab === item ? "white" : "#E91E63" }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <FlatList
          data={get_all_order_history_data?.orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
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
}
