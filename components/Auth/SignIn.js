import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Button,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Login_Fun, reset_login } from "../../Redux/AuthSlice";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { checkOtp, setOtpEmail } from "../../Redux/OnboardingSlice";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AppScreen from "../shared/AppScreen";
import Mainborder from "../shared/Mainborder";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
const backgroundImg = require("../../assets/images/signIn.png");

const SignIn = ({ onSetAuth }) => {
  const navigation = useNavigation();
  // const { localremember } = useSelector((state) => state?.DontwantToResetSlice);
  const { otpemail } = useSelector((state) => state?.OnboardingSlice);

  const dispatch = useDispatch();
  const [email, setEmail] = useState(otpemail || "");

  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // console.log({
  //   s: API_BASEURL,
  // });

  const { user_isLoading, user_data, user_message } = useSelector(
    (state) => state?.Auth
  );
  const { width } = useWindowDimensions();
  const handleLogin = () => {
    // Dispatch the login action with username and password
    dispatch(setOtpEmail(email));
    console.log({ email, password });
    dispatch(Login_Fun({ email, password }));
  };

  useEffect(() => {
    if (user_message === "Email not verified!") {
      // navigation.navigate("OtpScreen");
      dispatch(checkOtp(true));
    }

    // dispatch(reset_login());

    return () => {};
  }, [user_message]);

  const Resend_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}api/auth/send-otp`;

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
        console.log({
          error: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={backgroundImg}
          style={[styles.backgroundImage, { width }]}
        />
        <View style={[styles.displayArea, { width }]}>
          <View>
            <Text style={[styles.text, { fontSize: 32, fontWeight: "700" }]}>
              Welcome Back
            </Text>
            <Text style={[styles.text, { fontSize: 12 }]}>
              Euasi architecto beatae vitae dicta sunt explicabo. Nemo enim{" "}
            </Text>
          </View>
          {/* inputs */}
          <View style={{ marginTop: 20, gap: 10 }}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setRemember(!remember)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                // marginBottom: 20,
              }}
            >
              <Ionicons
                name={`${
                  remember
                    ? "checkmark-circle-sharp"
                    : "checkmark-circle-outline"
                }`}
                size={24}
                color={`${remember ? "#6904EC" : "black"}`}
              />
              <Text style={[styles.text, { fontSize: 12 }]}>Remember me</Text>
            </TouchableOpacity>
            <Pressable onPress={() => onSetAuth("forgot-password")}>
              <Text style={[styles.text, { fontSize: 12, textDecorationLine:"underline" }]}>
                Forgot password?
              </Text>
            </Pressable>
          </View>
          {Resend_Mutation?.isLoading && (
            <ActivityIndicator size="large" color="blue" />
          )}

          {user_message === "Email not verified!" && (
            <TouchableOpacity
              onPress={() =>
                Resend_Mutation.mutate({
                  email: otpemail,
                })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#06094F",
                  fontWeight: "400",
                  lineHeight: 23,
                }}
              >
                Click To verify your email {otpemail}
              </Text>
            </TouchableOpacity>
          )}
          <Pressable
            style={styles.button}
            onPress={handleLogin} // Call handleLogin function on button press
          >
            {user_isLoading ? (
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
                Log In
              </Text>
            )}
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              marginTop: 10,
              // paddingBottom:100
            }}
          >
            <Text>You Do Not Have An Account?</Text>
            <Pressable>
              <Text
                style={[styles.text, { fontWeight: "600", fontSize: 16 }]}
                onPress={() => onSetAuth("sign-up")}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 100,
    padding: 0,
    backgroundColor: "rgba(240, 249, 255, 1)",
  },
  backgroundImage: {
    resizeMode: "cover",
    flex: 0.9,
  },
  displayArea: {
    backgroundColor: "white",
    // position: "absolute",
    marginTop: -360,
    borderRadius: 20,
    padding: 20,
    marginBottom: 50,
  },
  inputGroup: {
    gap: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(76, 6, 14, 1)",
    height: 48,
    borderRadius: 10,
    paddingHorizontal:10
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
    marginTop: 50,
    // marginBottom:90
  },
});
