import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabcomponent } from "../../components/shared/naviagetion";
import { StyleSheet } from "react-native";
import Profile from "../../screens/Vendor/Profile/Profile";
import Home from "../../screens/Vendor/Home/Home";
import Orders from "../../screens/Vendor/Order/Orders";

const Tab = createBottomTabNavigator();

const VendorTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="VendorHome"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 60,
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          color: "white",
        },
      }}
    >
      <Tab.Screen
        name="VendorHome"
        component={Home}
        options={{
          title: "BuyerHome",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabcomponent
              focused={focused}
              iconFocused={require("../../assets/icons/home-bold.png")}
              iconUnfocused={require("../../assets/icons/home-2.png")}
              label="Home"
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
              texttStyle={{ color: "#000000" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Product"
        component={Orders}
        options={{
          title: "Product",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabcomponent
              focused={focused}
              iconFocused={require("../../assets/icons/order-bold.png")}
              iconUnfocused={require("../../assets/icons/order.png")}
              label="Product"
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
              texttStyle={{ color: "#000000" }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabcomponent
              focused={focused}
              iconFocused={require("../../assets/icons/profile-bold.png")}
              iconUnfocused={require("../../assets/icons/profile.png")}
              label="Profile"
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
              texttStyle={{ color: "#000000" }}
            />
          ),
        }}
      />
      {/* )
} */}
    </Tab.Navigator>
  );
};

export default VendorTabNavigation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
