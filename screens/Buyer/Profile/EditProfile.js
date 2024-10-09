import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppScreenThree from "../../../components/shared/AppScreenThree";
import { useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";

export default function EditProfile() {
    const dispatch = useDispatch()
  const dataRoute = useRoute().params;
  const token = useSelector((state) => state?.Auth?.user_data?.data?.token);
  //   console.log({ heyyy: dataRoute?.user_profile_data?.data?.user });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (dataRoute?.user_profile_data?.data?.user) {
      setFirstName(dataRoute?.user_profile_data?.data?.user?.firstName);
      setLastName(dataRoute?.user_profile_data?.data?.user?.lastName);
      setEmail(dataRoute?.user_profile_data?.data?.user?.email);
      setLocation(dataRoute?.user_profile_data?.data?.user?.location);
    }
  }, [dataRoute]);

  const updateProfile_Mutation = useMutation(
    async ({ formData, token }) => {
      try {
        const response = await axios.patch(
          "https://cake-app-server.onrender.com/api/v1/auth",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (success) => {
        dispatch(UserProfile_Fun())
        Toast.show({
          type: "success",
          text1: "Profile successfully updated",
        });
      },
      onError: (error) => {
        // console.log(error)
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );

  const handleSubmit = () => {
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      location,
      location,
    };
    updateProfile_Mutation.mutate({ formData, token });
  };
  return (
    <AppScreenThree arrrow={"true"} title={"Edit Profile"}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: "space-between", padding: 20 }}
      >
        <View style={{ gap: 20 }}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>location</Text>
            <TextInput
              style={styles.input}
              //   value={homeAddress}
              //   onChangeText={(text) => setHomeAddress(text)}
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {updateProfile_Mutation.isLoading ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "700",
                  lineHeight: 24.05,
                }}
              >
                Update
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppScreenThree>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    top: 60,
  },
  inputGroup: {
    gap: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(76, 6, 14, 1)",
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: "rgba(43, 2, 95, 1)",
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "rgba(105, 4, 236, 1)",
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 50,
  },
});
