import React from "react";
import {
  StatusBar,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const AppScreenTwo = ({ arrrow, children }) => {
  console.log({
    james: arrrow, // This should log `true`
  });

  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        style={{
          width: "120%",
          height: 120,
          position: "absolute",
          top: 0,
          // zIndex: 1,
        }}
        source={require("../../assets/headerVector1.png")}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FFF0F0B2",
          borderWidth: 1,
          borderColor: "red",
          zIndex: 1,
        }}
      >
        {arrrow === "true" && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              zIndex: 1,
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            zIndex: 1,
          }}
        >
          <MaterialIcons name="notifications-on" size={24} color="black" />
        </TouchableOpacity>
        {children}
      </SafeAreaView>
    </View>
  );
};

export default AppScreenTwo;
