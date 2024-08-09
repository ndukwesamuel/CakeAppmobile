import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Personalinfo = () => {
  const { user } = useSelector((state) => state.Auth.user_profile_data);

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
      </View>
    </View>
  );
};

export default Personalinfo;
