import { View, StatusBar, SafeAreaView } from "react-native";
import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContainer from "../components/Auth/AuthContainer";
import Mainborder from "../components/shared/Mainborder";
import AppScreen from "../components/shared/AppScreen";

const Auth = () => {
  return (
    <AppScreen>
      <Mainborder>
        <AuthContainer />
      </Mainborder>
    </AppScreen>
  );
};

export default Auth;
