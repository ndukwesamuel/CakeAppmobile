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
import { useNavigation } from "@react-navigation/native";

const CakeCategories = () => {
  const dispatch = useDispatch();
  const get_vendor_Cake_data = useSelector(
    (state) => state?.VendorSlice?.get_vendor_Cake_data
  );
  const user = useSelector((state) => state?.Auth?.user_profile_data?.user);
  console.log(user?.id);
  console.log(get_vendor_Cake_data);

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
        vendorId: user?.id,
      })
    );

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
            marginTop:20
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
                  <ImageCard item={item}/>
                )}
                keyExtractor={(item) => item?._id}
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
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListEmptyComponent={
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
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
export const ImageCard = ({ item }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        style={{
          width: "48%",
          height: 300,
          borderRadius: 15,
          overflow: "hidden",
          marginVertical: 10,
          elevation: 5, // Shadow for Android
          shadowColor: "#000", // Shadow for iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
        onPress={() => navigation.navigate("cakeDetails", { item })}
      >
        <ImageBackground
          source={{
            uri: item?.images[0]?.url, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
          }}
          style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: 10,
              borderRadius: 10,
              margin: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item?.name}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                marginTop: 5,
              }}
            >
              {truncateDescription(item?.description)}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({});
