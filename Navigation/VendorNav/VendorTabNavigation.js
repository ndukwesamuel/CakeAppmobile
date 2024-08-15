import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabcomponent } from "../../components/shared/naviagetion";
import { StyleSheet } from "react-native";
import Profile from "../../screens/Vendor/Profile/Profile";
import Home from "../../screens/Vendor/Home";

const Tab = createBottomTabNavigator();

const VendorTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="VendorHome"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 65,
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
              iconFocused={require("../../assets/home-2.png")}
              iconUnfocused={require("../../assets/home.png")}
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
        name="Order"
        component={''}
        options={{
          title: "Order",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Tabcomponent
              focused={focused}
              iconFocused={require("../../assets/clock-2.png")}
              iconUnfocused={require("../../assets/clock.png")}
              label="Order"
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
              iconFocused={require("../../assets/li_user-2.png")}
              iconUnfocused={require("../../assets/li_user.png")}
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
