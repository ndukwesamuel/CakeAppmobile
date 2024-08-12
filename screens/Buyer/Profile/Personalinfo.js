import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset_login } from "../../../Redux/AuthSlice";
import { reset_VendorSlice } from "../../../Redux/Buyer/VendorSlice";
import { reset_OrderSlice } from "../../../Redux/Buyer/OrderSlice";
import { reset_CakeSlice } from "../../../Redux/Buyer/CakeSlice";

const Personalinfo = () => {
  const { user } = useSelector((state) => state.Auth.user_profile_data);

  const dispatch = useDispatch();
  const LogoutFun = () => {
    dispatch(reset_login());
    dispatch(reset_VendorSlice());
    dispatch(reset_OrderSlice());
    dispatch(reset_CakeSlice());
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 30,
        gap: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          gap: 20,
          borderRadius: 10,
        }}
      >
        <Text fontWeight="400" fontSize="12">
          Phone number
        </Text>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          {user?.phone || "NULL"}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          gap: 20,
          borderRadius: 10,
        }}
      >
        <Text fontWeight="400" fontSize="12">
          Email Address
        </Text>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          {user?.email}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          gap: 20,
          borderRadius: 10,
        }}
      >
        <Text fontWeight="400" fontSize="12">
          Home location
        </Text>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          {user?.location}
        </Text>

        <TouchableOpacity
          onPress={() => {
            console.log("Logout");
            LogoutFun();
          }}
          style={{
            backgroundColor: "#DD293E",
            padding: 12,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Personalinfo;
