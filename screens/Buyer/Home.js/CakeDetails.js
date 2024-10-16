import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Get_Single_Cake_Fun,
  reset_Get_Single_Cake_Fun,
} from "../../../Redux/Buyer/CakeSlice";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import {
  formatDate,
  formatDateString,
  formatTime,
} from "../../../utills/DateTime";
import { Forminput } from "../../../components/shared/InputForm";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { formatToCurrency } from "../../../utills/Currency";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const CakeDetails = () => {
  const navigation = useNavigation();
  const dataroute = useRoute()?.params;
  const cakeData = dataroute?.item;

  const { get_single_cake_data } = useSelector((state) => state.CakeSlice);
  const dispatch = useDispatch();
  const [preview, setpreview] = useState(false);

  return (
    <AppScreenThree arrrow={"true"}>
      <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
        {/* image container */}
        <View style={style.imageContainer}>
          <Image
            source={{ uri: cakeData?.images[0]?.url }}
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
              source={{ uri: cakeData?.images[1]?.url }}
              style={{
                width: "50%",
                height: 90,
                resizeMode: "stretch",
                borderBottomLeftRadius: 12,
              }}
            />
            <Image
              source={{
                uri:
                  cakeData?.images[2]?.url ||
                  "https://example.com/placeholder.png",
              }}
              alt="Image 3"
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
            <Text style={style.title}>{cakeData?.name} cake</Text>
            <Text style={style.description}>{cakeData?.description}</Text>
          </View>
          <View style={style.pricingContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ color: "#090765", fontSize: 16, fontWeight: "600" }}
              >
                {cakeData?.name}
              </Text>
              <Text
                style={{ color: "#2B025F", fontSize: 16, fontWeight: "700" }}
              >
                {formatToCurrency(cakeData?.price)} 
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={style.text}>Size</Text>
              <Text style={style.text}>{cakeData?.cakeSize}</Text>
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
              <Text style={style.text}>{cakeData.numberOfLayers}</Text>
            </View>
            <TouchableOpacity
              style={style.button}
              onPress={() =>
                navigation.navigate("additionalInformation", { cakeData })
              }
            >
              <Text style={{ textAlign: "center", color: "white" }}>Order</Text>
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
    gap: 24,
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
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B025F",
  },
});
