import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AppScreenThree from "../../../components/shared/AppScreenThree";

const CakeDetails = () => {
  const dispatch = useDispatch();
  const cakeData = useRoute()?.params;
  //   const { get_single_cake_data } = useSelector((state) => state.CakeSlice);
  console.log({ 1111111: cakeData.item });

  return (
    <AppScreenThree arrrow={"true"}>
    <ScrollView
     style={style.container} keyboardShouldPersistTaps="handled">
      {/* image container */}
      <View style={style.imageContainer}>
        <Image
          source={{ uri: cakeData?.item?.images[0]?.url }}
          style={{
            width: "100%",
            height: 150,
            resizeMode: "stretch",
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
              resizeMode: "stretch",
              borderBottomLeftRadius: 12,
            }}
          />
          <Image
            source={{ uri: cakeData?.item?.images[2]?.url }}
            style={{
              width: "50%",
              height: 90,
              resizeMode: "stretch",
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
            <Text style={{color:"#090765", fontSize:16, fontWeight:"600"}}>{cakeData?.item?.name}</Text>
            <Text style={{color:"#2B025F", fontSize:16, fontWeight:"700"}}>{cakeData?.item?.price}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={style.text}>Size</Text>
            <Text style={style.text}>{cakeData?.item?.cakeSize}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth:0.5, borderBottomWidth:0.5, borderColor:"#00000033", paddingVertical:15 }}
          >
            <Text style={style.text}>Layers</Text>
            <Text style={style.text}>{cakeData?.item?.numberOfLayers}</Text>
          </View>
          <TouchableOpacity style={style.button} onPress={()=> navigation.navigate('additionalInformation', {cakeData})}>
            <Text style={{textAlign:"center", color:"white"}}>Order</Text>
          </TouchableOpacity>
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
    gap:24,
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
    gap:16
  },
  button: {
    backgroundColor: "#6904EC",
    borderRadius: 30,
    paddingHorizontal: 37,
    paddingVertical: 15,
    marginTop:30
  },
  text:{
    fontSize:16,
    fontWeight:"400",
    color:"#2B025F"
  }
});
