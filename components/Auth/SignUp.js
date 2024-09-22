import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  Image,
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
const backgroundImg = require("../../assets/images/signUp.png");

const SignUp = ({ onSetAuth }) => {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const [roles, setRoles] = useState(["user"]);

  const [startSignUp, setStartSignUp] = useState(true);
  const otpemail = useSelector((state) => state?.OnboardingSlice);

  console.log({
    ooooo: roles,
  });
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);
  console.log({
    login_data: user_data,
  });

  const Registration_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/auth/signup`;
      console.log({
        kk: url,
      });

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
        console.log({ error: error.message });

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  return (
    // <>
    //   {startSignUp ? (
    //     <WelcomeScreen
    //       data1={startSignUp}
    //       setdata={setStartSignUp}
    //       setdata3={onSetAuth}
    //       setdata4={setRoles}
    //       data4={roles}
    //     />
    //   ) : (
    //     <AppScreen>
    //       <Mainborder>
    //         <ScrollView style={styles.container}>
    //           <View
    //             style={{
    //               paddingBottom: 30,
    //               flex: 1,
    //             }}
    //           >
    //             {/* heading texts */}
    //             <View style={{ gap: 10 }}>
    //               <Text
    //                 style={{ fontSize: 24, lineHeight: 36, fontWeight: "900" }}
    //               >
    //                 Sign Up
    //               </Text>
    //             </View>

    //             {/* inputs container*/}
    //             <View style={styles.inputGroup}>
    //               {/* username */}
    //               <View style={styles.inputContainer}>
    //                 <Text style={styles.labels}>First Name</Text>

    //                 <TextInput
    //                   style={styles.inputs}
    //                   value={firstName}
    //                   onChangeText={(text) => setFirstName(text)}
    //                   placeholder="Enter your first name"
    //                 />
    //               </View>

    //               {/* last name */}
    //               <View style={styles.inputContainer}>
    //                 <Text style={styles.labels}>Last Name</Text>
    //                 <TextInput
    //                   style={styles.inputs}
    //                   value={lastName}
    //                   onChangeText={(text) => setLastName(text)}
    //                   placeholder="Enter your last name"
    //                 />
    //               </View>

    //               {/* Phone Number */}
    //               <View style={styles.inputContainer}>
    //                 <Text style={styles.labels}>Phone Number</Text>
    //                 <TextInput
    //                   style={styles.inputs}
    //                   value={phoneNumber}
    //                   onChangeText={(text) => setPhoneNumber(text)}
    //                   placeholder="Enter your phone number"
    //                   keyboardType="phone-pad"
    //                 />
    //               </View>

    //               {/* email address */}
    //               <View style={styles.inputContainer}>
    //                 <Text style={styles.labels}>Email Address</Text>

    //                 <TextInput
    //                   style={styles.inputs}
    //                   value={email}
    //                   onChangeText={(text) => setEmail(text)}
    //                   placeholder="Enter your email"
    //                 />
    //               </View>

    //               <View style={styles.inputContainer}>
    //                 <Text style={styles.labels}>Lacation </Text>

    //                 <TextInput
    //                   style={styles.inputs}
    //                   value={homeAddress}
    //                   onChangeText={(text) => setHomeAddress(text)}
    //                   placeholder="Enter your home address"
    //                 />
    //               </View>

    //               <View style={styles.inputContainer}>
    //                 <Text style={styles.labels}>Password</Text>
    //                 <TextInput
    //                   style={styles.inputs}
    //                   value={password}
    //                   onChangeText={(text) => setPassword(text)}
    //                   secureTextEntry
    //                 />
    //               </View>
    //             </View>

    //             {/* action buttons */}
    //             <View
    //               style={{
    //                 justifyContent: "flex-end",
    //                 alignContent: "flex-center",
    //                 flex: 3,
    //                 paddingVertical: 30,
    //                 gap: 10,
    //               }}
    //             >
    //               <Pressable
    //                 // onPress={() => onSetAuth("sign-in")}
    //                 onPress={() => {
    //                   dispatch(setOtpEmail(email));

    //                   Registration_Mutation.mutate({
    //                     firstName: firstName,
    //                     lastName: lastName,
    //                     email: email,
    //                     password: password,
    //                     location: homeAddress,
    //                     roles: roles,
    //                   });
    //                 }}
    //                 style={{
    //                   padding: 10,
    //                   borderRadius: 40,
    //                   backgroundColor: "#DD293E",
    //                 }}
    //               >
    //                 {Registration_Mutation.isLoading ? (
    //                   <ActivityIndicator size="small" color="white" />
    //                 ) : (
    //                   <Text
    //                     style={{
    //                       textAlign: "center",
    //                       color: "white",
    //                       fontSize: 16,
    //                       fontWeight: "700",
    //                       lineHeight: 24.05,
    //                     }}
    //                   >
    //                     Sign Up
    //                   </Text>
    //                 )}
    //               </Pressable>
    //               <View style={{ justifyContent: "center" }}>
    //                 <Pressable>
    //                   <Text style={{ fontSize: 14, lineHeight: 22.4 }}>
    //                     You do not have an account?{" "}
    //                     <Text
    //                       onPress={() => onSetAuth("sign-in")}
    //                       style={{
    //                         fontSize: 16,
    //                         fontWeight: "500",
    //                         lineHeight: 25.6,
    //                       }}
    //                     >
    //                       Login
    //                     </Text>
    //                   </Text>
    //                 </Pressable>
    //               </View>
    //             </View>
    //           </View>
    //         </ScrollView>
    //       </Mainborder>
    //     </AppScreen>
    //   )}
    // </>
    <View style={styles.container}>
      <Image source={backgroundImg} style={[styles.image, { width }]} />
      <View style={[styles.displayArea, { width }]}>
        <View>
          <Text style={[styles.text, { fontSize: 32, fontWeight: "700" }]}>
            Sign Up
          </Text>
          <Text style={[styles.text, { fontSize: 12 }]}>
            Euasi architecto beatae vitae dicta sunt explicabo. Nemo enim{" "}
          </Text>
        </View>
        {/* Role Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <Pressable
            style={[
              {
                backgroundColor: roles.includes("user") ? "#6904EC" : "#F9F9F9",
                borderBottomLeftRadius: 12, borderTopLeftRadius:12
              },
              styles.roleButtons,
            ]}
            onPress={() => setRoles(["user"])}
          >
            <Text
              style={{
                textAlign: "center",
                color: roles.includes("user") ? "white" : "#2B025F",
              }}
            >
              Sign Up As A Buyer
            </Text>
          </Pressable>
          <Pressable
            style={[
              {
                backgroundColor: roles.includes("vendor")
                  ? "#6904EC"
                  : "#F9F9F9",
                  borderBottomRightRadius:12, borderTopRightRadius:12
              },
              styles.roleButtons,
            ]}
            onPress={() => setRoles(["vendor"])}
          >
            <Text
              style={{
                textAlign: "center",
                color: roles.includes("vendor") ? "white" : "#2B025F",
              }}
            >
              Sign Up As A Vendor
            </Text>
          </Pressable>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 20, gap: 10 }}
          keyboardShouldPersistTaps="handled"
        >
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
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="phone-pad"
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
              value={homeAddress}
              onChangeText={(text) => setHomeAddress(text)}
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
          {/* Buttons */}
          <Pressable
            style={styles.button}
            onPress={() => {
              dispatch(setOtpEmail(email));

              Registration_Mutation.mutate({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                location: homeAddress,
                roles: roles,
              });
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
                Sign Up
              </Text>
            )}
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Text>You Have An Account?</Text>
            <Pressable>
              <Text
                style={[styles.text, { fontWeight: "600", fontSize: 16 }]}
                onPress={() => onSetAuth("sign-in")}
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 100,
    padding: 0,
  },
  image: {
    // resizeMode,
    flex: 0.6,
  },
  displayArea: {
    backgroundColor: "white",
    marginTop: -60,
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  text: {
    color: "rgba(43, 2, 95, 1)",
  },
  inputGroup: {
    gap: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(76, 6, 14, 1)",
    height: 48,
    borderRadius: 10,
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
  roleButtons: {
    padding: 15,
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     paddingBottom: 40,
//     paddingHorizontal: 10,
//     gap: 20,
//   },

//   inputGroup: {
//     gap: 5,
//   },

//   inputContainer: {
//     gap: 5,
//   },

//   labels: {
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   inputs: {
//     borderWidth: 0.5,
//     borderRadius: 8,
//     padding: 7,
//   },
// });

// const WelcomeScreen = ({ data1, setdata, setdata3, setdata4, data4 }) => {
//   const { width } = useWindowDimensions();

//   console.log({
//     ssss: data4,
//   });

//   return (
//     // <>
//     <View style={[styles2.container1, { width }]}>
//       <Image source={backgroundImg} style={[styles2.image, { width }]} />
//       <View style={{ flex: 1, padding: 20, marginTop: -200 }}>
//         <View style={[styles2.form, { flexDirection: "column", gap: 20 }]}>
//           {/* text */}
//           <Text
//             style={{
//               color: "#1E0000",
//               fontSize: 32,
//               fontWeight: "700",
//               textAlign: "left",
//             }}
//           >
//             Welcome
//           </Text>
//           <Text
//             style={{
//               color: "#1E0000",
//               fontSize: 14,
//               fontWeight: "400",
//               textAlign: "left",
//               marginTop: -15,
//             }}
//           >
//             Euasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
//             voluptatem quia v
//           </Text>
//           {/* buttons */}
//           <Pressable
//             style={{
//               paddingHorizontal: 20,
//               paddingVertical: 12,
//               borderRadius: 10,
//               backgroundColor: data4.includes("vendor") ? "#DD293E" : "white",
//               borderColor: "#330111",
//               borderWidth: 1,
//               borderStyle: "solid",
//               marginTop: 10,
//             }}
//             // onPress={() => setdata(false)}
//             onPress={() => setdata4(["vendor"])}
//           >
//             <Text style={{ textAlign: "left", color: "#292D32", fontSize: 16 }}>
//               Cake Maker
//             </Text>
//           </Pressable>
//           <Pressable
//             style={{
//               paddingHorizontal: 20,
//               paddingVertical: 12,
//               borderRadius: 10,
//               backgroundColor: data4.includes("user") ? "#DD293E" : "white",
//               borderColor: "#330111",
//               borderWidth: 1,
//               borderStyle: "solid",
//             }}
//             onPress={() => setdata4(["user"])}
//           >
//             <Text style={{ textAlign: "left", color: "#292D32", fontSize: 16 }}>
//               Buyer
//             </Text>
//           </Pressable>
//           {/*  proceed button*/}
//           <Pressable
//             style={{
//               paddingHorizontal: 20,
//               paddingVertical: 12,
//               borderRadius: 40,
//               backgroundColor: "#DD293E",
//               marginTop: 140,
//             }}
//             // onPress={() => setdata4(["vendor"])}
//             onPress={() => setdata(false)}
//           >
//             <Text style={{ textAlign: "center", color: "white" }}>Proceed</Text>
//           </Pressable>

//           <View style={{ justifyContent: "center", alignItems: "center" }}>
//             <Pressable>
//               <Text style={{ fontSize: 14, lineHeight: 22.4 }}>
//                 You do not have an account?{" "}
//                 <Text
//                   onPress={() => setdata3("sign-in")}
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
//     </View>
//     // </>
//   );
// };
// const styles2 = StyleSheet.create({
//   container: {
//     // marginTop:-50,
//     height: 100,
//     marginLeft: -20,
//     padding: 0,
//     flex: 1,
//     backgroundColor: "#FFF0F0",
//     // margin: 0,
//   },

//   container1: {
//     // marginTop:-50,
//     height: 100,
//     // marginLeft: -20,
//     padding: 0,
//     flex: 1,
//     backgroundColor: "#FFF0F0",
//     // margin: 0,
//   },
//   image: {
//     padding: 0,
//     flex: 1,
//     marginTop: -50,
//     marginLeft: -20,
//     resizeMode: "stretch",
//   },
//   form: {
//     borderRadius: 10,
//     backgroundColor: "white",
//     padding: 20,
//     margin: "auto",
//   },

//   button: {},
// });
