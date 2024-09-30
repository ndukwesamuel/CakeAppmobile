import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import React, { useState } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useRoute } from "@react-navigation/native";
import { formatDate } from "../../../utills/DateTime";

export default function OrderDetails() {
  const dataRoute = useRoute().params;
  console.log({ dataaaaa: dataRoute?.data });

  return (
    <AppScreenThree arrrow={"true"} title={dataRoute?.title}>
      <View style={styles.container}>
        <FlatList
          data={dataRoute?.data}
          renderItem={({ item }) => <RenderItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
          ListEmptyComponent={
            <View>
              <Text style={{ textAlign: "center" }}>No Orders yet.</Text>
            </View>
          }
        />
      </View>
    </AppScreenThree>
  );
}

const RenderItem = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);

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
      <Pressable onPress={() => setOpenModal(true)}>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Content */}
            <View
              style={{ backgroundColor: "white", padding: 20, width: "100%", gap:10 }}
            >
              <Text style={styles.title}>{item.cake.name}</Text>
              <View style={{gap:17}}>
                <View style={{gap:8}}>
                  <Text style={styles.subtitle}>Cake Description</Text>
                  <Text>{item?.cake?.description}</Text>
                </View>
                <View style={{gap:8}}>
                  <Text style={styles.subtitle}>Address</Text>
                  <Text>{item.address}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => setOpenModal(false)}
                style={[styles.button, { backgroundColor: "#6904EC" }]}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Accept Offer
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setOpenModal(false)}
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
    padding: 10,
  },
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
});
