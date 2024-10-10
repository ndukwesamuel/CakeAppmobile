import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { formatDate } from "../../../utills/DateTime";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Get_All_Order_HIstory_Fun } from "../../../Redux/Vendor/OrderSlice";
// import Modal from "../../../components/Modal";

export default function RequestModal({ item }) {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
  const [openModal, setOpenModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [reason, setReason] = useState("");

  const updateOrder_Mutation = useMutation(
    async ({ formData, token }) => {
      try {
        const response = await axios.patch(
          `https://cake-app-server.onrender.com/api/v1/vendor/order/${item._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        // console.log({ applicationform: error });
        throw error;
      }
    },
    {
      onSuccess: (success) => {
        dispatch(Get_All_Order_HIstory_Fun());
        Toast.show({
          type: "success",
          text1: `Status successfully updated`,
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

  const handleAcceptOffer = () => {
    const formData = {
      status: "accepted",
    };
    updateOrder_Mutation.mutate({ formData, token });
    // setOpenModal(!openModal);
  };

  const handleRejectOffer = () => {
    if (reason !== "") {
      const formData = {
        status: "rejected",
        reason: reason,
      };
      updateOrder_Mutation.mutate({ formData, token });
      // setOpenModal(!openModal);
      // setRejectModal(!rejectModal);
    } else {
      Toast.show({
        type: "error",
        text1: "Pls add reason for rejection",
      });
    }
  };
  return (
    <View style={styles.container2}>
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.key}>Cake Name</Text>
          <Text style={styles.value}>{item?.cake?.name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.key}>Date Order</Text>
          <Text style={styles.value}>{formatDate(item?.createdAt)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.key}>Delivery Date</Text>
          <Text style={styles.value}>{formatDate(item?.deliveryDate)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.key}>Price</Text>
          <Text style={styles.value}>{item?.totalPrice}</Text>
        </View>
      </View>
      <Pressable onPress={() => setOpenModal(!openModal)}>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "#6904EC",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          View
        </Text>
      </Pressable>

      <Modal visible={openModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setOpenModal(!openModal)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Modal Content */}
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  width: "100%",
                  gap: 10,
                }}
              >
                <Text style={styles.title}>{item?.cake?.name}</Text>
                <View style={{ gap: 17 }}>
                  <View style={{ gap: 8 }}>
                    <Text style={styles.subtitle}>Cake Description</Text>
                    <Text>{item?.cake?.description}</Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    <Text style={styles.subtitle}>Cake Text</Text>
                    <Text>{item?.cakeText}</Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    <Text style={styles.subtitle}>Quantity</Text>
                    <Text>{item?.quantity}</Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    <Text style={styles.subtitle}>Address</Text>
                    <Text>{item?.address}</Text>
                  </View>
                </View>
                <Pressable
                  onPress={handleAcceptOffer}
                  style={[styles.button, { backgroundColor: "#6904EC" }]}
                >
                  {updateOrder_Mutation.isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Accept Offer
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={() => setRejectModal(!rejectModal)}
                  style={[
                    styles.button,
                    {
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: "#6904EC",
                    },
                  ]}
                >
                  <Text style={{ textAlign: "center", color: "#2B025F" }}>
                    Reject Offer
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* accept offer modal */}
      <Modal visible={acceptModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setAcceptModal(!acceptModal)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  width: "100%",
                  gap: 20,
                  paddingVertical: 50,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#2B025F",
                    fontSize: 24,
                    fontWeight: "600",
                  }}
                >
                  Offer Accepted
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#2B025F",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  You have accepted this offered, Kindly proceed to baking the
                  cake
                </Text>
                <Pressable
                  style={[styles.button, { backgroundColor: "#6904EC" }]}
                  onPress={() => setAcceptModal(!acceptModal)}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Okay
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Reject modal */}
      <Modal visible={rejectModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setRejectModal(!rejectModal)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  width: "100%",
                  gap: 20,
                  paddingVertical: 50,
                }}
              >
                <Text style={styles.title}>Reason for Rejection</Text>
                <TextInput
                  style={styles.input}
                  value={reason}
                  onChangeText={(text) => setReason(text)}
                />
                <Pressable
                  style={[styles.button, { backgroundColor: "#6904EC" }]}
                  onPress={handleRejectOffer}
                >
                  {updateOrder_Mutation.isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Submit
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    gap: 20,
  },
  key: {
    color: "#2B025F",
    fontSize: 14,
    fontWeight: "400",
  },
  value: {
    color: "#2B025F",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#F0F9FF",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  title: {
    color: "#020D44",
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    color: "#292D32",
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    height: 250,
    borderColor: "#4C060E",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
  },
});
