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
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_All_Cake_Fun,
  Get_All_Categories_Fun,
} from "../../../Redux/Buyer/CakeSlice";
import { truncateDescription } from "../../../utills/Word";
import { useNavigation } from "@react-navigation/native";

const data = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },

  // Add more items as needed
];
const statuses = [
  "Anniversary",
  "Birthday",
  "Wedding",
  "Customized",
  "cupcake",
];

const CakeCategories = () => {
  const { get_all_vendor_data } = useSelector((state) => state.VendorSlice);

  const { get_all_cake_data } = useSelector((state) => state.CakeSlice);
  const { get_all_categories_data } = useSelector((state) => state.CakeSlice);
  const [option, setOption] = useState("");
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // console.log({ cakesssss: get_all_cake_data?.data?.cakes });

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or some async operation
    setTimeout(() => {
      setRefreshing(false);
      setOption("");
    }, 2000);
  };

  useEffect(() => {
    dispatch(Get_All_Categories_Fun());
    dispatch(Get_All_Cake_Fun(option));

    return () => {};
  }, [option]);

  // useEffect(() =>{
  //   dispatch(Get_All_Categories_Fun());

  //   return () => {}
  // }, [])

  // console.log({ categories: get_all_categories_data?.data?.categories });

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

  // Get the component to display based on active status

  return (
    <View style={styles.container}>
      {/* <StatusList /> */}

      {/* <View style={{ flexDirection: "row" }}>
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
                paddingVertical: 5,
                backgroundColor: item === activeStatus ? "#DD293E" : "#FFF0F0",
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
      </View> */}
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={get_all_categories_data?.data?.categories}
          renderItem={({ item }) => <ImageCard item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={2} // Set the number of columns per row
          key={2} // Change key prop to force re-render if necessary
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{
            justifyContent: "space-between",
            // paddingHorizontal: 10,
            gap: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyComponent}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                No Categories Available
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    gap: 20,
    paddingHorizontal:10
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyComponent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default CakeCategories;

export const ImageCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: "48%",
        // height: 125,
        paddingVertical:35,
        backgroundColor: "white",
      }}
      onPress={() => navigation.navigate("categoryCakes", { item })}
    >
      <View style={{flexDirection:"column", gap:10, alignItems:"center", justifyContent:"center"}}>
        <Image source={require("../../../assets/icons/cake.png")} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
            color: "#020D44",
            textTransform:"capitalize"
          }}
        >
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
