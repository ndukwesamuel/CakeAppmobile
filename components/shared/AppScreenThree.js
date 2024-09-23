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

const AppScreenThree = ({ arrrow, children, notification, title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F0F9FF",
          // borderWidth: 1,
          // borderColor: "red",
          zIndex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            {arrrow === "true" && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  zIndex: 1,
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{
              position: "absolute",
              top: 20,
              left: 100,
              zIndex: 1,
              fontSize:18,
              color:"#012100",
              fontWeight:"500",
              textTransform:"capitalize"
            }}
          >
            {title}
          </Text>
        </View>

        {notification === "true" && (
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
        )}
        {children}
      </SafeAreaView>
    </View>
  );
};

export default AppScreenThree;
