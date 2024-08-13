import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import AppScreen from "../shared/AppScreen";
import Mainborder from "../shared/Mainborder";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const ForgotPassword = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const otpemail = useSelector((state) => state?.OnboardingSlice);

  console.log({
    d: otpemail,
  });
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);
  console.log({
    login_data: user_data,
  });

  const Registration_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/auth/signup`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${user_data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
        dispatch(checkOtp(true));

        // onPress={() => onSetAuth("sign-in")}
      },

      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  return (
    <AppScreen>
      <Mainborder>
        <ScrollView style={styles.container}>
          <View
            style={{
              paddingBottom: 30,
              flex: 1,
            }}
          >
            {/* heading texts */}
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 24, lineHeight: 36, fontWeight: "900" }}>
                Forgot Password
              </Text>
            </View>

            {/* inputs container*/}
            <View style={styles.inputGroup}>
              {/* username */}

              <View style={styles.inputContainer}>
                <Text style={styles.labels}>Password</Text>
                <TextInput
                  style={styles.inputs}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.labels}>New Password</Text>
                <TextInput
                  style={styles.inputs}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry
                />
              </View>
            </View>

            {/* action buttons */}
            <View
              style={{
                justifyContent: "flex-end",
                alignContent: "flex-center",
                flex: 3,
                paddingVertical: 30,
                gap: 10,
              }}
            >
              <Pressable
                // onPress={() => onSetAuth("sign-in")}
                onPress={() => {
                  dispatch(setOtpEmail(email));

                  Registration_Mutation.mutate({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    location: homeAddress,
                    roles: ["user"],
                  });
                }}
                style={{
                  padding: 10,
                  borderRadius: 40,
                  backgroundColor: "#DD293E",
                }}
              >
                {Registration_Mutation.isLoading ? (
                  <ActivityIndicator size="small" color="white" />
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
                    Submit
                  </Text>
                )}
              </Pressable>
              <View style={{ justifyContent: "center" }}>
                <Pressable>
                  <Text style={{ fontSize: 14, lineHeight: 22.4 }}>
                    You do not have an account?{" "}
                    <Text
                      onPress={() => onSetAuth("sign-in")}
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        lineHeight: 25.6,
                      }}
                    >
                      Login
                    </Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </Mainborder>
    </AppScreen>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 10,
    gap: 20,
  },

  inputGroup: {
    gap: 5,
  },

  inputContainer: {
    gap: 5,
  },

  labels: {
    fontSize: 14,
    fontWeight: "500",
  },

  inputs: {
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 7,
  },
});
