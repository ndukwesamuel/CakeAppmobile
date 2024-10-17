import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  checkOtp,
  checkResetPassword,
  reset_isOnboarding,
  reset_otpemail,
  reset_otpValue,
  reset_verifyEmail,
  setOtpEmail,
} from "../../Redux/OnboardingSlice";
import AppScreenThree from "../shared/AppScreenThree";
import { reset_login } from "../../Redux/AuthSlice";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const backgroundImg = require("../../assets/images/signIn.png");

const ForgotPassword = ({ onSetAuth }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const { width } = useWindowDimensions();

  const { otpemail, verifyEmail, otpValue } = useSelector(
    (state) => state?.OnboardingSlice
  );

  console.log({verifyEmail: verifyEmail})
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const ForgotPassword_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/auth/forgot-password`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        dispatch(setOtpEmail(email));
        dispatch(checkResetPassword(true));
        dispatch(checkOtp(true));
      },

      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.data?.message} `,
        });
      },
    }
  );

  const ResetPassword_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/auth/reset-password`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        dispatch(reset_otpemail());
        dispatch(checkResetPassword());
        dispatch(reset_otpValue());
        dispatch(reset_login());
        onSetAuth("sign-in");
      },

      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );
  const handleResetPassword = () => {
    if (password === confirmPassword) {
      ResetPassword_Mutation.mutate({
        email: otpemail,
        otp: otpValue,
        password: password,
      });
    } else {
      Toast.show({ type: "error", text1: "Password does not match" });
    }
  };

  return (
    <AppScreenThree>
      {verifyEmail === true ? (
        <ScrollView style={styles.container}>
          <Image
            source={require("../../assets/images/createPassword.png")}
            style={[styles.backgroundImage, { width }]}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 20,
              left: 30,
              borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              width: 35,
            }}
            onPress={() => {
              // dispatch(reset_isOnboarding())
              dispatch(checkResetPassword());
              // dispatch(reset_verifyEmail());
              dispatch(reset_otpemail());
              dispatch(reset_otpValue());
              dispatch(onSetAuth("forgot-password"));
              dispatch(reset_login())
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View style={[styles.displayArea, width]}>
            <View>
              <Text style={[styles.text, { fontSize: 32, fontWeight: "700" }]}>
                Create Password
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                Create a new password to secure your account
              </Text>
            </View>
            <View style={{ marginTop: 20, gap: 10 }}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry
                />
              </View>
            </View>
            <Pressable
              style={[styles.button, { marginTop: 100 }]}
              onPress={handleResetPassword}
            >
              {ResetPassword_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Create Password
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          <Image
            source={require("../../assets/images/forgotPassword.png")}
            style={[styles.backgroundImage, { width }]}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              left: 30,
              borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              width: 35,
            }}
            onPress={() => {
              // dispatch(reset_isOnboarding())
              dispatch(checkResetPassword());
              dispatch(reset_otpemail());
              dispatch(reset_otpValue());
              // dispatch(reset_verifyEmail());
              dispatch(onSetAuth("sign-in"));
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View style={[styles.displayArea, width]}>
            <View style={{ gap: 5 }}>
              <Text style={[styles.text, { fontSize: 32, fontWeight: "700" }]}>
                Forget Password
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                Forgot password? Enter your email for verification!
              </Text>
            </View>

            <View style={{ marginTop: 30, gap: 10 }}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
            </View>
            <Pressable
              style={[styles.button, { marginTop: 130 }]} // Call handleLogin function on button press
              onPress={() => ForgotPassword_Mutation.mutate({ email: email })}
            >
              {ForgotPassword_Mutation.isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Verify Email
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      )}
    </AppScreenThree>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "rgba(240, 249, 255, 1)",
  },
  backgroundImage: {
    resizeMode: "cover",
    flex: 0.9,
  },
  displayArea: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -100,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  text: {
    color: "rgba(43, 2, 95, 1)",
  },
  button: {
    backgroundColor: "rgba(105, 4, 236, 1)",
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 180,
  },
});
