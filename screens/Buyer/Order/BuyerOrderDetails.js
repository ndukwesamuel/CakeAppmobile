import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
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
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";

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
import {
  Get_single__Order_HIstory_Fun,
  reset_Get_Single_Order_HIstory_Fun,
} from "../../../Redux/Buyer/OrderSlice";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const BuyerOrderDetails = () => {
  const dataroute = useRoute()?.params;

  const { get_single_cake_data } = useSelector((state) => state.CakeSlice);

  const dispatch = useDispatch();

  const [preview, setpreview] = useState(false);

  useEffect(() => {
    dispatch(Get_single__Order_HIstory_Fun(dataroute?.item?._id));
    return () => {
      dispatch(reset_Get_Single_Order_HIstory_Fun());
    };
  }, []);

  return (
    <AppScreenTwo arrrow={"true"}>
      {preview ? (
        <Preview data1={preview} setdata1={setpreview} />
      ) : (
        <Details data1={preview} setdata1={setpreview} />
      )}
    </AppScreenTwo>
  );
};

const Details = ({ data1, setdata1 }) => {
  const { get_single_cake_data } = useSelector((state) => state.CakeSlice);
  const { get_single_order_history_data } = useSelector(
    (state) => state.OrderSlice
  );

  const { user_data } = useSelector((state) => state.Auth);

  console.log({
    dataroute: get_single_order_history_data?.order?.status,
  });

  const [paystackInfo, setPaystackInfo] = useState(null);

  console.log({
    paystackInfo,
  });

  const StartPAy = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/order/pay/${get_single_order_history_data?.order?._id}`;

      console.log({
        url,
        datas: get_single_order_history_data?.order?._id,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.user?.token}`,
        },
      };

      return axios.post(url, {}, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          sa: success?.data,
        });

        setPaystackInfo(success?.data?.authorizationUrl);
        Toast.show({
          type: "success",
          text1: `success `,
        });
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
    <>
      {get_single_order_history_data ? (
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          {paystackInfo ? (
            <WebView
              style={{
                flex: 1,
              }}
              source={{ uri: paystackInfo }}
            />
          ) : (
            <ScrollView contentContainerStyle={{}}>
              <Text style={styles.title}>Order Details</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Cake:</Text>
                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.cake?.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Cake Text:</Text>

                <Text style={styles.value}>
                  {get_single_order_history_data?.order.cakeText}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Quantity:</Text>

                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.quantity}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Commission:</Text>
                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.commission}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Total Price:</Text>
                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.totalPrice}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Payment Status:</Text>
                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.paymentStatus}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Order Status:</Text>
                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.status}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Vendor:</Text>
                <Text style={styles.value}>
                  {get_single_order_history_data?.order?.vendor.businessName}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>Delivery Date:</Text>
                <Text style={styles.value}>
                  {new Date(
                    get_single_order_history_data?.order?.deliveryDate
                  ).toLocaleDateString()}
                </Text>
              </View>

              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>
                {get_single_order_history_data?.order?.address}
              </Text>

              {get_single_order_history_data?.order?.status === "accepted" && (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20,
                  }}
                >
                  <View style={{ width: "80%", gap: 40 }}>
                    {StartPAy.isLoading ? (
                      <ActivityIndicator color="red" size={29} />
                    ) : (
                      <TouchableOpacity
                        style={styles.orderButton}
                        onPress={() => {
                          // setdata1(true);
                          StartPAy.mutate();
                        }}
                      >
                        <Text style={styles.buttonText}>PAY</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            <ActivityIndicator size="large" color="#860B34" />
          </Text>
        </View>
      )}
    </>
  );
};

const Preview = ({ data1, setdata1 }) => {
  const { get_single_cake_data } = useSelector((state) => state.CakeSlice);
  const { user_data } = useSelector((state) => state.Auth);

  const { control, handleSubmit, watch } = useForm();
  const [endDate, setEndDate] = useState(new Date());

  const [forminput, setForminput] = useState(true);

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    // setShowEndPicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const [name, setName] = useState("");

  const [quantity, setQuantity] = useState("");

  const [address, setAddress] = useState("");

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [showEndPicker, setShowEndPicker] = useState(false);

  const toggleEndPicker = () => {
    setShowEndPicker(!showEndPicker);
  };

  const Order_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/order`;

      let datas = {
        cakeId: get_single_cake_data?.cake?._id, // "669e7d268268ee783fdf2aa8",
        customized: true,
        cakeText: name,
        quantity: quantity,
        deliveryDate: formatDate(endDate),
        address: address,
      };
      console.log({
        url,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.user?.token}`,
        },
      };

      return axios.post(url, datas, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });

        setdata1(false);
      },

      onError: (error) => {
        console.log({
          error: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  return (
    <>
      {forminput ? (
        <View
          style={{
            flex: 1,
            padding: 20,

            marginTop: 20,
          }}
        >
          <View>
            <Text style={styles.label}>Cake Text:</Text>

            <Forminput placeholder="Name" onChangeText={setName} value={name} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Date of Delivery:</Text>

            <TouchableOpacity
              style={{
                // borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                fontSize: 16,
                //   backgroundColor: "#F6F8FAE5",
                borderWidth: 1,
                // opacity: 0.4
              }}
              onPress={toggleEndPicker}
            >
              <Text>{formatDateString(endDate)}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                testID="endDateTimePicker"
                value={endDate}
                mode="date"
                //   is24Hour={true}
                display="calendar"
                onChange={onEndChange}
              />
            )}
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text style={styles.label}>Date of Time:</Text>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                fontSize: 16,
                //   backgroundColor: "#F6F8FAE5",
                // opacity: 0.4
              }}
              onPress={toggleEndPicker}
            >
              <Text>{formatDateString(endDate)}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                testID="endDateTimePicker"
                value={endDate}
                mode="time"
                is24Hour={true}
                display="clock"
                onChange={onEndChange}
              />
            )}
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.label}>Quantity:</Text>

            <Forminput
              placeholder="Enter quantity"
              onChangeText={setQuantity}
              value={quantity}
              keyboardtype="numeric"
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.label}>Address:</Text>

            <Forminput
              placeholder="Enter address"
              onChangeText={setAddress}
              value={address}
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={{ width: "80%", gap: 40 }}>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => {
                  if (
                    name == "" ||
                    quantity == "" ||
                    address == "" ||
                    endDate == ""
                  ) {
                    Toast.show({
                      type: "error",
                      text1: "Please fill all the fields",
                    });
                  } else {
                    setForminput(false);
                  }
                }}
              >
                <Text style={styles.buttonText}>Preview</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            padding: 20,

            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
            }}
          >
            Preview Order
          </Text>

          <View
            style={{
              width: "90%",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#4A0033",
                }}
              >
                Cake Name:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A0033",
                  marginBottom: 10,
                }}
              >
                {name}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#4A0033",
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A0033",
                  marginBottom: 10,
                }}
              >
                {formatDate(endDate)}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#4A0033",
                }}
              >
                Time
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A0033",
                  marginBottom: 10,
                }}
              >
                {formatTime(endDate)}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#4A0033",
                }}
              >
                Quantity
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A0033",
                  marginBottom: 10,
                }}
              >
                {quantity}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#4A0033",
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#4A0033",
                  marginBottom: 10,
                }}
              >
                ₦ {get_single_cake_data?.cake?.price * quantity}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#4A0033",
              }}
            >
              Address:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#4A0033",
                marginBottom: 10,
              }}
            >
              {address}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            {Order_Mutation?.isLoading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <View style={{ width: "80%", gap: 40 }}>
                <TouchableOpacity
                  style={styles.orderButton}
                  onPress={() => {
                    Order_Mutation.mutate();
                    //   setForminput(false);
                  }}
                >
                  <Text style={styles.buttonText}>Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.customizeButton}
                  onPress={() => {
                    setForminput(true);
                  }}
                >
                  <Text style={styles.customizeText}>Edit Order</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageGrid: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
  image: {
    width: "30%",
    aspectRatio: 1, // Square images
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  descriptionContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    width: "70%",
    color: "#4C0016",
  },
  description: {
    fontSize: 14,
    color: "#860B34",
    textAlign: "justify",
    width: "90%",
  },
  sizePriceContainer: {
    padding: 10,
    backgroundColor: "#FFBFBF",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  sizeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DD293E",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: "#DD293E",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    // width: "40%",
    // justifyContent: "center",
    alignItems: "center",
  },
  customizeButton: {
    borderColor: "#DD293E",
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  customizeText: {
    color: "#DD293E",
    fontWeight: "bold",
    textAlign: "center",
  },

  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default BuyerOrderDetails;
