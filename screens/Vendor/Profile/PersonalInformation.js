import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.Auth?.user_profile_data.user);
  console.log({ userrrrrrr:user });

  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>Phone Number</Text>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{user?.phone|| "Null"}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>Email</Text>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
         {user?.email}
        </Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={{ fontSize: 12, fontWeight: "400" }}>Home Location</Text>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          {user?.location}
        </Text>
      </View>
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    paddingTop: 40,
  },
  textGroup: {
    backgroundColor: "white",
    padding: 15,
    gap: 5,
    borderRadius: 8,
  },
});
