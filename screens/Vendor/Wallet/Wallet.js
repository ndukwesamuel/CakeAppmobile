import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_All_Banks_Fun,
  Get_Wallet_Details_Fun,
} from "../../../Redux/Vendor/WalletSlice";

export default function Wallet() {
  const dispatch = useDispatch();
  const { get_banks_data, wallet_details_data } = useSelector(
    (state) => state?.VendorsSlice?.WalletSlice
  );
  console.log({
    banks: get_banks_data,
    wallet: wallet_details_data.data.wallet,
  });

  const [accountModal, setAccountModal] = useState(false);
  useEffect(() => {
    dispatch(Get_All_Banks_Fun());
    dispatch(Get_Wallet_Details_Fun());
  }, []);
  return (
    <AppScreenThree arrrow={"true"} title={"Wallet"}>
      <ScrollView style={styles.container} contentContainerStyle={{ gap: 20 }}>
        <View style={[styles.SubContainer, { alignItems: "center" }]}>
          <Text style={{ color: "#020D44", fontSize: 16, fontWeight: "500" }}>
            Balance
          </Text>
          <Text style={{ fontSize: 32, fontWeight: "900" }}>
            {wallet_details_data?.data?.wallet?.balance}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", fontSize: 16 }}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        {/* Account Details */}
        <View style={[styles.SubContainer, { gap: 20 }]}>
          <Text style={styles.title}>Account Details</Text>
          <View style={{ gap: 8 }}>
            <TouchableOpacity onPress={() => setAccountModal(!accountModal)}>
              <Text
                style={{ textAlign: "right", textDecorationLine: "underline" }}
              >
                Update account details
              </Text>
            </TouchableOpacity>
            <View style={styles.viewGroup}>
              <Text style={styles.key}>Name of account</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.viewGroup}>
              <Text style={styles.key}>Account Number</Text>
              <Text style={styles.value}>-</Text>
            </View>
            <View style={styles.viewGroup}>
              <Text style={styles.key}>Bank Name</Text>
              <Text style={styles.value}>-</Text>
            </View>
          </View>
        </View>

        <Modal visible={accountModal} transparent={true} animationType="Slide">
          <TouchableWithoutFeedback
            onPress={() => setAccountModal(!accountModal)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text
                  style={{ color: "#2B025F", fontSize: 24, fontWeight: "600" }}
                >
                  Update Bank Details
                </Text>
                <View>
                  <View style={styles.viewGroup}>
                    <Text style={styles.key}>Name of account</Text>
                    <Text style={styles.value}>-</Text>
                  </View>
                  <View style={styles.viewGroup}>
                    <Text style={styles.key}>Account Number</Text>
                    <Text style={styles.value}>-</Text>
                  </View>
                  <View style={styles.viewGroup}>
                    <Text style={styles.key}>Bank Name</Text>
                    <Text style={styles.value}>-</Text>
                  </View>
                </View>

                <View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Bank Name</Text>
                    <TextInput style={styles.input}/>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Account Name</Text>
                    <TextInput style={styles.input}/>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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
    padding: 20,
    borderRadius: 10,
    // alignItems: "center",
  },
  inputGroup: {
    gap: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(76, 6, 14, 1)",
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: "rgba(43, 2, 95, 1)",
    fontSize: 16,
    fontWeight: "400",
  },
});
