import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

const AppScreen = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF0F0B2",
      }}
    >
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;
