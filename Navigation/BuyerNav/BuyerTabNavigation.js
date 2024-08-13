import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { AntDesign } from "@expo/vector-icons";
// import { useSelector } from "react-redux";

// import About from "../../screens/Customerinterface/About";
// import Account from "../../screens/Customerinterface/Account/Account";
// import History from "../../screens/Customerinterface/Guest/History";
// import Home from "../../screens/Customerinterface/Home";
// import Guests from "../../screens/Customerinterface/Guest/Guests";
// import Neigborhood from "../../screens/Customerinterface/Neigborhood";
import {
  CustomTabButton,
  Tabcomponent,
} from "../../components/shared/naviagetion";
// import ClanRequiredScreen from "../../components/shared/ClanRequiredScreen";
// import Emergency from "../../screens/Customerinterface/Emergency/Emergency";
import { StyleSheet } from "react-native";
// import BuyerHome from "../../screens/Buyer/Home.js/BuyerHome";
import Profile from "../../screens/Buyer/Profile/Profile";
import BuyerHome from "../../screens/Buyer/Home.js/BuyerHome";
import BuyerOrder from "../../screens/Buyer/Order/BuyerOrder";

const Tab = createBottomTabNavigator();

const BuyerTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="BuyerHome"
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
        name="BuyerHome"
        component={BuyerHome}
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
        component={BuyerOrder}
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

      {/* <Tab.Screen
                  component={Neigborhood}

                  name="Neigborhood"
                  options={{
                      title: "Neigborhood",
                      tabBarActiveTintColor: "#005091",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <Tabcomponent
                              focused={focused}
                              iconFocused={require('../../assets/message-text2.png')}
                              iconUnfocused={require('../../assets/message-text.png')}
                              label="Chat"
                              containerStyle={{ alignItems: "center", justifyContent: "center", top: 10 }}
                              texttStyle={{ color: "#000000" }}
                          />
                      ),
                  }}
              />
          

              <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                      title: "Home",
                      tabBarActiveTintColor: "#005091",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <AntDesign name="plus" size={24} color="white" style={{ width: 25, height: 25 }} />
                      ),
                      tabBarButton: (props) => <CustomTabButton {...props} />,
                  }}
              />

              <Tab.Screen
                  name="Emergencyscreen"
                  component={Emergency}

                  options={{
                      title: "Emergency",
                      tabBarActiveTintColor: "#005091",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <Tabcomponent
                              focused={focused}
                              iconFocused={require('../../assets/images/emergency2.png')}
                              iconUnfocused={require('../../assets/images/emergency.png')}
                              label="Emergency"
                              containerStyle={{ alignItems: "center", justifyContent: "center", top: 10 }}
                              texttStyle={{ color: "#000000" }}
                          />
                      ),
                  }}
              />
        

              <Tab.Screen
                  name="Account"
                  component={Account}
                  options={{
                      title: "Account",
                      tabBarActiveTintColor: "#005091",
                      headerShown: false,
                      tabBarIcon: ({ focused }) => (
                          <Tabcomponent
                              focused={focused}
                              iconFocused={require('../../assets/images/Account2.png')}
                              iconUnfocused={require('../../assets/images/Account.png')}
                              label="Account"
                              containerStyle={{ alignItems: "center", justifyContent: "center", top: 10 }}
                              texttStyle={{ color: "#000000" }}
                          />
                      ),
                  }}
              /> */}
    </Tab.Navigator>
  );
};

export default BuyerTabNavigation;

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
