import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useRoute } from "@react-navigation/native";

export default function OrderDetails() {
  const dataRoute = useRoute().params;
  console.log({ dataaaaa: dataRoute });
  return (
    <AppScreenThree arrrow={"true"} title={dataRoute.title}>
      <View style={styles.container}>
        <FlatList />
      </View>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 60,
  },
});

const renderItem = ({ item }) => {};
