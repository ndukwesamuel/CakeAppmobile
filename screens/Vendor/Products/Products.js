import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useDispatch, useSelector } from "react-redux";
import { Get_vendor_Cake_Fun } from "../../../Redux/Buyer/VendorSlice";
import { Current_vendor_profile_Fun } from "../../../Redux/AuthSlice";
import { useNavigation } from "@react-navigation/native";
import { formatToCurrency } from "../../../utills/Currency";

export default function Products() {
  const dispatch = useDispatch();
  const { user_data, current_vendor_profile_data } = useSelector(
    (state) => state?.Auth
  );
  const { get_vendor_Cake_data } = useSelector((state) => state?.VendorSlice);
  useEffect(() => {
    dispatch(Current_vendor_profile_Fun());
    dispatch(
      Get_vendor_Cake_Fun({
        vendorId: current_vendor_profile_data?.data?.vendorProfile?._id, //user_data?.user?.id, //user_profile_data?.user?.id,
      })
    );
    return () => {};
  }, []);

  console.log({ cakes: get_vendor_Cake_data?.data?.cakes });
  return (
    <AppScreenThree arrrow={"true"} title={"My Product"}>
      <View style={styles.container}>
        <FlatList
          data={get_vendor_Cake_data?.data?.cakes}
          renderItem={({ item }) => <ImageCard item={item} />}
          ListEmptyComponent={
            <View>
              <Text style={{ textAlign: "center" }}>
                No Products Uploaded Yet
              </Text>
            </View>
          }
        />
      </View>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 70,
    flex: 1,
  },
});

const ImageCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles2.container}>
      <Image source={{ uri: item?.images[0]?.url }} style={styles2.image} />
      <View style={{ flexDirection: "column", gap: 20, padding: 15 }}>
        <Text style={styles2.cardTitle}>{item?.name}</Text>
        <Text style={styles2.description}>{item?.description}</Text>
        <Text style={styles2.cardTitle}>{formatToCurrency(item?.price)}</Text>
        <Pressable
          style={styles2.button}
          onPress={() => navigation.navigate("cakeDetails", { item })}
        >
          <Text
            style={{
              color: "#6904EC",
              fontSize: 14,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            View
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: "#00000033",
    marginBottom: 10,
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode:"stretch"
  },
  cardTitle: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
  },
  description: {
    color: "#2B025F",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#6904EC0D",
    borderRadius: 30,
    paddingHorizontal: 37,
    paddingVertical: 15,
  },
});
