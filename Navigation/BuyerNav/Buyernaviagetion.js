import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuyerTabNavigation from "./BuyerTabNavigation";
import { screens } from "./ScreenArray"; // Ensure screens is correctly defined and imported

const Stack = createNativeStackNavigator();

const SingleScreenWithBackButton = (
  screenName,
  component,
  title,
  headerShown = false
) => ({
  name: screenName,
  component: component,
  options: {
    title: title,
    headerShown: headerShown,
    headerBackTitleVisible: false, // Hide the title next to the back button
  },
});

const createScreen = (name, component, title, headerShown) => (
  <Stack.Screen
    key={name}
    {...SingleScreenWithBackButton(name, component, title, headerShown)}
  />
);

const Buyernaviagetion = () => (
  <Stack.Navigator initialRouteName="BuyerTabNavigation">
    <Stack.Screen
      name="BuyerTabNavigation"
      component={BuyerTabNavigation}
      options={{ headerShown: false }}
    />
    {screens.map((screen) =>
      createScreen(
        screen.name,
        screen.component,
        screen.title,
        screen.headerShown
      )
    )}
  </Stack.Navigator>
);

export default Buyernaviagetion;
