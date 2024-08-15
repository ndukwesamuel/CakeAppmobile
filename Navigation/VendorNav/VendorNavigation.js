import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorTabNavigation from "./VendorTabNavigation";
import { screens } from "./ScreenArray";

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

const VendorNavigation = () => (
  <Stack.Navigator initialRouteName="VendorTabNavigation">
    <Stack.Screen
      name="VendorTabNavigation"
      component={VendorTabNavigation}
      options={{ headerShown: false }}
    />
    {screens.map((screen) =>
      createScreen(screen.name, screen.component, screen.title)
    )}
  </Stack.Navigator>
);

export default VendorNavigation;
