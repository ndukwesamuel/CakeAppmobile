import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AntDesign } from "@expo/vector-icons";
import BuyerTabNavigation from "./BuyerTabNavigation";
import { screens } from "./ScreenArray";

const Stack = createNativeStackNavigator();

const SingleScreenWithBackButton = (screenName, component, title) => {
  return {
    name: screenName,
    component: component,
    options: ({ navigation }) => ({
      headerShown: false,
      // title: title,
      // headerStyle: {
      //   backgroundColor: "white",
      // },
      // headerLeft: () => (
      //   <TouchableOpacity
      //     onPress={() => navigation.goBack()}
      //     style={{
      //       marginLeft: 10,
      //     }}
      //   >
      //     <AntDesign name="arrowleft" size={24} color="black" />
      //   </TouchableOpacity>
      // ),
    }),
  };
};

const createScreen = (name, component, title) => {
  return (
    <Stack.Screen
      key={name}
      {...SingleScreenWithBackButton(name, component, title)}
    />
  );
};

export const Buyernaviagetion = () => {
  return (
    <Stack.Navigator initialRouteName="BuyerTabNavigation">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BuyerTabNavigation"
        component={BuyerTabNavigation}
      />

      {screens.map((screen) =>
        createScreen(screen.name, screen.component, screen.title)
      )}
    </Stack.Navigator>
  );
};
