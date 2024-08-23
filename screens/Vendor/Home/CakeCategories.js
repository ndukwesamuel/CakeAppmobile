import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_vendor_Cake_Fun } from "../../../Redux/Buyer/VendorSlice";
import ReuseModals from "../../../components/shared/ReuseModals";
import {
  Current_vendor_profile_Fun,
  UserProfile_Fun,
} from "../../../Redux/AuthSlice";
import { ImageCard } from "../../Buyer/Home.js/CakeCategories";
import { useNavigation } from "@react-navigation/native";

const CakeCategories = () => {
  const dispatch = useDispatch();
  const get_vendor_Cake_data = useSelector(
    (state) => state?.VendorSlice?.get_vendor_Cake_data
  );
  const { user_profile_data, user_data, current_vendor_profile_data } =
    useSelector((state) => state.Auth);

  console.log({
    ksss: current_vendor_profile_data?.vendorProfile?._id,
  });
  let user = {};

  //   Cake Categories
  const statuses = [
    "Anniversary",
    "Birthday",
    "Wedding",
    "Customized",
    "cupcake",
  ];
  const [updateModal, setUpdateModal] = useState(false);

  const [option, setOption] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or some async operation
    setTimeout(() => {
      setRefreshing(false);
      setOption("");
    }, 2000);
  };
  useEffect(() => {
    dispatch(
      Get_vendor_Cake_Fun({
        option,
        vendorId: current_vendor_profile_data?.vendorProfile?._id, //user_data?.user?.id, //user_profile_data?.user?.id,
      })
    );

    dispatch(UserProfile_Fun());
    dispatch(Current_vendor_profile_Fun());

    return () => {};
  }, [option]);
  const [activeStatus, setActiveStatus] = useState(null);

  const handlePress = (status) => {
    setActiveStatus(status);

    // console.log({
    //   status1: status,
    // });

    let status_small_letter = status.split(" ")[0].toLowerCase();

    // console.log({
    //   status: status_small_letter,
    // });

    setOption(status_small_letter);
  };

  const handleColsemodal = () => {
    setOption("");
    setUpdateModal(false);
  };
  return (
    <View>
      {/* <ReuseModals visible={updateModal} onclose={handleColsemodal}> */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 15,
          marginTop: 20,
          borderRadius:10
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={statuses}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    borderRadius: 40,
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    paddingVertical: 5,
                    backgroundColor:
                      item === activeStatus ? "#DD293E" : "#FFF0F0",
                  }}
                  onPress={() => handlePress(item)}

                  // onPress={() => handlePress(item.split(" ")[0].toLowerCase())}
                >
                  <Text
                    style={{
                      color: item === activeStatus ? "#fff" : "#DD293E",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{}}>
            <FlatList
              data={get_vendor_Cake_data?.cakes}
              renderItem={({ item }) => (
                <ImageCard item={item} onclose={handleColsemodal} />
              )}
              keyExtractor={(item) => item._id}
              numColumns={2} // Set the number of columns per row
              key={2} // Change key prop to force re-render if necessary
              contentContainerStyle={{
                gap: 10,
              }}
              columnWrapperStyle={{
                justifyContent: "space-between",
                paddingHorizontal: 10,
                gap: 10,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    marginTop: 20
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    No Cakes Available
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </View>
      {/* </ReuseModals> */}
    </View>
  );
};

export default CakeCategories;
//
