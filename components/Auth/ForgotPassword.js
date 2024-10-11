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
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  checkOtp,
  checkResetPassword,
  reset_otpemail,
  reset_otpValue,
  setOtpEmail,
} from "../../Redux/OnboardingSlice";
import AppScreen from "../shared/AppScreen";
import Mainborder from "../shared/Mainborder";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const { width } = useWindowDimensions();

  const { otpemail, verifyEmail, otpValue } = useSelector(
    (state) => state?.OnboardingSlice
  );

  console.log({
    d: otpemail,
    verifyEmail:verifyEmail
  });
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);
  // console.log({
  //   login_data: user_data,
  // });
  // const Registration_Mutation = useMutation(
  //   (data_info) => {
  //     let url = `${API_BASEURL}v1/auth/signup`;

  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     };

  //     return axios.post(url, data_info, config);
  //   },
  //   {
  //     onSuccess: (success) => {
  //       Toast.show({
  //         type: "success",
  //         text1: `${success?.data?.message} `,
  //       });
  //       dispatch(checkOtp(true));
  //     },

  //     onError: (error) => {
  //       Toast.show({
  //         type: "error",
  //         text1: `${error?.response?.data?.message} `,
  //       });
  //     },
  //   }
  // );

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
        dispatch(checkResetPassword(false));
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
    <AppScreenThree arrrow={"true"}>
      {verifyEmail === true ? (
        <ScrollView style={styles.container}>
          <Image
            source={backgroundImg}
            style={[styles.backgroundImage, { width }]}
          />
          <View style={[styles.displayArea, width]}>
            <View>
              <Text style={[styles.text, { fontSize: 32, fontWeight: "700" }]}>
                Create Password
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                Euasi architecto beatae vitae dicta sunt explicabo. Nemo enim{" "}
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
            <Pressable style={styles.button} onPress={handleResetPassword}>
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
            source={backgroundImg}
            style={[styles.backgroundImage, { width }]}
          />
          <View style={[styles.displayArea, width]}>
            <View>
              <Text style={[styles.text, { fontSize: 32, fontWeight: "700" }]}>
                Forget Password
              </Text>
              <Text style={[styles.text, { fontSize: 12 }]}>
                Euasi architecto beatae vitae dicta sunt explicabo. Nemo enim{" "}
              </Text>
            </View>

            <View style={{ marginTop: 20, gap: 10 }}>
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
              style={styles.button} // Call handleLogin function on button press
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
    // <AppScreen>
    //   <Mainborder>
    //     <ScrollView style={styles.container}>
    //       <View
    //         style={{
    //           paddingBottom: 30,
    //           flex: 1,
    //         }}
    //       >
    //         {/* heading texts */}
    //         <View style={{ gap: 10 }}>
    //           <Text style={{ fontSize: 24, lineHeight: 36, fontWeight: "900" }}>
    //             Forgot Password
    //           </Text>
    //         </View>

    //         {/* inputs container*/}
    //         <View style={styles.inputGroup}>
    //           {/* username */}

    //           <View style={styles.inputContainer}>
    //             <Text style={styles.labels}>Password</Text>
    //             <TextInput
    //               style={styles.inputs}
    //               value={password}
    //               onChangeText={(text) => setPassword(text)}
    //               secureTextEntry
    //             />
    //           </View>

    //           <View style={styles.inputContainer}>
    //             <Text style={styles.labels}>New Password</Text>
    //             <TextInput
    //               style={styles.inputs}
    //               value={confirmPassword}
    //               onChangeText={(text) => setConfirmPassword(text)}
    //               secureTextEntry
    //             />
    //           </View>
    //         </View>

    //         {/* action buttons */}
    //         <View
    //           style={{
    //             justifyContent: "flex-end",
    //             alignContent: "flex-center",
    //             flex: 3,
    //             paddingVertical: 30,
    //             gap: 10,
    //           }}
    //         >
    //           <Pressable
    //             // onPress={() => onSetAuth("sign-in")}
    //             onPress={() => {
    //               dispatch(setOtpEmail(email));

    //               Registration_Mutation.mutate({
    //                 firstName: firstName,
    //                 lastName: lastName,
    //                 email: email,
    //                 password: password,
    //                 location: homeAddress,
    //                 roles: ["user"],
    //               });
    //             }}
    //             style={{
    //               padding: 10,
    //               borderRadius: 40,
    //               backgroundColor: "#DD293E",
    //             }}
    //           >
    //             {Registration_Mutation.isLoading ? (
    //               <ActivityIndicator size="small" color="white" />
    //             ) : (
    //               <Text
    //                 style={{
    //                   textAlign: "center",
    //                   color: "white",
    //                   fontSize: 16,
    //                   fontWeight: "700",
    //                   lineHeight: 24.05,
    //                 }}
    //               >
    //                 Submit
    //               </Text>
    //             )}
    //           </Pressable>
    //           <View style={{ justifyContent: "center" }}>
    //             <Pressable>
    //               <Text style={{ fontSize: 14, lineHeight: 22.4 }}>
    //                 You do not have an account?{" "}
    //                 <Text
    //                   onPress={() => onSetAuth("sign-in")}
    //                   style={{
    //                     fontSize: 16,
    //                     fontWeight: "500",
    //                     lineHeight: 25.6,
    //                   }}
    //                 >
    //                   Login
    //                 </Text>
    //               </Text>
    //             </Pressable>
    //           </View>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </Mainborder>
    // </AppScreen>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 40,
  //   paddingBottom: 40,
  //   paddingHorizontal: 10,
  //   gap: 20,
  // },

  // inputGroup: {
  //   gap: 5,
  // },

  // inputContainer: {
  //   gap: 5,
  // },

  // labels: {
  //   fontSize: 14,
  //   fontWeight: "500",
  // },

  // inputs: {
  //   borderWidth: 0.5,
  //   borderRadius: 8,
  //   padding: 7,
  // },

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
    flex: 1,
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
