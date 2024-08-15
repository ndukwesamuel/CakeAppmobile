import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OrderHistory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Order</Text>
        <View style={{ gap: 3 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12 }}>Date</Text>
            <Text style={{ fontSize: 12 }}>Time</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Nov 24, 2024
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>4:00PM</Text>
          </View>
          <Text style={styles.border}></Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>Vendor</Text>
            <Text style={{ fontSize: 12 }}>Name of Cake</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Cake 'n' bake
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Vanilla swirl cake
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.textGroup}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Order</Text>
        <View style={{ gap: 3 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12 }}>Date</Text>
            <Text style={{ fontSize: 12 }}>Time</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Nov 24, 2024
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>4:00PM</Text>
          </View>
          <Text style={styles.border}></Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>Vendor</Text>
            <Text style={{ fontSize: 12 }}>Name of Cake</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Cake 'n' bake
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>
              Vanilla swirl cake
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.textGroup}>
        <Text style={{ fontSize:16, fontWeight: "600" }}>Order</Text>
        <View style={{gap:3}}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{fontSize:12,}}>Date</Text>
            <Text style={{fontSize:12,}}>Time</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{fontSize:12, fontWeight:"500"}}>Nov 24, 2024</Text>
            <Text style={{fontSize:12, fontWeight:"500"}}>4:00PM</Text>
          </View>
          <Text style={styles.border}></Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", marginTop:5 }}
          >
            <Text style={{fontSize:12,}}>Vendor</Text>
            <Text style={{fontSize:12,}}>Name of Cake</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{fontSize:12, fontWeight:"500"}}>Cake 'n' bake</Text>
            <Text style={{fontSize:12, fontWeight:"500"}}>Vanilla swirl cake</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    paddingTop: 40,
  },
  textGroup: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical:20,
    gap: 5,
    borderRadius: 8,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#292D32",
    height: 0,
  },
});
