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
} from "react-native";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Buyer/OrderSlice";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { truncateDescription } from "../../../utills/Word";
import { formatDate, formatDateString, formatTime } from "../../../utills/DateTime";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation } from "@react-navigation/native";
import AppScreenThree from "../../../components/shared/AppScreenThree";

export default function BuyerOrder() {
  const [activeTab, setActiveTab] = useState("request");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { get_all_order_history_data } = useSelector(
    (state) => state?.OrderSlice
  );

  console.log({ azzz: get_all_order_history_data?.data?.orders });

  useEffect(() => {
    // dispatch(UserProfile_Fun());
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
    // <>
    //   <TouchableOpacity
    //     style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
    //     onPress={() => {
    //       navigation.navigate("BuyerOrderDetails", {
    //         item: item,
    //       });
    //     }}
    //   >
    //     <View
    //       style={{
    //         width: 40,
    //         height: 40,
    //         borderRadius: 20,
    //         backgroundColor: "#D8D8D8",
    //         marginRight: 10,
    //       }}
    //     />
    //     <View style={{ flex: 1 }}>
    //       <Text style={{ fontWeight: "bold", fontSize: 16 }}>
    //         {item?.cake?.name}
    //       </Text>
    //       <Text style={{ color: "#8A8A8A", marginVertical: 5 }}>
    //         {truncateDescription(item?.cake?.description)}
    //       </Text>
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         {/* <Text style={{ color: "#8A8A8A" }}>{item.progress}%</Text> */}
    //       </View>
    //       <Text style={{ color: "#8A8A8A" }}>{item?.status}</Text>

    //       {/* <ProgressBarAndroid
    //       styleAttr="Horizontal"
    //       color="#E91E63"
    //       indeterminate={false}
    //       progress={item.progress / 100}
    //     /> */}
    //     </View>
    //     <Text style={{ color: "#8A8A8A", fontSize: 12 }}>
    //       {formatDate(item?.updatedAt)}
    //     </Text>
    //   </TouchableOpacity>
    //   <View
    //     // style={{ height: 1, backgroundColor: "#D8D8D8", marginBottom: 20 }}
    //   />
    // </>
    <TouchableOpacity style={styles.container2}>
      <Image />

      {/* Cake Name and Description */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "#2B025F", fontSize: 20, fontWeight: "600", alignItems:"center" }}>
          {item?.cake?.name}
        </Text>
        <Text>{formatTime(item?.updatedAt)}</Text>
      </View>

      <Text style={{ color: "#2B025F", fontSize: 14, fontWeight: "400" }}>
        {item?.cake?.description}
      </Text>

      {/* Conditionally render Make Payment button if status is "accepted" */}
      {item?.status === "accepted" && (
        <TouchableOpacity style={[styles.button, { alignSelf: "flex-end" }]} onPress={()=> navigation.navigate('payment')}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Make Payment
          </Text>
        </TouchableOpacity>
      )}
      {item?.status === "delivered" && (
        <TouchableOpacity style={[styles.button, { alignSelf: "flex-end" }]}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Mark as delivered
          </Text>
        </TouchableOpacity>
      )}
      {item?.status === "request" && (
        <View style={{gap:10}}>
          <View>
            <Text style={{color:"#2B025F", fontSize:16, fontWeight:"400"}}>Ongoing</Text>
          </View>
          <View style={{backgroundColor:"#6904EC", height:15, borderRadius:20}}>

          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    // <AppScreenTwo>
    //   <View style={{ flex: 1, padding: 20 }}>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         marginBottom: 20,
    //       }}
    //     >
    //       <Text style={{ fontWeight: "bold", fontSize: 24 }}>Orders</Text>
    //     </View>

    //     <View style={{ marginBottom: 20 }}>
    //       <FlatList
    //         data={[
    //           "request",
    //           "accepted",
    //           "ongoing",
    //           "completed",
    //           "delivered",
    //           "rejected",
    //         ]}
    //         keyExtractor={(item) => item?._id}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //         renderItem={({ item }) => (
    //           <TouchableOpacity
    //             style={{
    //               paddingHorizontal: 20,
    //               paddingVertical: 10,
    //               borderRadius: 20,
    //               marginHorizontal: 5,
    //               backgroundColor: activeTab === item ? "#E91E63" : "#FADADD",
    //             }}
    //             onPress={() => setActiveTab(item)}
    //           >
    //             <Text
    //               style={{ color: activeTab === item ? "white" : "#E91E63" }}
    //             >
    //               {item}
    //             </Text>
    //           </TouchableOpacity>
    //         )}
    //       />
    //     </View>

    //     <FlatList
    //       data={get_all_order_history_data?.data?.orders}
    //       renderItem={renderOrder}
    //       keyExtractor={(item) => item?.id}
    //       refreshControl={
    //         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //       }
    //       showsHorizontalScrollIndicator={false}
    //       showsVerticalScrollIndicator={false}
    //       ListEmptyComponent={
    //         <View
    //           style={{
    //             alignItems: "center",
    //             justifyContent: "center",
    //             flex: 1,
    //           }}
    //         >
    //           <Text style={{ fontWeight: "500", fontSize: 16 }}>
    //             No Order History
    //           </Text>
    //         </View>
    //       }
    //     />
    //   </View>
    // </AppScreenTwo>

    <AppScreenThree arrrow={"true"} title={"Orders"}>
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
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderRadius: 40,
                  margin: 5,
                  backgroundColor: activeTab === item ? "#6904EC" : "#6904EC1A",
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
        <View style={{marginTop:20, marginBottom:100}}>
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
                <Text style={{ fontWeight: "600", fontSize: 20, color:"#2B025F", marginTop:60 }}>
                  No Order History
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
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
