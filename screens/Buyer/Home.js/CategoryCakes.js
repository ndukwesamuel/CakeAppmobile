import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreen from "../../../components/shared/AppScreen";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Cake_Fun } from "../../../Redux/Buyer/CakeSlice";

export default function CategoryCakes() {
  const dispatch = useDispatch();
  const { get_all_cake_data } = useSelector((state) => state.CakeSlice);
  const dataRoute = useRoute()?.params;
  const [option, setoption] = useState('')
  console.log({ route: dataRoute });

  useEffect(() => {
    setoption(dataRoute?.name)
    dispatch(Get_All_Cake_Fun(option))
    return () => {};
  }, [dataRoute]);
  console.log({data:get_all_cake_data?.data?.cakes})
  return (
    <AppScreenThree arrrow={"true"} title={dataRoute?.item?.name}>
      <View style={styles.container} id="container"></View>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 70,
  },
});
