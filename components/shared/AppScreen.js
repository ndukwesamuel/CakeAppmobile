import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

const AppScreen = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F0F9FF",
      }}
    >
      <StatusBar backgroundColor="#F0F9FF" barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;
