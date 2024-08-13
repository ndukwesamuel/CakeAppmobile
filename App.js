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
  // return <Auth />;
};

export const NavigationScreen = () => {
  // const isAuth = useSelector((state) => state);
  const dispatch = useDispatch();

  const { user_data } = useSelector((state) => state?.Auth);

  console.log({
    asdd: user_data,
  });

  // const [country, setCountry] = useState("Loading...");

  return (
    <NavigationContainer>
      {/* <StartScreen /> */}
      {user_data?.user?.token && <MainScreen />}
      {!user_data?.user?.token && <StartScreen />}
      <Toast />
    </NavigationContainer>
  );
};

const MainScreen = () => {
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!["driver", "user"].includes(user_data?.user?.role)) {
      dispatch(reset_isOnboarding());
      dispatch(reset_login());
      // console.log("this is user data", user_data);
    }

    return () => {};
  }, []);

  return (
    <>
      {user_data?.user?.roles[0] === "user" && <Buyernaviagetion />}

      {/* {user_data?.role === "driver" && <DriverDrawer />}
      {user_data?.role === "user" && <RideDrawer />} */}
    </>
  );
};
