import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

import { useCallback } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from "react-query";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// onBoarding screen and actions
import OnBoardingPage from "./screens/OnboardingPage";
import Auth from "./screens/Auth";
import Buyernaviagetion from "./Navigation/BuyerNav/Buyernaviagetion";
import { reset_isOnboarding } from "./Redux/OnboardingSlice";
import { reset_login } from "./Redux/AuthSlice";
import ApplicationForm from "./screens/Vendor/Applications/ApplicationForm";
import Home from "./screens/Vendor/Home/Home";
import PersonalInformation from "./screens/Vendor/Profile/PersonalInformation";
import Profile from "./screens/Vendor/Profile/Profile";
import UploadProduct from "./screens/Vendor/Home/UploadProduct";
import CakeDetails from "./screens/Buyer/Home.js/CakeDetails";
import CakePreview from "./screens/Vendor/Home/CakePreview";
import VendorTabNavigation from "./Navigation/VendorNav/VendorTabNavigation";
import VendorNavigation from "./Navigation/VendorNav/VendorNavigation";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false, // This hides the header for all screens by default
};

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-SemiBold": require("./assets/font/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Medium": require("./assets/font/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Light": require("./assets/font/RobotoSlab-Light.ttf"),
    "RobotoSlab-Regular": require("./assets/font/RobotoSlab-Regular.ttf"),
    "Inter-Regular": require("./assets/font/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/font/Inter-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider style={styles.container}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <NavigationScreen />
            </View>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#001272" />
    </View>
  );
};

export const StartScreen = ({}) => {
  const { isOnboarding } = useSelector((state) => state.OnboardingSlice);

  console.log({ isOnboarding });

  const dispatch = useDispatch();

  return <>{!isOnboarding ? <OnBoardingPage /> : <Auth />}</>;
};

export const NavigationScreen = () => {
  const dispatch = useDispatch();

  const { user_data } = useSelector((state) => state?.Auth);

  console.log({
    asdd: user_data,
  });

  return (
    <NavigationContainer>
      {user_data?.data?.token && <MainScreen />}
      {!user_data?.data?.token && <StartScreen />}
      <Toast />
    </NavigationContainer>
  );
};

const MainScreen = () => {
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const dispatch = useDispatch();

  // console.log({
  //   condition: user_data?.data?.roles?.includes("user"),
  //   zzzz: user_data?.data?.user?.roles,
  // });

  useEffect(() => {
    if (
      !["user", "vendor"].some((role) =>
        user_data?.data?.user?.roles?.includes(role)
      )
    ) {
      dispatch(reset_isOnboarding());
      dispatch(reset_login());
      console.log("Logging out. User data:", user_data);
    }

    // dispatch(reset_isOnboarding());
    // dispatch(reset_login());

    return () => {};
  }, [user_data]);

  return (
    <>
      {user_data?.data?.user?.roles[0] === "user" && <Buyernaviagetion />}
      {user_data?.data?.user?.roles[0] === "vendor" && <VendorNavigation />}
    </>
  );
};
