import {
    ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utills/DateTime";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function AdditionalInfo() {
  const navigaton = useNavigation();
  const cakeData = useRoute()?.params?.cakeData;
  const { user_data } = useSelector((state) => state.Auth);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cakeText, setCakeText] = useState("");
  const [address, setAddress] = useState("");
  const [price, setprice] = useState("");

  console.log({ dataRoute: cakeData, userdata: user_data });

  // Function to show the Date Picker
  const showDatepicker = () => {
    setShow(true);
  };

  // Function to handle date selection
  const onChange = (event, selectedDate) => {
    setShow(false); // Hide the picker once a date is selected
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDate(formatDate(selectedDate)); // Format and set the selected date
    }
  };

  useEffect(() => {
    const totalPrice = cakeData.price * quantity;
    setprice(totalPrice);
    return () => {};
  }, [quantity]);

  const Order_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/order`;

      let data = {
        cakeId: cakeData?._id,
        customized: true,
        cakeText: cakeText,
        quantity: quantity,
        deliveryDate: selectedDate,
        address: address,
      };
      console.log({
        url,
      });

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
        navigaton.navigate("categoryCakes");
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
  const handleCheckout = () => {
    if (address == "" || selectedDate == "") {
      Toast.show({
        type: "error",
        text1: "Fill all the input fields",
      });
    } else {
      Order_Mutation.mutate();
    }
  };
  return (
    <AppScreenThree arrrow={"true"} title={"Additional Information"}>
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cake Text</Text>
            <TextInput
              style={styles.input}
              value={cakeText}
              onChangeText={setCakeText}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date of Delivery</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.input}>
              <Text>{selectedDate ? selectedDate : "Select a Date"}</Text>
            </TouchableOpacity>

            {/* Date Picker */}
            {show && (
              <DateTimePicker
                value={date}
                mode="date" // Can be "time" or "date" or "datetime"
                display="default" // Choose between "spinner", "calendar", etc. for Android
                onChange={onChange} // Handle date change
              />
            )}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <View
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //   paddingHorizontal: 10,
                },
              ]}
            >
              <Text>{quantity}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.actionButtons}
                  onPress={() => setQuantity(quantity - 1)}
                >
                  <Text style={styles.actionTexts}>-</Text>
                </TouchableOpacity>
                <Text style={styles.actionTexts}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.actionButtons}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.actionTexts}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Number of Layers</Text>
            <Text style={styles.input}>{cakeData?.numberOfLayers}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          </View>
        </View>
        <View style={styles.pricingContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Total</Text>
            <Text>{price}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCheckout}>
            {Order_Mutation?.isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.buttonText}>Checkout</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    paddingBottom: 40,
    // gap:2
    // marginBottom:60
  },
  formContainer: {
    backgroundColor: "white",
    padding: 28,
    gap: 24,
  },
  inputGroup: {
    gap: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#4C060E",
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  inputLabel: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "400",
  },
  actionButtons: {
    paddingHorizontal: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    height: 30,
    paddingVertical: 5,
  },
  actionTexts: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  pricingContainer: {
    backgroundColor: "white",
    padding: 28,
    gap: 20,
    marginVertical: 40,
    paddingBottom: 50,
  },
  button: {
    backgroundColor: "#6904EC",
    borderRadius: 30,
    paddingHorizontal: 37,
    paddingVertical: 15,
    // marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
