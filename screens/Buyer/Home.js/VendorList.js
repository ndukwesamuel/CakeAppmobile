import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const data = [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
  { id: "4", name: "Item 4" },
  { id: "5", name: "Item 5" },

  // Add more items as needed
];

const CircularItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("VendorDetails", item)}
    >
      <View style={styles.circle}>
        <Image
          source={{
            uri: item?.userProfile?.image, // "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1bGGi3JK4IknHua3xDucgbe1ah0T2s2aQcm6AeXC5jEgRKKBz",
          }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <Text style={{ textAlign: "center" }}>{item?.businessName}</Text>
    </TouchableOpacity>
  );
};

const VendorList = () => {
  const { get_all_vendor_data } = useSelector((state) => state.VendorSlice);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or some async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={get_all_vendor_data?.vendors}
        renderItem={({ item }) => <CircularItem item={item} />}
        keyExtractor={(item) => item._id}
        numColumns={3} // Set the number of columns per row
        key={3} // Change key prop to force re-render if necessary
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyComponent}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              No Vendors Available
            </Text>
          </View>
        }
      />
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
    paddingHorizontal: 10,
    alignItems: "center",
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

export default VendorList;
