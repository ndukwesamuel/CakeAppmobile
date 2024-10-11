import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Current_vendor_profile_Fun } from "../../../Redux/AuthSlice";
import { Get_vendor_Cake_Fun } from "../../../Redux/Buyer/VendorSlice";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const CakeDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cakeData = useRoute()?.params;
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
  // const [openModal, setopenModal] = useState(false)
  const { user_data, current_vendor_profile_data } = useSelector(
    (state) => state?.Auth
  );
  useEffect(() => {
    dispatch(Current_vendor_profile_Fun());
    dispatch(
      Get_vendor_Cake_Fun({
        vendorId: current_vendor_profile_data?.data?.vendorProfile?._id, //user_data?.user?.id, //user_profile_data?.user?.id,
      })
    );
    return () => {};
  }, []);

  const Delete_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/vendor/cake/${data_info}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return axios.delete(url, config);
    },
    {
      onSuccess: (success) => {
        dispatch(
          Get_vendor_Cake_Fun({
            vendorId: current_vendor_profile_data?.data?.vendorProfile?._id, //user_data?.user?.id, //user_profile_data?.user?.id,
          })
        );
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
        navigation.navigate("product");
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );

  return (
    <AppScreenThree arrrow={"true"}>
      <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
        {/* image container */}
        <View style={style.imageContainer}>
          <Image
            source={{ uri: cakeData?.item?.images[0]?.url }}
            style={{
              width: "100%",
              height: 150,
              // resizeMode: "stretch",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              source={{ uri: cakeData?.item?.images[1]?.url }}
              style={{
                width: "50%",
                height: 90,
                // resizeMode: "stretch",
                borderBottomLeftRadius: 12,
              }}
            />
            <Image
              source={{ uri: cakeData?.item?.images[2]?.url }}
              style={{
                width: "50%",
                height: 90,
                // resizeMode: "stretch",
                borderBottomRightRadius: 12,
              }}
            />
          </View>
        </View>

        {/* cake details */}
        <View style={style.detailsContainer}>
          <View>
            <Text style={style.title}>{cakeData?.item?.name} cake</Text>
            <Text style={style.description}>{cakeData?.item?.description}</Text>
          </View>
          <View style={style.pricingContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ color: "#090765", fontSize: 16, fontWeight: "600" }}
              >
                {cakeData?.item?.name}
              </Text>
              <Text
                style={{ color: "#2B025F", fontSize: 16, fontWeight: "700" }}
              >
                {cakeData?.item?.price}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={style.text}>Size</Text>
              <Text style={style.text}>{cakeData?.item?.cakeSize}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: "#00000033",
                paddingVertical: 15,
              }}
            >
              <Text style={style.text}>Layers</Text>
              <Text style={style.text}>{cakeData?.item?.numberOfLayers}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: "#00000033",
                paddingVertical: 10,
              }}
            >
              <Text style={style.text}>Categories</Text>
              <Text style={[style.text, { textTransform: "capitalize" }]}>
                {cakeData?.item?.category}
              </Text>
            </View>
            {/* Active Buttons */}
            <View style={{ gap: 10 }}>
              <TouchableOpacity
                style={style.button}
                onPress={() =>
                  navigation.navigate("uploadProduct", { cakeData })
                }
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => Delete_Mutation.mutate(cakeData?.item?._id)}
              >
                {Delete_Mutation.isLoading ? (
                  <ActivityIndicator size="small" color="red" />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "400",
                      color: "#E70400",
                      textDecorationLine: "underline",
                    }}
                  >
                    Delete
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
};

export default CakeDetails;

const style = StyleSheet.create({
  container: {
    top: 60,
    marginBottom: 20,
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 15,
    gap: 10,
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 25,
    marginTop: 20,
    gap: 24,
    marginBottom: 40,
  },
  title: {
    color: "#2B025F",
    fontSize: 24,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B025F",
  },
  pricingContainer: {
    borderColor: "#00000033",
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 10,
    gap: 16,
  },
  button: {
    backgroundColor: "#6904EC",
    borderRadius: 30,
    paddingHorizontal: 37,
    paddingVertical: 15,
    // marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B025F",
  },
});
