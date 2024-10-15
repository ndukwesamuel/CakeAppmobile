import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useDispatch, useSelector } from "react-redux";
import { Wishlist_Func } from "../../../Redux/Buyer/OrderSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist_data, wishlist_isLoading } = useSelector((state) => state?.OrderSlice);
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(Wishlist_Func());
    return () => {};
  }, []);

  // console.log({wishlist: wishlist_data?.wishlist?.items})

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    dispatch(Wishlist_Func());

    setRefreshing(false);

    // Simulate a network request or some async operation
  };

  const Wish_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/wishlist/${data_info}`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.delete(url, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
        dispatch(Wishlist_Func());
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
    <AppScreenThree arrrow={"true"} title={"Wishlist"}>
      {wishlist_isLoading? <ActivityIndicator color={"purple"} size={"small"} style={{marginTop:100}}/> :<View style={styles.container}>
        <FlatList
          data={wishlist_data?.wishlist?.items}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container2}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {console.log({
                  item: item?._id,
                })}
                <View
                  style={{
                    width: "90%",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item?.productId?.images?.length > 0
                          ? item?.productId?.images[0]?.url
                          : "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw",
                    }}
                    style={{
                      width: 50, // Updated width
                      height: 50, // Added height
                      borderRadius: 50,
                      resizeMode: "contain", // Ensures image fits the bounds
                    }}
                  />
                  <Text>{item?.productId?.name}</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ₦{item?.productId?.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    justifyContent: "flex-end", // Push the delete icon to the bottom
                    alignItems: "flex-end", // Align the icon to the right
                  }}
                  onPress={() => Wish_Mutation.mutate(item?.productId?._id)}
                >
                  {console.log({
                    gdgd: item?.productId?._id,
                  })}
                  <AntDesign name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center", // Center horizontally
              }}
            >
              <Text>No Item in Wish List </Text>
            </View>
          }
          contentContainerStyle={{
            gap: 10,
          }}
        />
      </View>}
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  container2: {
    borderColor: "#00000033",
    borderWidth: 0.5,
    gap: 12,
    padding: 16,
    borderRadius: 8,
  },
});

const renderItem = () => {
  return <View></View>;
};
