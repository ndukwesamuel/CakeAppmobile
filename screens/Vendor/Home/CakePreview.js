import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";

const cakeImg = require("../../../assets/cakeImages/cake.png");
import { useRoute } from "@react-navigation/native";

const CakePreview = () => {
  const route = useRoute();
  const { formData } = route.params;
  return (
    <AppScreenTwo arrrow={"true"}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: "700" }}>Cake Details</Text>
        <Image
          source={formData?.images[0] || cakeImg}
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
          <Pressable style={styles.button}>
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
