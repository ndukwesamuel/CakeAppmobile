import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";

export default function Wallet() {
  return (
    <AppScreenThree arrrow={"true"} title={"Wallet"}>
      <ScrollView style={styles.container} contentContainerStyle={{ gap: 20 }}>
        <View style={[styles.SubContainer, { alignItems: "center" }]}>
          <Text style={{ color: "#020D44", fontSize: 16, fontWeight: "500" }}>
            Balance
          </Text>
          <Text style={{ fontSize: 32, fontWeight: "900" }}>2000</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", fontSize: 16 }}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        {/* Account Details */}
        <View style={[styles.SubContainer, {gap:30}]}>
          <Text style={styles.title}>Account Details</Text>
          <View style={{gap:8}}>
            <View style= {styles.viewGroup}>
                 <Text style={styles.key}>Name of account</Text>
                 <Text style= {styles.value}>-</Text>
            </View>
            <View style= {styles.viewGroup}>
                 <Text style={styles.key}>Account Number</Text>
                 <Text style= {styles.value}>-</Text>
            </View>
            <View style= {styles.viewGroup}>
                 <Text style={styles.key}>Bank Name</Text>
                 <Text style= {styles.value}>-</Text>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <View style={[styles.SubContainer]}>
          <Text style={styles.title}>Transaction History</Text>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  SubContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  button: {
    backgroundColor: "#6904EC",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: "#2B025F",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 25.2,
  },
  viewGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  key: {
    color: "#2B025F",
    fontSize: 16,
  },
  value: {
    color: "#012100",
    fontSize:16, fontWeight:"500"
  },
});
