import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuyerTabNavigation from "./BuyerTabNavigation";
import { screens } from "./ScreenArray"; // Ensure screens is correctly defined and imported

const Stack = createNativeStackNavigator();

const SingleScreenWithBackButton = (screenName, component, title) => ({
  name: screenName,
  component: component,
  options: ({ navigation }) => ({
    headerShown: false,
  }),
});

const createScreen = (name, component, title) => (
  <Stack.Screen
    key={name}
    {...SingleScreenWithBackButton(name, component, title)}
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
      createScreen(screen.name, screen.component, screen.title)
    )}
  </Stack.Navigator>
);

export default Buyernaviagetion;
