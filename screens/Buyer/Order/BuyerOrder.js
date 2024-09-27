import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ProgressBarAndroid,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { truncateDescription } from "../../../utills/Word";
import {
  formatDate,
  formatDateString,
  formatTime,
} from "../../../utills/DateTime";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation } from "@react-navigation/native";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import WebView from "react-native-webview";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function BuyerOrder() {
  const [activeTab, setActiveTab] = useState("request");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pay, setPay] = useState(false);
  const [fluterwaveObj, setfluterwaveObj] = useState("");
  const { user_data } = useSelector((state) => state.Auth);

  const { get_all_order_history_data } = useSelector(
    (state) => state?.OrderSlice
  );
  const [paystackInfo, setPaystackInfo] = useState(null);

  console.log({ azzz: user_data?.data?.token });

  useEffect(() => {
    // dispatch(UserProfile_Fun());
    dispatch(Get_All_Order_HIstory_Fun(activeTab));
  }, [activeTab]);

  const StartPAy = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/order/pay/${data_info}`;

      console.log({
        url,
        datas: data_info, //get_single_order_history_data?.order?._id,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, {}, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          sa: success?.data,
        });

        setPaystackInfo(success?.data?.authorizationUrl);
        Toast.show({
          type: "success",
          text1: `success `,
        });
      },

      onError: (error) => {
        console.log({
          error: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    dispatch(Get_All_Order_HIstory_Fun(activeTab));

    // Wait for 2 seconds
    setRefreshing(false);
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.container2}>
      <Image />

      {/* Cake Name and Description */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: "#2B025F",
            fontSize: 20,
            fontWeight: "600",
            alignItems: "center",
          }}
        >
          {item?.cake?.name}
        </Text>
        <Text>{formatTime(item?.updatedAt)}</Text>
      </View>

      <Text style={{ color: "#2B025F", fontSize: 14, fontWeight: "400" }}>
        {item?.cake?.description}
      </Text>

      {/* Conditionally render Make Payment button if status is "accepted" */}
      {item?.status === "accepted" && (
        <View
          style={{
            alignSelf: "flex-end",
          }}
        >
          {StartPAy.isLoading ? (
            <ActivityIndicator color="red" size={29} />
          ) : (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => StartPAy.mutate(item?._id)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Make Payment
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {item?.status === "delivered" && (
        <TouchableOpacity style={[styles.button, { alignSelf: "flex-end" }]}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Mark as delivered
          </Text>
        </TouchableOpacity>
      )}
      {item?.status === "request" && (
        <View style={{ gap: 10 }}>
          <View>
            <Text style={{ color: "#2B025F", fontSize: 16, fontWeight: "400" }}>
              Ongoing
            </Text>
          </View>

          <View
            style={{ backgroundColor: "#6904EC", height: 15, borderRadius: 20 }}
          ></View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <AppScreenThree arrrow={"true"} title={"Orders"}>
      {paystackInfo ? (
        <WebView
          style={{
            flex: 1,
          }}
          source={{ uri: paystackInfo }}
        />
      ) : (
        <ScrollView style={styles.container}>
          {/* Active buttons */}
          <View>
            <FlatList
              key={3} // Force re-render when numColumns changes (use a static key based on numColumns)
              data={[
                "request",
                "accepted",
                "ongoing",
                "completed",
                "delivered",
                "rejected",
              ]}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} // Set the number of columns to 3
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 40,
                    margin: 5,
                    backgroundColor:
                      activeTab === item ? "#6904EC" : "#6904EC1A",
                  }}
                  onPress={() => setActiveTab(item)}
                >
                  <Text
                    style={{
                      color: activeTab === item ? "white" : "#6904EC",
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ marginTop: 20, marginBottom: 100 }}>
            <FlatList
              data={get_all_order_history_data?.data?.orders}
              renderItem={renderOrder}
              keyExtractor={(item) => item?._id}
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
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                      color: "#2B025F",
                      marginTop: 60,
                    }}
                  >
                    No Order History
                  </Text>
                </View>
              }
            />
          </View>
        </ScrollView>
      )}
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
  },
  container2: {
    borderWidth: 0.5,
    borderColor: "#00000033",
    borderRadius: 8,
    padding: 16,
    gap: 27,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#6904EC",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 40,
  },
});
