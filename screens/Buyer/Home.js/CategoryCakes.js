import {
  ActivityIndicator,
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
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
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
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const Wish_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/wishlist`;

      let data = {
        cakeId: item?._id,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
        // navigaton.navigate("categoryCakes");
        navigation.goBack();
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
        <Pressable onPress={() => Wish_Mutation.mutate()}>
          {Wish_Mutation.isLoading ? (
            <ActivityIndicator size="small" color="blue"/>
          ) : (
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
          )}
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
