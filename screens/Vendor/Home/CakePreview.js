import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";

const cakeImg = require("../../../assets/cakeImages/cake.png");
import { useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const CakePreview = () => {
  const route = useRoute();
  const { formData } = route.params;
  const token = useSelector((state) => state?.Auth?.user_data?.user?.token);

  const UploadCake_Mutation = useMutation(
    async ({ formData, token }) => {
      try {
        const response = await axios.post(
          `${API_BASEURL}v1/vendor/cake`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `Upload successfull`,
        });
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
    <AppScreenTwo arrrow={"true"}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: "700" }}>Cake Details</Text>
        <Image
          source={{ uri: formData?.images[0] }}
          style={{
            width: "95%",
            height: "35%",
            resizeMode: "stretch",
            top: 10,
          }}
        />
        <View
          style={{ backgroundColor: "white", padding: 20, top: 30, gap: 10 }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Cake Name</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {formData?.name}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Layers</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {formData?.numberOfLayers}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Size</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {formData?.cakeSize}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Category</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {formData?.category}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Price</Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {formData?.price}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Description</Text>
            <Text
              style={{
                textAlign: "right",
                fontSize: 16,
                fontWeight: 600,
                width: "50%",
              }}
            >
              {formData?.description}
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={UploadCake_Mutation.mutate({ formData, token })}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </AppScreenTwo>
  );
};

export default CakePreview;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 100,
    flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#DD293E",
    borderRadius: 42,
    top: 80,
  },
});
