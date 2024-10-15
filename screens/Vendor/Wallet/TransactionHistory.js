import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { Get_Transaction_History_Fun } from "../../../Redux/Vendor/WalletSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatToCurrency } from "../../../utills/Currency";
import { formatDate } from "../../../utills/DateTime";

export default function TransactionHistory() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {
    get_banks_data,
    wallet_details_data,
    transaction_history_data,
    transaction_history_isLoading,
  } = useSelector((state) => state?.VendorsSlice?.WalletSlice);

  useEffect(() => {
    dispatch(Get_Transaction_History_Fun());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(Get_Transaction_History_Fun());
      setRefreshing(false);
    }, 2000);
  };

  return (
    <AppScreenThree arrrow={"true"} title={"Transaction History"}>
      {transaction_history_isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={"purple"}
          style={{ marginTop: 70 }}
        />
      ) : (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{ marginBottom: 100, padding: 20, gap: 50 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={transaction_history_data?.data?.transactions}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View
                style={{
                  gap: 10,
                  borderBottomColor: "#330111",
                  borderBottomWidth: 0.3,
                  paddingBottom: 10,
                }}
              >
                <View style={styles.viewGroup}>
                  <Text style={styles.key}>Date</Text>
                  <Text style={styles.value}>
                    {formatDate(item?.createdAt)}
                  </Text>
                </View>
                <View style={styles.viewGroup}>
                  <Text style={styles.key}>Amount</Text>
                  <Text style={styles.value}>
                    {formatToCurrency(item?.amount)}
                  </Text>
                </View>
                <View style={styles.viewGroup}>
                  <Text style={styles.key}>Account Number</Text>
                  <Text style={[styles.value, { color: "#2B025F" }]}>
                    {item?.accountNumber}
                  </Text>
                </View>
                <View style={styles.viewGroup}>
                  <Text style={styles.key}>Account Name</Text>
                  <Text style={styles.value}>{item?.accountName}</Text>
                </View>
                <View style={styles.viewGroup}>
                  <Text style={styles.key}>Bank Name</Text>
                  <Text style={styles.value}>{item?.bankName}</Text>
                </View>
                <View style={styles.viewGroup}>
                  <Text style={styles.key}>Status</Text>
                  <Text
                    style={[
                      styles.value,
                      item?.paymentStatus === "successful"
                        ? { color: "#08D130" }
                        : { color: "#EE230D" },
                    ]}
                  >
                    {item?.paymentStatus}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text>No Transactions Made</Text>}
          />
        </View>
      )}
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 60,
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
});
