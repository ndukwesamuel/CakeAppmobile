import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";

const cakeImg = require("../../../assets/cakeImages/cake.png");
import { useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import AppScreenThree from "../../../components/shared/AppScreenThree";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const CakePreview = () => {
  const route = useRoute();
  const { formData, edit, id } = route.params;
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
  // console.log({token:token})a
  console.log({ formData: formData.images });

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
  const handleSubmit = () => {
    UploadCake_Mutation.mutate({ formData, token });
  };

  const updateCake_Mutation = useMutation(
    async ({ formData, token }) => {
      try {
        const response = await axios.patch(
          `https://cake-app-server.onrender.com/api/v1/vendor/cake/${id}`,
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
          text1: `${success?.data?.message}`,
        });
      },
      onError: (error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );

  const handleUpdate = () => {
    updateCake_Mutation.mutate({formData, token})
  };

  return (
    <AppScreenThree arrrow={"true"} title={"Preview"}>
      <View style={styles.container}>
        {/* <Text style={{ fontSize: 32, fontWeight: "700" }}>Cake Details</Text> */}
        <Image
          source={{ uri: formData?.images[0].url }}
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
          {edit ? (
            <Pressable style={styles.button} onPress={handleUpdate}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                Update
              </Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={handleSubmit}>
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
          )}
        </View>
      </View>
    </AppScreenThree>
  );
};

export default CakePreview;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    top: 60,
    flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#6904EC",
    borderRadius: 42,
    top: 80,
  },
});
