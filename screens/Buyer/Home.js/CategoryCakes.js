import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreen from "../../../components/shared/AppScreen";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Cake_Fun } from "../../../Redux/Buyer/CakeSlice";

export default function CategoryCakes() {
  const dispatch = useDispatch();
  const { get_all_cake_data } = useSelector((state) => state.CakeSlice);
  const dataRoute = useRoute()?.params;
  const [option, setoption] = useState("");
  //   console.log({ route: dataRoute });

  useEffect(() => {
    setoption(dataRoute?.item?.name);
    dispatch(Get_All_Cake_Fun(dataRoute?.item?.name));
    return () => {};
  }, [dataRoute]);
  //   console.log({ option: option });
  //   console.log({ data: get_all_cake_data?.data?.cakes });
  return (
    <AppScreenThree arrrow={"true"} title={dataRoute?.item?.name}>
      <View style={styles.container} id="container">
        <FlatList
          data={get_all_cake_data?.data?.cakes}
          renderItem={({ item }) => <ImageCard item={item} />}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <View>
              <Text>No cakes under this category </Text>
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
  },
});

const ImageCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles2.container}>
      <Image source={{ uri: item.images[0].url }} style={styles2.image} />
      <View style={{ flexDirection: "column", gap: 20, padding: 15 }}>
        <Text style={styles2.cardTitle}>{item?.name}</Text>
        <Text style={styles2.description}>{item.description}</Text>
        <Text style={styles2.cardTitle}>{item.price}</Text>
        <Pressable
          style={styles2.button}
          onPress={() => navigation.navigate("cakeDetails", { item })}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Place Order
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("wishlist")}>
          <Text
            style={{
              textAlign: "center",
              textDecorationLine: "underline",
              fontWeight: "500",
              fontSize: 14,
              color: "#2B025F",
            }}
          >
            Add to Wishlist
          </Text>
        </Pressable>
      </View>
    </TouchableOpacity>
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
  },
  cardTitle: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    color: "#2B025F",
    fontSize: 12,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#6904EC",
    borderRadius: 30,
    paddingHorizontal: 37,
    paddingVertical: 15,
  },
});
