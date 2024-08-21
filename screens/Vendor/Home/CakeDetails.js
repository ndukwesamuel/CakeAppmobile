import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreenTwo from "../../../components/shared/AppScreenTwo";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

const CakeDetails = () => {
  const dispatch = useDispatch();
  const dataRoute = useRoute()?.params;
  const { get_single_cake_data } = useSelector((state) => state.CakeSlice);


  return <AppScreenTwo arrrow={"true"} notification={"true"}></AppScreenTwo>;
};

export default CakeDetails;

const styles = StyleSheet.create({});
