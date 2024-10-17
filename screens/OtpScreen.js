import AppScreen from "../components/shared/AppScreen";
import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import OtpForm from "../ ./OtpForm";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  checkOtp,
  checkResetPassword,
  reser_otp,
  reset_otpemail,
  setOtp,
  setOtpEmail,
} from "../Redux/OnboardingSlice";
import { reset_login } from "../Redux/AuthSlice";
import Mainborder from "../components/shared/Mainborder";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const OtpScreen = ({ navigation, onSetAuth }) => {
  const {
    otpemail,
    otp: otpdata,
    verifyEmail,
  } = useSelector((state) => state?.OnboardingSlice);
  const dispatch = useDispatch();
  console.log({
    otpdata,
    otpemail,
    verifyEmail,
  });
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const length = 4;

  const handleChange = (index, value) => {
    const newCode = code.split("");
    newCode[index] = value;
    setCode(newCode.join(""));
    if (index === length - 1) {
      inputRefs.current[index]?.blur();
    } else if (value !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const Resend_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/auth/send-otp`;

      let datas = {
        email: otpemail,
        otp: code,
      };
      console.log({
        datas,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      return axios.post(url, datas, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
      },

      onError: (error) => {
        console.log({
          error: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );

  const Verify_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/auth/verify-otp`;

      let datas = {
        email: otpemail,
        otp: code,
      };
      console.log({
        datas,
      });

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

        if (verifyEmail === true) {
          dispatch(setOtp(code));
          dispatch(checkOtp(false));

          onSetAuth("forgot-password");
        } else {
          dispatch(checkOtp(false));
          dispatch(reset_otpemail());
          dispatch(reset_login());
          onSetAuth("sign-in");
        }
      },

      onError: (error) => {
        console.log({
          errorrrrrr: error?.response,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
        });
      },
    }
  );

  return (
    <AppScreen>
      <Mainborder>
        {verifyEmail === true ? (
          <TouchableOpacity
            style={{
              position: "relative",
              top: 10,
              left: 30,
              borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              width: 35,
            }}
            onPress={() => {
              dispatch(checkResetPassword());
              dispatch(reset_otpemail());
              dispatch(checkOtp(false));
              onSetAuth("sign-in");
              dispatch(reset_login());
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              position: "relative",
              top: 10,
              left: 30,
              borderWidth: 1,
              padding: 5,
              borderRadius: 10,
              width: 35,
            }}
            onPress={() => {
              console.log("this is otpemail", otpemail);
              dispatch(checkOtp(false));
              onSetAuth("sign-in");
              dispatch(reset_login());
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View style={styles.container}>
          <View style={{ gap: 30 }}>
            <Text style={styles.heading}>E-mail Verification</Text>

            {/* phone numbers */}
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 23,
                  fontWeight: 400,
                  textAlign: "center",
                }}
              >
                Enter the 4- digit code sent to{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  textAlign: "center",
                  color: "#06094F",
                  fontSize:16,
                  fontWeight:"700"
                }}
              >
                {otpemail}
              </Text>
            </View>

            {/* otp form */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {[...Array(length)].map((_, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      width: 60,
                      height: 60,
                      textAlign: "center",
                      margin: 10,
                      borderRadius: 10,
                    }}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(value) => handleChange(index, value)}
                    value={code[index] || ""}
                    editable={!loading}
                  />
                ))}
              </View>

                          {/* resend */}
            <Pressable
              onPress={() =>
                Resend_Mutation.mutate({
                  email: otpemail,
                })
              }
            >
              <Text style={styles.resend}>
                Didn’t receive a code?{" "}
                <Text
                  style={{ fontWeight: "500", textDecorationLine: "underline" }}
                >
                  Resend
                </Text>
                {Resend_Mutation.isLoading && (
                  <ActivityIndicator color="blue" size="small" />
                )}
              </Text>
            </Pressable>

              {code.length === length && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#6904EC",
                      width: "70%",
                      borderRadius: 30,
                    }}
                    onPress={() =>
                      Verify_Mutation.mutate({
                        email: otpemail,
                        otp: code,
                      })
                    }
                  >
                    {Verify_Mutation?.isLoading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          padding: 10,
                        }}
                      >
                        Submit
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>


          </View>
        </View>
      </Mainborder>
    </AppScreen>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 36,
    textAlign: "center",
    color: "#2B025F",
  },

  resend: {
    fontSize: 16,
    color: "#06094F",
    fontWeight: "400",
    lineHeight: 23,
    textAlign: "center",
  },
});
