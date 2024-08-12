import React, { useEffect, useState } from "react";

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
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_Single_Vendor_Fun,
  Get_vendor_Cake_Fun,
} from "../../../Redux/Buyer/VendorSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Get_All_Cake_Fun } from "../../../Redux/Buyer/CakeSlice";
import { truncateDescription } from "../../../utills/Word";
import ReuseModals from "../../../components/shared/ReuseModals";
export default function VendorDetails() {
  const dispatch = useDispatch();
  const dataroute = useRoute()?.params;

  const { get_single_vendor_data, get_vendor_Cake_data } = useSelector(
    (state) => state.VendorSlice
  );
  console.log({
    // ddd: get_vendor_Cake_data,
    yyyyyy: dataroute, //get_single_vendor_data?.vendorProfile?._id,
    // kaka: get_single_vendor_data?.vendorProfile?.userProfile?._id,
  });

  useEffect(() => {
    dispatch(Get_Single_Vendor_Fun(dataroute?._id));

    return () => {};
  }, []);

  const cakeCategories = [
    {
      id: "1",
      title: "Anniversary Cakes",
      image: "anniversary-cake-image-url",
    },
    { id: "2", title: "Birthday Cakes", image: "birthday-cake-image-url" },
    { id: "3", title: "Wedding Cakes", image: "wedding-cake-image-url" },
  ];

  // this for ckaecategori remove if not needed
  const statuses = [
    "Anniversary",
    "Birthday",
    "Wedding",
    "Customized",
    "cupcake",
  ];
  const [updateModal, setUpdateModal] = useState(false);

  const { get_all_vendor_data } = useSelector((state) => state.VendorSlice);

  const { get_all_cake_data } = useSelector((state) => state.CakeSlice);
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
        vendorId: dataroute?._id,
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
    <AppScreenTwo arrrow="true">
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri:
                get_single_vendor_data?.vendorProfile?.userProfile?.image ||
                "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {get_single_vendor_data?.vendorProfile?.businessName}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            // padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 15,
            paddingVertical: 20,
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.profileStats}>Number Of Orders</Text>
            <Text style={styles.profileStats}>
              {get_single_vendor_data?.totalOrders || "null"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.profileStats}>Completed Orders</Text>

            <Text style={styles.profileStats}>
              {get_single_vendor_data?.totalOrders || "null"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.profileStats}>Years Of Experience</Text>

            <Text style={styles.profileStats}>
              {" "}
              {get_single_vendor_data?.totalOrders || "null"}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            {get_single_vendor_data?.vendorProfile?.businessDescription ||
              "No Description"}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={() => setUpdateModal(true)}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            View Categories of Cakes
          </Text>
        </TouchableOpacity>

        <ReuseModals visible={updateModal} onclose={handleColsemodal}>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 15,
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
        </ReuseModals>
      </View>
    </AppScreenTwo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEDEB",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileStats: {
    fontSize: 14,
    color: "#333",
  },
  descriptionSection: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cakeCard: {
    alignItems: "center",
    marginRight: 15,
  },
  cakeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  cakeTitle: {
    fontSize: 14,
    color: "#333",
  },
});

const ImageCard = ({ onclose, item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: "48%",
        height: 200,
        borderRadius: 15,
        overflow: "hidden",
        marginVertical: 10,
        elevation: 5, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      }}
      onPress={() => {
        onclose();
        navigation.navigate("cakeDetails", { item });
      }}
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
