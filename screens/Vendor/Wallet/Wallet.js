import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
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
  Get_Transaction_History_Fun,
  Get_Wallet_Details_Fun,
} from "../../../Redux/Vendor/WalletSlice";
import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import { formatToCurrency } from "../../../utills/Currency";
import { CenterReuseModals } from "../../../components/shared/ReuseModals";
import { useNavigation } from "@react-navigation/native";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function Wallet() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
  const {
    get_banks_data,
    wallet_details_data,
    transaction_history_data,
    wallet_details_isLoading,
    get_banks_isLoading,
  } = useSelector((state) => state?.VendorsSlice?.WalletSlice);
  console.log({ wallet: wallet_details_data?.data?.wallet });

  const [accountModal, setAccountModal] = useState(false);
  const [bankModal, setBankModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [withdrawalSuccessModal, setWithdrawalSuccessModal] = useState(false);
  const [updateSuccessModal, setupdateSuccessModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null); // State to store selected bank
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [bankCode, setbankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(Get_All_Banks_Fun());
    dispatch(Get_Wallet_Details_Fun());
    dispatch(Get_Transaction_History_Fun());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(Get_All_Banks_Fun());
      dispatch(Get_Wallet_Details_Fun());
      // dispatch(Get_Transaction_History_Fun());
      setRefreshing(false);
    }, 2000);
  };

  // console.log({ transaction: transaction_history_data?.data?.transactions });

  // Handle bank selection
  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setBankModal(false);
    setbankCode(bank?.code);
  };

  const toggleWithdrawalSuccessModal = () => {
    setWithdrawalSuccessModal(!withdrawalSuccessModal);
  };

  const toggleUpdateSucessModal = () => {
    setupdateSuccessModal(!updateSuccessModal);
  };

  // Filter the banks list based on search query
  const filteredBanks = get_banks_data?.data?.banks.filter((bank) =>
    bank?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Update_Mutation = useMutation(
    async ({ formData, token }) => {
      try {
        const response = await axios.patch(
          "https://cake-app-server.onrender.com/api/v1/vendor/wallet/update-virtual-account",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (success) => {
        setAccountModal(!accountModal);
        setAccountNumber("");
        setSelectedBank("");
        toggleUpdateSucessModal();
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );

  const handleUpdateBankDetails = (item) => {
    const formData = {
      bankCode: bankCode,
      accountNumber: accountNumber,
    };
    Update_Mutation.mutate({ formData, token });
  };

  const Withdrawal_Mutation = useMutation(
    (data) => {
      const url = `${API_BASEURL}v1/vendor/wallet/withdraw`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      return axios.post(url, data, config);
    },
    {
      onSuccess: (success) => {
        dispatch(Get_Wallet_Details_Fun());
        setWithdrawnAmount(amount);
        setAmount(0);
        setWithdrawalModal(!withdrawalModal);
        toggleWithdrawalSuccessModal();
      },

      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );
  const handleWithdrawal = () => {
    const data = {
      amount: amount,
    };
    Withdrawal_Mutation.mutate(data);
  };

  return (
    <AppScreenThree arrow={"true"} title={"Wallet"}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ gap: 20 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View style={[styles.SubContainer, { alignItems: "center", gap: 10 }]}>
          <Text style={{ color: "#020D44", fontSize: 16, fontWeight: "500" }}>
            Balance
          </Text>
          <Text style={{ fontSize: 32, fontWeight: "900" }}>
            {formatToCurrency(wallet_details_data?.data?.wallet?.balance)}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setWithdrawalModal(!withdrawalModal)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Account Details */}
        <View style={[styles.SubContainer, { gap: 20 }]}>
          <Text style={styles.title}>Account Details</Text>
          {wallet_details_isLoading ? (
            <ActivityIndicator size={"small"} color={"purple"} />
          ) : (
            <View style={{ gap: 8 }}>
              <TouchableOpacity onPress={() => setAccountModal(!accountModal)}>
                <Text
                  style={{
                    textAlign: "right",
                    textDecorationLine: "underline",
                    fontSize: 16,
                    color: "#2B025F",
                  }}
                >
                  Update account details
                </Text>
              </TouchableOpacity>
              <View style={styles.viewGroup}>
                <Text style={styles.key}>Name of account</Text>
                <Text style={styles.value}>
                  {wallet_details_data?.data?.wallet?.name || ""}
                </Text>
              </View>
              <View style={styles.viewGroup}>
                <Text style={styles.key}>Account Number</Text>
                <Text style={styles.value}>
                  {wallet_details_data?.data?.wallet?.bankAccountNumber || ""}
                </Text>
              </View>
              <View style={styles.viewGroup}>
                <Text style={styles.key}>Bank Name</Text>
                <Text style={styles.value}>
                  {wallet_details_data?.data?.wallet?.bankName || ""}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Account Modal */}
        <Modal visible={accountModal} transparent={true} animationType="slide">
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
                <View style={{ gap: 5 }}>
                  <View style={styles.viewGroup}>
                    <Text style={styles.key}>Name of account</Text>
                    <Text style={styles.value}>
                      {wallet_details_data?.data?.wallet?.name || ""}
                    </Text>
                  </View>
                  <View style={styles.viewGroup}>
                    <Text style={styles.key}>Account Number</Text>
                    <Text style={styles.value}>
                      {wallet_details_data?.data?.wallet?.bankAccountNumber ||
                        ""}
                    </Text>
                  </View>
                  <View style={styles.viewGroup}>
                    <Text style={styles.key}>Bank Name</Text>
                    <Text style={styles.value}>
                      {wallet_details_data?.data?.wallet?.bankName || ""}
                    </Text>
                  </View>
                </View>

                <View style={{ gap: 15 }}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Bank Name</Text>
                    <TouchableOpacity
                      style={[styles.input, { justifyContent: "center" }]}
                      onPress={() => setBankModal(!bankModal)}
                    >
                      <Text>
                        {selectedBank ? selectedBank.name : "Select a bank"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Account Number</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="phone-pad"
                      value={accountNumber}
                      onChangeText={(text) => setAccountNumber(text)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handleUpdateBankDetails}
                    style={[styles.button, { borderRadius: 10 }]}
                  >
                    {Update_Mutation.isLoading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Update Bank Details
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <CenterReuseModals
          visible={updateSuccessModal}
          onClose={toggleUpdateSucessModal}
          title={"Account Updated"}
          subText={"Your account has been updated successfully"}
        />

        {/* Bank Modal */}
        <Modal visible={bankModal} transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setBankModal(!bankModal)}>
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { height: "60%" }]}>
                <View>
                  {/* Search Input */}
                  <TextInput
                    style={[styles.input, { marginVertical: 10 }]}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery} // Update search query on input
                  />
                  {/* List of Banks */}
                  {get_banks_isLoading ? (
                    <ActivityIndicator size={"small"} color={"purple"} />
                  ) : (
                    <FlatList
                      contentContainerStyle={{ gap: 10 }}
                      data={filteredBanks} // Use filtered banks for search
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleBankSelect(item)}
                        >
                          <Text>{item?.name}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  )}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Withdrawal Modal */}
        <Modal
          visible={withdrawalModal}
          animationType="slide"
          transparent={true}
        >
          <TouchableWithoutFeedback
            onPress={() => setWithdrawalModal(!withdrawalModal)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text
                  style={{ color: "#2B025F", fontSize: 24, fontWeight: "600" }}
                >
                  Withdraw Funds
                </Text>
                <View style={{ gap: 10 }}>
                  <Text style={styles.key}>
                    Balance:{" "}
                    <Text style={styles.value}>
                      {formatToCurrency(
                        wallet_details_data?.data?.wallet?.balance
                      )}
                    </Text>
                  </Text>
                  <Text style={styles.key}>
                    Bank Name:{" "}
                    <Text style={styles.value}>
                      {wallet_details_data?.data?.wallet?.name || ""}
                    </Text>
                  </Text>
                  <Text style={styles.key}>
                    Account Number:{" "}
                    <Text style={styles.value}>
                      {wallet_details_data?.data?.wallet?.bankAccountNumber ||
                        ""}
                    </Text>
                  </Text>
                  <Text style={styles.key}>
                    Account Name:{" "}
                    <Text style={styles.value}>
                      {" "}
                      {wallet_details_data?.data?.wallet?.bankName || ""}
                    </Text>
                  </Text>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Amount</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleWithdrawal}
                  style={[styles.button, { borderRadius: 10 }]}
                >
                  {Withdrawal_Mutation.isLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={{ textAlign: "center", color: "white" }}>
                      Withdraw
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <CenterReuseModals
          visible={withdrawalSuccessModal}
          onClose={toggleWithdrawalSuccessModal}
          title={"Withdrawal Successfully"}
          subText={`You have successfully withdrawn ${withdrawnAmount} into your bank account`}
        />

        {/* Transaction History */}
        <View style={[styles.SubContainer]}>
          <Pressable onPress={() => navigation.navigate("transactionHistory")}>
            <Text
              style={[
                styles.title,
                { marginBottom: 30, textDecorationLine: "underline" },
              ]}
            >
              Transaction History
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    gap: 20,
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
    gap: 20,
    paddingBottom: 50,
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
