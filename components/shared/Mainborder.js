import { View, Text } from "react-native";
import React from "react";
import AppScreen from "./AppScreen";

const Mainborder = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 12,
        marginHorizontal: 20,
        marginVertical: 30,
        marginTop: 50,
      }}
    >
      {children}
    </View>
  );
};

export default Mainborder;
