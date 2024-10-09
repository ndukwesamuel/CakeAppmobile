import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { formatDate } from "../../../utills/DateTime";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";

export default function OngoingModal({ item }) {
  const [openModal, setOpenModal] = useState(false);
  const [openDeliveredModal, setOpenDeliveredModal] = useState(false);
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);

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
        // Toast.show({
        //   type: "success",
        //   text1: `${success?.data?.message}`,
        // });
        setOpenDeliveredModal(!openDeliveredModal);
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

  const handleMarkAsDelivered = () => {
    const formData = {
      status: "completed",
    };
    updateOrder_Mutation.mutate({ formData, token });
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
                  style={styles.button}
                  onPress={handleMarkAsDelivered}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    Mark as Delivered
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={openDeliveredModal}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback
          onPress={() => setOpenDeliveredModal(!openDeliveredModal)}
        >
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
                <Text
                  style={{
                    textAlign: "center",
                    color: "#2B025F",
                    fontSize: 24,
                    fontWeight: "600",
                  }}
                >
                  Marked Delivered
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#2B025F",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  Your order has been marked delivered, we await buyers
                  confirmation
                </Text>
                <Pressable
                  style={[styles.button, { backgroundColor: "#6904EC" }]}
                  onPress={() => setOpenDeliveredModal(!openDeliveredModal)}
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
    backgroundColor: "#6904EC",
    marginTop: 30,
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
});
